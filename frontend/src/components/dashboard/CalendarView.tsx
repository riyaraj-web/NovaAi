import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card } from "../ui/card";
import { eventService } from "../../services/eventService";

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  color?: string;
}

export default function CalendarView() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    location: "",
    color: "#3b82f6",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await eventService.getEvents();
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newEvent = await eventService.createEvent(formData);
      setEvents([...events, newEvent]);
      setFormData({
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        location: "",
        color: "#3b82f6",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await eventService.deleteEvent(id);
      setEvents(events.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Calendar</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          New Event
        </Button>
      </div>

      {showForm && (
        <Card className="p-4 space-y-4">
          <form onSubmit={handleAddEvent} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Event title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Event description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Time
                </label>
                <Input
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  End Time
                </label>
                <Input
                  type="datetime-local"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <Input
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="Event location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
              <Input
                type="color"
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Add Event</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-2">
        {loading ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-muted-foreground">
            No events yet. Create one to get started!
          </p>
        ) : (
          events.map((event) => (
            <Card
              key={event.id}
              className="p-4 border-l-4"
              style={{
                borderLeftColor: event.color || "#3b82f6",
              }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{event.title}</h3>
                  {event.description && (
                    <p className="text-sm text-muted-foreground">
                      {event.description}
                    </p>
                  )}
                  <div className="text-sm text-muted-foreground mt-1">
                    {new Date(event.startTime).toLocaleString()} -{" "}
                    {new Date(event.endTime).toLocaleString()}
                  </div>
                  {event.location && (
                    <div className="text-sm text-muted-foreground">
                      📍 {event.location}
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
