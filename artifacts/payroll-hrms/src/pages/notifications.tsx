import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, XCircle, DollarSign, Clock, Unlock, AlertCircle, Check } from "lucide-react";
import { NOTIFICATIONS } from "@/lib/data";

const TYPE_CONFIG: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  success: { icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-100" },
  error: { icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
  info: { icon: DollarSign, color: "text-blue-600", bg: "bg-blue-100" },
  warning: { icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-100" },
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const grouped = notifications.reduce<Record<string, typeof notifications>>((acc, n) => {
    if (!acc[n.date]) acc[n.date] = [];
    acc[n.date].push(n);
    return acc;
  }, {});

  return (
    <div className="space-y-6" data-testid="notifications-page">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          {unreadCount > 0 && (
            <Badge className="bg-primary text-primary-foreground">{unreadCount} unread</Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead} data-testid="button-mark-all-read">
            <Check className="h-4 w-4 mr-2" /> Mark all read
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([date, items]) => (
          <div key={date}>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{date}</div>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {items.map(notification => {
                    const config = TYPE_CONFIG[notification.type] || TYPE_CONFIG.info;
                    const Icon = config.icon;
                    return (
                      <div
                        key={notification.id}
                        className={`flex items-start gap-4 px-6 py-4 hover:bg-muted/20 transition-colors cursor-pointer ${!notification.read ? "bg-primary/5" : ""}`}
                        onClick={() => markRead(notification.id)}
                        data-testid={`notification-${notification.id}`}
                      >
                        <div className={`h-9 w-9 rounded-lg ${config.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                          <Icon className={`h-4.5 w-4.5 ${config.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className={`text-sm ${!notification.read ? "font-semibold" : "font-medium"}`}>
                              {notification.title}
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {!notification.read && (
                                <div className="h-2 w-2 rounded-full bg-primary" />
                              )}
                              <span className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{notification.message}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Bell className="h-12 w-12 text-muted-foreground/40 mb-3" />
            <p className="font-medium text-muted-foreground">No notifications</p>
            <p className="text-sm text-muted-foreground/70 mt-1">You're all caught up!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
