import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import ChatArea from "../components/chat/ChatArea";
import Sidebar from "../components/sidebar/Sidebar";
import TasksView from "../components/dashboard/TasksView";
import NotesView from "../components/dashboard/NotesView";
import CalendarView from "../components/dashboard/CalendarView";
import AnalyticsView from "../components/dashboard/AnalyticsView";
import SettingsView from "../components/dashboard/SettingsView";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function Index() {
  const [activeTab, setActiveTab] = useState("chat");
  const navigate = useNavigate();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col">
        <div className="border-b p-4 flex justify-between items-center bg-white">
          <h1 className="text-2xl font-bold">Nova AI</h1>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="flex-1 overflow-auto">
          {activeTab === "chat" && <ChatArea />}
          {activeTab === "tasks" && <TasksView />}
          {activeTab === "notes" && <NotesView />}
          {activeTab === "calendar" && <CalendarView />}
          {activeTab === "analytics" && <AnalyticsView />}
          {activeTab === "settings" && <SettingsView />}
        </div>
      </div>
    </div>
  );
}
