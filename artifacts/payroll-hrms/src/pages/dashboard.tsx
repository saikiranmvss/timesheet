import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, TrendingUp, DollarSign, AlertCircle, CheckCircle, XCircle, ChevronRight, ArrowUp, ArrowDown } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { WEEKLY_HOURS, TIMESHEETS, NOTIFICATIONS } from "@/lib/data";

const hoursData = WEEKLY_HOURS;

const attendanceData = [
  { month: "Jan", present: 21, absent: 1, leave: 0 },
  { month: "Feb", present: 19, absent: 0, leave: 1 },
  { month: "Mar", present: 22, absent: 1, leave: 0 },
  { month: "Apr", present: 20, absent: 0, leave: 2 },
  { month: "May", present: 4, absent: 0, leave: 0 },
];

export default function Dashboard() {
  const [, setLocation] = useLocation();

  const totalHoursThisWeek = hoursData.reduce((s, d) => s + d.regular + d.overtime, 0);
  const overtimeHours = hoursData.reduce((s, d) => s + d.overtime, 0);

  return (
    <div className="space-y-6" data-testid="dashboard-page">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Good morning, Sarah</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Wednesday, May 6, 2026 — Week 19</p>
        </div>
        <Button onClick={() => setLocation("/timesheets")} data-testid="button-add-timesheet">
          Add Timesheet
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card data-testid="card-total-hours">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">Hours This Week</span>
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="h-4.5 w-4.5 text-primary" />
              </div>
            </div>
            <div className="text-2xl font-bold">{totalHoursThisWeek}h</div>
            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600">
              <ArrowUp className="h-3 w-3" /> <span>2.5h from last week</span>
            </div>
            <Progress value={(totalHoursThisWeek / 40) * 100} className="mt-3 h-1.5" />
            <p className="text-xs text-muted-foreground mt-1">{totalHoursThisWeek}/40 hours</p>
          </CardContent>
        </Card>

        <Card data-testid="card-overtime">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">Overtime Hours</span>
              <div className="h-9 w-9 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <TrendingUp className="h-4.5 w-4.5 text-amber-600" />
              </div>
            </div>
            <div className="text-2xl font-bold">{overtimeHours}h</div>
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <span>At $67.50/hr rate</span>
            </div>
            <div className="text-sm font-semibold text-amber-600 mt-3">${(overtimeHours * 67.5).toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card data-testid="card-payroll-summary">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">Est. Fortnightly Pay</span>
              <div className="h-9 w-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <DollarSign className="h-4.5 w-4.5 text-emerald-600" />
              </div>
            </div>
            <div className="text-2xl font-bold">$2,700</div>
            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600">
              <ArrowUp className="h-3 w-3" /> <span>$180 from last period</span>
            </div>
            <Badge variant="secondary" className="mt-3 text-xs">Next pay: May 16</Badge>
          </CardContent>
        </Card>

        <Card data-testid="card-approval-status">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">Timesheet Status</span>
              <div className="h-9 w-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <CheckCircle className="h-4.5 w-4.5 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground mt-1">approved this period</p>
            <div className="flex gap-2 mt-3">
              <Badge className="text-[10px] bg-amber-100 text-amber-700 border-amber-200">1 Pending</Badge>
              <Badge className="text-[10px] bg-destructive/10 text-destructive border-destructive/20">1 Rejected</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Hours This Week</CardTitle>
            <CardDescription>Regular vs overtime hours by day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={hoursData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="regular" name="Regular" fill="hsl(221.2 83.2% 53.3%)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="overtime" name="Overtime" fill="hsl(38 92% 50%)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Attendance Summary</CardTitle>
            <CardDescription>Last 5 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={attendanceData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Area type="monotone" dataKey="present" name="Present" stroke="hsl(221.2 83.2% 53.3%)" fill="hsl(221.2 83.2% 53.3% / 0.15)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Timesheets + Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Recent Timesheets</CardTitle>
              <CardDescription>Last 5 entries</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setLocation("/timesheets")} className="text-primary text-xs gap-1" data-testid="link-view-timesheets">
              View all <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {TIMESHEETS.slice(0, 5).map((ts) => (
                <div key={ts.id} className="flex items-center justify-between px-6 py-3 hover:bg-muted/30 transition-colors" data-testid={`row-timesheet-${ts.id}`}>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{ts.project}</p>
                    <p className="text-xs text-muted-foreground">{ts.date} · {ts.hours}h</p>
                  </div>
                  <StatusBadge status={ts.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Notifications</CardTitle>
              <CardDescription>{NOTIFICATIONS.filter(n => !n.read).length} unread</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setLocation("/notifications")} className="text-primary text-xs gap-1" data-testid="link-view-notifications">
              View all <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {NOTIFICATIONS.slice(0, 5).map((n) => (
                <div key={n.id} className={`flex items-start gap-3 px-6 py-3 hover:bg-muted/30 transition-colors ${!n.read ? 'bg-primary/5' : ''}`} data-testid={`notification-${n.id}`}>
                  <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${!n.read ? 'bg-primary' : 'bg-transparent'}`} />
                  <div className="min-w-0">
                    <p className={`text-sm ${!n.read ? 'font-medium' : ''} truncate`}>{n.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Submitted: "bg-blue-100 text-blue-700 border-blue-200",
    Rejected: "bg-red-100 text-red-700 border-red-200",
    Draft: "bg-gray-100 text-gray-600 border-gray-200",
  };
  return <Badge variant="outline" className={`text-[10px] ${map[status] || ''}`}>{status}</Badge>;
}
