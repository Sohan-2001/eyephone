
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
import type { Note } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const fetchedNotes = await getNotes('all');
        setNotes(fetchedNotes);
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not load your notes.' });
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [toast]);

  const handleCreateAndOpenNote = async () => {
    startTransition(async () => {
      try {
        const newNote = await createNote(null);
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
      setNotes(prev => prev.filter(note => note.id !== id));
      setSelectedNoteId(null);

      try {
        await deleteNote(id);
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not delete the note.' });
        setNotes(originalNotes);
      }
    });
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

  if (isLoading) {
    return (
      <div className="flex flex-col h-full bg-background text-foreground items-center justify-center">
        <Loader2 className="animate-spin text-muted-foreground" size={32} />
      </div>
    );
  }

  // NOTE EDITOR VIEW
  if (selectedNoteId && selectedNote) {
    return (
      <div className="flex flex-col h-full bg-background text-foreground">
        <header className="flex items-center justify-between p-2 border-b shrink-0">
          <Button variant="ghost" size="icon" onClick={() => setSelectedNoteId(null)}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="font-semibold text-lg absolute left-1/2 -translate-x-1/2">
            {isSaving ? 'Saving...' : 'Note'}
          </h1>
          <Button variant="ghost" size="icon" onClick={() => handleDeleteNote(selectedNote.id)} disabled={isPending}>
             {isPending ? <Loader2 className="animate-spin" /> : <Trash2 size={16} className="text-destructive"/>}
          </Button>
        </header>
        <main className="flex-1 flex flex-col p-4 overflow-y-auto">
          <Input
            value={selectedNote.title}
            onChange={(e) => handleNoteChange(selectedNote.id, e.target.value, selectedNote.content)}
            placeholder="Title"
            className="text-2xl font-bold border-0 shadow-none focus-visible:ring-0 px-0 mb-2"
          />
          <Textarea
            value={selectedNote.content}
            onChange={(e) => handleNoteChange(selectedNote.id, selectedNote.title, e.target.value)}
            placeholder="Start writing..."
            className="flex-1 resize-none border-0 shadow-none focus-visible:ring-0 px-0 text-base"
          />
        </main>
      </div>
    );
  }

  // MAIN NOTES LIST VIEW
  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <header className="flex items-center justify-between p-2 border-b shrink-0">
        <Link href="/" className="p-2"> <ArrowLeft size={20} /> </Link>
        <h1 className="font-semibold text-lg absolute left-1/2 -translate-x-1/2">Notes</h1>
        <div /> {/* Spacer */}
      </header>

      {/* Blank page with Create button */}
      {notes.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <p className="text-muted-foreground mb-4">No notes yet.</p>
          <Button onClick={handleCreateAndOpenNote} disabled={isPending}>
            <Plus className="mr-2" size={16} /> Create Note
          </Button>
        </div>
      ) : (
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {notes.map(note => (
              <button
                key={note.id}
                className="w-full text-left p-4 border rounded-lg hover:bg-secondary transition-colors"
                onClick={() => setSelectedNoteId(note.id)}
              >
                <h3 className="font-semibold truncate">{note.title || "New Note"}</h3>
                <p className="text-sm text-muted-foreground truncate mt-1">{note.content || "No additional text"}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {formatDistanceToNow(new Date(note.updated_at), { addSuffix: true })}
                </p>
              </button>
            ))}
          </div>
        </ScrollArea>
      )}

      {/* Floating Action Button to create a note */}
      {notes.length > 0 && (
        <div className="absolute bottom-6 right-6">
          <Button size="icon" className="w-14 h-14 rounded-full shadow-lg" onClick={handleCreateAndOpenNote} disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : <Plus size={24} />}
          </Button>
        </div>
      )}
    </div>
  );
}
