import { useState, useEffect } from "react";
import { Plus, Trash2, StickyNote } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card } from "../ui/card";
import { notesService, Note } from "../../services/notesService";

export default function NotesView() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    color: "#fef3c7",
  });

  const colorOptions = [
    { value: "#fef3c7", label: "Yellow", class: "bg-yellow-100" },
    { value: "#fecaca", label: "Red", class: "bg-red-100" },
    { value: "#bfdbfe", label: "Blue", class: "bg-blue-100" },
    { value: "#bbf7d0", label: "Green", class: "bg-green-100" },
    { value: "#e9d5ff", label: "Purple", class: "bg-purple-100" },
    { value: "#fed7aa", label: "Orange", class: "bg-orange-100" },
    { value: "#fbcfe8", label: "Pink", class: "bg-pink-100" },
  ];

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await notesService.getNotes();
      setNotes(data);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newNote = await notesService.createNote(formData);
      setNotes([...notes, newNote]);
      setFormData({ title: "", content: "", color: "#fef3c7" });
      setShowForm(false);
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await notesService.deleteNote(id);
      setNotes(notes.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-2">Notes</h2>
          <p className="text-muted-foreground">
            {notes.length} {notes.length === 1 ? 'note' : 'notes'} saved
          </p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="gradient-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Note
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 space-y-4 glass-effect animate-scale-in shadow-xl">
          <form onSubmit={handleAddNote} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Note title"
                required
                className="h-11"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <Textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Write your note here..."
                required
                className="min-h-[150px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Color</label>
              <div className="flex gap-2 flex-wrap">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, color: color.value })}
                    className={`w-10 h-10 rounded-lg ${color.class} border-2 transition-all hover:scale-110 ${
                      formData.color === color.value
                        ? "border-purple-600 ring-2 ring-purple-300"
                        : "border-gray-300"
                    }`}
                    title={color.label}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Button type="submit" className="gradient-primary text-white">Add Note</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading notes...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center mx-auto mb-4">
              <StickyNote className="w-10 h-10 text-amber-600 dark:text-amber-400" />
            </div>
            <p className="text-lg font-medium mb-2">No notes yet</p>
            <p className="text-muted-foreground">Create your first note to get started!</p>
          </div>
        ) : (
          notes.map((note) => (
            <Card
              key={note.id}
              className="p-5 card-hover shadow-lg relative overflow-hidden group"
              style={{
                backgroundColor: note.color || "#fef3c7",
              }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-black/5 rounded-bl-full"></div>
              
              <div className="flex justify-between items-start mb-3 relative z-10">
                <h3 className="font-bold text-lg text-gray-900 pr-8">{note.title}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteNote(note.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 hover:text-red-600 -mt-2 -mr-2"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {note.content}
              </p>
              
              <div className="mt-4 pt-3 border-t border-gray-900/10">
                <p className="text-xs text-gray-600">
                  {new Date(note.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
