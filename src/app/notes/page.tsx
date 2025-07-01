
'use client';

import { useState, useEffect, useCallback, useTransition, useMemo } from 'react';
import { ArrowLeft, Plus, Trash2, Loader2, Folder as FolderIcon, MoreVertical, FileText, EllipsisVertical } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { getNotes, createNote, updateNote, deleteNote, getFolders, createFolder, deleteFolder, moveNoteToFolder } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { Note, Folder } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from '@/components/ui/scroll-area';

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<number | 'all'>('all');
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [newFolderName, setNewFolderName] = useState("");
  const [isAddFolderDialogOpen, setIsAddFolderDialogOpen] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const [fetchedNotes, fetchedFolders] = await Promise.all([getNotes('all'), getFolders()]);
        setNotes(fetchedNotes);
        setFolders(fetchedFolders);
        if (fetchedNotes.length > 0) {
          setSelectedNoteId(fetchedNotes[0].id);
        }
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not load your notes and folders.' });
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [toast]);
  
  const filteredNotes = useMemo(() => {
    if (selectedFolderId === 'all') {
      return notes;
    }
    return notes.filter(note => note.folder_id === selectedFolderId);
  }, [notes, selectedFolderId]);

  useEffect(() => {
    // When the folder changes, if the selected note is not in the new list, deselect it.
    if (selectedNoteId && !filteredNotes.some(n => n.id === selectedNoteId)) {
       setSelectedNoteId(filteredNotes.length > 0 ? filteredNotes[0].id : null);
    } else if (!selectedNoteId && filteredNotes.length > 0) {
        // If no note is selected, select the first one in the new list.
        setSelectedNoteId(filteredNotes[0].id);
    }
  }, [filteredNotes, selectedNoteId]);

  const handleCreateNote = async () => {
    const currentFolderId = typeof selectedFolderId === 'number' ? selectedFolderId : null;
    startTransition(async () => {
      try {
        const newNote = await createNote(currentFolderId);
        setNotes(prev => [newNote, ...prev]);
        setSelectedNoteId(newNote.id);
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not create a new note.' });
      }
    });
  };

  const handleDeleteNote = async (id: number) => {
    startTransition(async () => {
      const originalNotes = notes;
      const newNotes = notes.filter(note => note.id !== id);
      setNotes(newNotes);
      
      if (selectedNoteId === id) {
        const notesInCurrentView = newNotes.filter(n => selectedFolderId === 'all' || n.folder_id === selectedFolderId);
        setSelectedNoteId(notesInCurrentView.length > 0 ? notesInCurrentView[0].id : null);
      }

      try {
        await deleteNote(id);
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not delete the note.' });
        setNotes(originalNotes); // Revert on failure
      }
    });
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
        toast({ variant: 'destructive', title: 'Error', description: 'Folder name cannot be empty.' });
        return;
    }
    startTransition(async () => {
        try {
            const newFolder = await createFolder(newFolderName);
            setFolders(prev => [...prev, newFolder]);
            setNewFolderName("");
            setIsAddFolderDialogOpen(false);
            toast({ title: 'Success', description: 'Folder created.' });
        } catch(error) {
            toast({ variant: 'destructive', title: 'Error', description: 'Could not create folder.' });
        }
    });
  }

  const handleDeleteFolder = async (id: number) => {
    startTransition(async () => {
        const originalFolders = folders;
        setFolders(prev => prev.filter(f => f.id !== id));
        
        // If we deleted the selected folder, move view to "All Notes"
        if (selectedFolderId === id) {
            setSelectedFolderId('all');
        }

        // Optimistically update notes that were in the deleted folder
        setNotes(prev => prev.map(n => n.folder_id === id ? {...n, folder_id: null} : n));

        try {
            await deleteFolder(id);
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error', description: 'Could not delete folder.' });
            setFolders(originalFolders); // Revert on failure
        }
    })
  }

  const handleMoveNote = async (noteId: number, targetFolderId: number | 'unclassified') => {
      const newFolderId = targetFolderId === 'unclassified' ? null : targetFolderId;
      
      // Optimistic update
      const originalNotes = notes;
      setNotes(prev => prev.map(n => n.id === noteId ? {...n, folder_id: newFolderId} : n));

      try {
        await moveNoteToFolder(noteId, newFolderId);
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not move note.' });
        setNotes(originalNotes);
      }
  };


  const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<F>): Promise<ReturnType<F>> =>
      new Promise(resolve => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => resolve(func(...args)), waitFor);
      });
  };

  const debouncedUpdateNote = useCallback(debounce(updateNote, 1000), []);

  const handleNoteChange = async (noteId: number, newTitle: string, newContent: string) => {
     setNotes(currentNotes =>
      currentNotes.map(note =>
        note.id === noteId ? { ...note, title: newTitle, content: newContent, updated_at: new Date().toISOString() } : note
      )
    );
    setIsSaving(true);
    await debouncedUpdateNote(noteId, newTitle, newContent);
    setIsSaving(false);
  };
  
  const selectedNote = notes.find(note => note.id === selectedNoteId);

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      {/* Header */}
      <header className="flex items-center justify-between p-2 border-b shrink-0">
        <div className="flex items-center">
            <Link href="/" className="p-2"> <ArrowLeft size={20} /> </Link>
        </div>
        <h1 className="font-semibold text-lg absolute left-1/2 -translate-x-1/2">Notes</h1>
        <Button variant="ghost" size="icon" onClick={handleCreateNote} disabled={isPending}>
          {isPending && notes.find(n => n.id === selectedNoteId) ? <Loader2 className="animate-spin" /> : <Plus size={20} />}
        </Button>
      </header>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="animate-spin text-muted-foreground" size={32} />
        </div>
      ) : (
        <div className="flex flex-1 overflow-hidden">
          {/* Folders Sidebar */}
          <aside className="w-1/3 max-w-xs border-r overflow-y-auto flex flex-col">
              <ScrollArea className="flex-1">
                <div className="p-2">
                    <h2 className="px-2 text-sm font-semibold text-muted-foreground">Folders</h2>
                    <ul className="mt-1">
                        <li>
                            <button
                                className={cn(
                                "w-full text-left p-2 rounded-md flex items-center gap-2 hover:bg-secondary",
                                selectedFolderId === 'all' && "bg-secondary"
                                )}
                                onClick={() => setSelectedFolderId('all')}
                            >
                                <FileText size={18} />
                                <span className="font-medium truncate">All Notes</span>
                            </button>
                        </li>
                        {folders.map(folder => (
                            <li key={folder.id} className="group relative">
                                <button
                                    className={cn(
                                    "w-full text-left p-2 rounded-md flex items-center gap-2 hover:bg-secondary",
                                    selectedFolderId === folder.id && "bg-secondary"
                                    )}
                                    onClick={() => setSelectedFolderId(folder.id)}
                                >
                                    <FolderIcon size={18} />
                                    <span className="font-medium truncate">{folder.name}</span>
                                </button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-7 w-7 absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100">
                                            <MoreVertical size={16}/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteFolder(folder.id)}>
                                            <Trash2 size={14} className="mr-2"/> Delete Folder
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </li>
                        ))}
                    </ul>
                </div>
              </ScrollArea>
              <div className="p-2 border-t">
                  <Dialog open={isAddFolderDialogOpen} onOpenChange={setIsAddFolderDialogOpen}>
                      <DialogTrigger asChild>
                         <Button variant="ghost" className="w-full justify-start">
                             <Plus size={16} className="mr-2"/> New Folder
                         </Button>
                      </DialogTrigger>
                      <DialogContent>
                          <DialogHeader><DialogTitle>Create New Folder</DialogTitle></DialogHeader>
                          <Input 
                              placeholder="Folder Name"
                              value={newFolderName}
                              onChange={(e) => setNewFolderName(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                           />
                          <DialogFooter>
                            <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                            <Button onClick={handleCreateFolder} disabled={isPending}>
                                {isPending ? <Loader2 className="animate-spin" /> : 'Create'}
                            </Button>
                          </DialogFooter>
                      </DialogContent>
                  </Dialog>
              </div>
          </aside>
        
          {/* Notes List */}
          <aside className="w-1/3 max-w-xs border-r overflow-y-auto">
            {filteredNotes.length > 0 ? (
                <ul>
                {filteredNotes.map(note => (
                    <li key={note.id}>
                    <button
                        className={cn(
                        "w-full text-left p-3 border-b hover:bg-secondary",
                        selectedNoteId === note.id && "bg-secondary"
                        )}
                        onClick={() => setSelectedNoteId(note.id)}
                    >
                        <h3 className="font-semibold truncate">{note.title || "New Note"}</h3>
                        <p className="text-sm text-muted-foreground truncate">{note.content || "No additional text"}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            {formatDistanceToNow(new Date(note.updated_at), { addSuffix: true })}
                        </p>
                    </button>
                    </li>
                ))}
                </ul>
            ) : (
                <div className="p-4 text-center text-muted-foreground h-full flex items-center justify-center">
                    <p>No notes in this folder.</p>
                </div>
            )}
          </aside>

          {/* Note Editor */}
          <main className="flex-1 flex flex-col">
            {selectedNote ? (
              <div className="flex-1 flex flex-col p-4">
                <Input
                  value={selectedNote.title}
                  onChange={(e) => handleNoteChange(selectedNote.id, e.target.value, selectedNote.content)}
                  placeholder="Title"
                  className="text-lg font-bold border-0 shadow-none focus-visible:ring-0 px-0 mb-2"
                />
                <Textarea
                  value={selectedNote.content}
                  onChange={(e) => handleNoteChange(selectedNote.id, selectedNote.title, e.target.value)}
                  placeholder="Start writing..."
                  className="flex-1 resize-none border-0 shadow-none focus-visible:ring-0 px-0"
                />
                <footer className="flex justify-between items-center pt-2 text-xs text-muted-foreground">
                   <div className="flex items-center gap-4">
                        {isSaving ? (
                            <span className="flex items-center gap-1.5"><Loader2 size={12} className="animate-spin" /> Saving...</span>
                        ) : (
                            <span>{`Updated ${formatDistanceToNow(new Date(selectedNote.updated_at), { addSuffix: true })}`}</span>
                        )}
                        <Select
                            value={String(selectedNote.folder_id || 'unclassified')}
                            onValueChange={(value) => handleMoveNote(selectedNote.id, value === 'unclassified' ? 'unclassified' : Number(value))}
                        >
                            <SelectTrigger className="w-[180px] h-7 text-xs">
                                <SelectValue placeholder="Move to folder..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="unclassified">Uncategorized</SelectItem>
                                <DropdownMenuSeparator />
                                {folders.map(f => <SelectItem key={f.id} value={String(f.id)}>{f.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                   </div>
                   <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteNote(selectedNote.id)}>
                       <Trash2 size={16}/>
                   </Button>
                </footer>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <p>{notes.length > 0 ? 'Select a note to view or edit' : "Create a note to get started"}</p>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}
