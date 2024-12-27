import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X,  Trash2, Pencil } from 'lucide-react';
import Loading from '@/components/Loading';

interface Note {
  _id: string;
  title: string;
  content: string;
  category: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { token } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotes = async () => {
    if (!token) return;
    try {
      const data = await api.notes.getAll(token);
      setNotes(data.notes);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
    const pollInterval = setInterval(fetchNotes, 10000);
    return () => clearInterval(pollInterval);
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      if (editingNote) {
        await api.notes.update(token, editingNote._id, { title, content, category });
      } else {
        await api.notes.create(token, { title, content, category });
      }
      resetForm();
      fetchNotes();
    } catch (err) {
      console.error('Failed to save note:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await api.notes.delete(token, id);
      fetchNotes();
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setCategory('General');
    setEditingNote(null);
    setIsFormOpen(false);
  };

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch = 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'All' || note.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [notes, searchQuery, selectedCategory]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            My Notes
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-2">
            {filteredNotes.length} of {notes.length} notes
          </p>
        </div>
        <Button 
          onClick={() => setIsFormOpen(true)} 
          className="flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
        >
          <Plus className="h-4 w-4" />
          New Note
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full dark:text-white"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="h-10 w-full md:w-48 rounded-md bg-white px-3 py-2 text-sm dark:text-neutral-100 dark:bg-neutral-900"
        >
          <option value="All">All Categories</option>
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
          <option value="Others">Others</option>
        </select>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-8 w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold dark:text-neutral-100">
                {editingNote ? 'Edit Note' : 'Create Note'}
              </h2>
              <button 
                onClick={resetForm} 
                className="text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-100"
              />
              <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border rounded-md min-h-[100px] dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-100"
                required
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded-md dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-100"
              >
                <option value="General">General</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Shopping">Shopping</option>
                <option value="Others">Others</option>
              </select>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingNote ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredNotes.map((note) => (
          <div
            key={note._id}
            className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
                  {note.title}
                </h3>
                <span className="inline-block px-2 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full mt-2">
                  {note.category}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditingNote(note);
                    setTitle(note.title);
                    setContent(note.content);
                    setCategory(note.category);
                    setIsFormOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4 text-neutral-500 dark:text-neutral-100" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(note._id)}
                >
                  <Trash2 className="h-4 w-4 text-neutral-500 dark:text-red-500" />
                </Button>
              </div>
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap leading-relaxed">
              {note.content}
            </p>
          </div>
        ))}

        {filteredNotes.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-full mb-6">
              <Plus className="h-10 w-10 text-neutral-400 dark:text-neutral-500" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-1">
              {notes.length === 0 ? 'No notes yet' : 'No matching notes'}
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 mb-4">
              {notes.length === 0 
                ? 'Get started by creating your first note'
                : 'Try adjusting your search or filter'}
            </p>
            {notes.length === 0 && (
              <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Note
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 