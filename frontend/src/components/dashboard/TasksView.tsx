import { useState, useEffect } from "react";
import { Plus, Trash2, CheckCircle2, Circle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select } from "../ui/select";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { taskService, Task } from "../../services/taskService";

export default function TasksView() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    category: "",
    dueDate: "",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newTask = await taskService.createTask(formData);
      setTasks([...tasks, newTask]);
      setFormData({ title: "", description: "", priority: "medium", category: "", dueDate: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const handleToggleTask = async (task: Task) => {
    try {
      const updated = await taskService.updateTask(task.id, {
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const priorityConfig = {
    low: { color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", label: "Low" },
    medium: { color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400", label: "Medium" },
    high: { color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", label: "High" },
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="p-8 space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-2">Tasks</h2>
          <p className="text-muted-foreground">
            {completedTasks} of {totalTasks} tasks completed
          </p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="gradient-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Task
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 space-y-4 glass-effect animate-scale-in shadow-xl">
          <form onSubmit={handleAddTask} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Task title"
                required
                className="h-11"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Task description"
                className="min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Priority
                </label>
                <Select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: e.target.value as any,
                    })
                  }
                  className="h-11"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <Input
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="Category"
                  className="h-11"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Due Date
                </label>
                <Input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                  className="h-11"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button type="submit" className="gradient-primary text-white">Add Task</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-lg font-medium mb-2">No tasks yet</p>
            <p className="text-muted-foreground">Create your first task to get started!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <Card key={task.id} className="p-5 card-hover glass-effect">
              <div className="flex items-start gap-4">
                <button
                  onClick={() => handleToggleTask(task)}
                  className="mt-1 transition-transform hover:scale-110"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400 hover:text-purple-600" />
                  )}
                </button>
                
                <div className="flex-1">
                  <h3
                    className={`font-semibold text-lg mb-1 ${
                      task.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-sm text-muted-foreground mb-3">
                      {task.description}
                    </p>
                  )}
                  <div className="flex gap-2 flex-wrap">
                    <Badge className={priorityConfig[task.priority].color}>
                      {priorityConfig[task.priority].label}
                    </Badge>
                    {task.category && (
                      <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                        {task.category}
                      </Badge>
                    )}
                    {task.dueDate && (
                      <Badge className="border border-gray-300 bg-transparent">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteTask(task.id)}
                  className="hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
