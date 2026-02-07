import {
  MessageCircle,
  Calendar,
  CheckSquare,
  FileText,
  BarChart3,
  Settings,
  Sparkles,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const tabs = [
    { id: "chat", label: "Chat", icon: MessageCircle, gradient: "from-purple-500 to-pink-500" },
    { id: "tasks", label: "Tasks", icon: CheckSquare, gradient: "from-blue-500 to-cyan-500" },
    { id: "notes", label: "Notes", icon: FileText, gradient: "from-amber-500 to-orange-500" },
    { id: "calendar", label: "Calendar", icon: Calendar, gradient: "from-green-500 to-emerald-500" },
    { id: "analytics", label: "Analytics", icon: BarChart3, gradient: "from-indigo-500 to-purple-500" },
    { id: "settings", label: "Settings", icon: Settings, gradient: "from-slate-500 to-gray-500" },
  ];

  return (
    <div className="w-64 border-r bg-white dark:bg-slate-900 flex flex-col h-full shadow-sm">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent truncate">
              Nova AI
            </h1>
            <p className="text-xs text-muted-foreground truncate">Your AI Assistant</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? `bg-gradient-to-r ${tab.gradient} text-white shadow-md`
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium text-sm">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Tip */}
      <div className="p-4 border-t">
        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-100 dark:border-purple-800">
          <div className="flex items-start gap-2">
            <span className="text-lg flex-shrink-0">💡</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-purple-900 dark:text-purple-100 mb-1">Pro Tip</p>
              <p className="text-xs text-purple-700 dark:text-purple-300 leading-relaxed">
                Use keyboard shortcuts to navigate faster!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
