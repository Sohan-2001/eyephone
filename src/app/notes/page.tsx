
'use client';

import { useState, useEffect, useCallback, useTransition } from 'react';
import { ArrowLeft, Plus, Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { getNotes, createNote, updateNote, deleteNote } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type Note = {
  id: number;
  title: string;
  content: string;
  updated_at: string;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchNotes() {
      setIsLoading(true);
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes);
      if (fetchedNotes.length > 0) {
        setSelectedNoteId(fetchedNotes[0].id);
      }
      setIsLoading(false);
    }
    fetchNotes();
  }, []);

  const handleCreateNote = async () => {
    startTransition(async () => {
      try {
        const newNote = await createNote();
        setNotes([newNote, ...notes]);
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
        setSelectedNoteId(newNotes.length > 0 ? newNotes[0].id : null);
      }

      try {
        await deleteNote(id);
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not delete the note.' });
        setNotes(originalNotes); // Revert on failure
      }
    });
  };

  const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<F>): Promise<ReturnType<F>> =>
      new Promise(resolve => {
        if (timeout) {
          clearTimeout(timeout);
        }
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
      <header className="flex items-center justify-between p-2 border-b">
        <Link href="/" className="p-2">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-semibold">Notes</h1>
        <Button variant="ghost" size="icon" onClick={handleCreateNote} disabled={isPending}>
          {isPending && notes.length > 0 ? <Loader2 className="animate-spin" /> : <Plus size={20} />}
        </Button>
      </header>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="animate-spin text-muted-foreground" size={32} />
        </div>
      ) : notes.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground p-4">
            <h2 className="text-lg font-semibold">No Notes Yet</h2>
            <p className="mb-4">Tap the '+' button to create your first note.</p>
            <Button onClick={handleCreateNote} disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin mr-2" /> : <Plus className="mr-2" />}
              Create Note
            </Button>
        </div>
      ) : (
        <div className="flex flex-1 overflow-hidden">
          {/* Notes List */}
          <aside className="w-1/3 border-r overflow-y-auto">
            <ul>
              {notes.map(note => (
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
          </aside>

          {/* Note Editor */}
          <main className="w-2/3 flex flex-col">
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
                   {isSaving ? (
                        <span className="flex items-center gap-1.5"><Loader2 size={12} className="animate-spin" /> Saving...</span>
                   ) : (
                       <span>{`Updated ${formatDistanceToNow(new Date(selectedNote.updated_at), { addSuffix: true })}`}</span>
                   )}
                   <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteNote(selectedNote.id)}>
                       <Trash2 size={16}/>
                   </Button>
                </footer>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <p>Select a note to view or edit</p>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}
