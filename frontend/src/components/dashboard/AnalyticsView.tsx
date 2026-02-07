import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { analyticsService } from "../../services/analyticsService";

interface Analytics {
  id: string;
  totalChats: number;
  totalTasks: number;
  completedTasks: number;
  totalNotes: number;
  totalEvents: number;
  lastActiveAt?: string;
}

export default function AnalyticsView() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const data = await analyticsService.getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading analytics...</div>;
  }

  if (!analytics) {
    return <div className="p-6">No analytics data available</div>;
  }

  const stats = [
    { label: "Total Chats", value: analytics.totalChats },
    { label: "Total Tasks", value: analytics.totalTasks },
    { label: "Completed Tasks", value: analytics.completedTasks },
    { label: "Total Notes", value: analytics.totalNotes },
    { label: "Total Events", value: analytics.totalEvents },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Analytics</h2>
        {analytics.lastActiveAt && (
          <p className="text-muted-foreground">
            Last active: {new Date(analytics.lastActiveAt).toLocaleString()}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 text-center">
            <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
            <p className="text-4xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Summary</h3>
        <div className="space-y-2 text-sm">
          <p>
            You've completed{" "}
            <span className="font-bold">{analytics.completedTasks}</span> out of{" "}
            <span className="font-bold">{analytics.totalTasks}</span> tasks (
            {analytics.totalTasks > 0
              ? Math.round((analytics.completedTasks / analytics.totalTasks) * 100)
              : 0}
            % completion rate)
          </p>
          <p>
            You've created <span className="font-bold">{analytics.totalNotes}</span> notes
          </p>
          <p>
            You've had <span className="font-bold">{analytics.totalChats}</span> chat
            conversations
          </p>
          <p>
            You've scheduled <span className="font-bold">{analytics.totalEvents}</span> events
          </p>
        </div>
      </Card>
    </div>
  );
}
