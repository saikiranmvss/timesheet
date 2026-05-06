import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Clock, TrendingUp, CheckCircle, XCircle, Unlock, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TEAM_MEMBERS, APPROVALS } from "@/lib/data";

const OVERTIME_DATA = [
  { name: "Sarah C.", overtime: 0 },
  { name: "Marcus J.", overtime: 2 },
  { name: "Tom W.", overtime: 5 },
  { name: "Rachel T.", overtime: 0 },
  { name: "David K.", overtime: 0 },
];

export default function Supervisor() {
  const pending = APPROVALS.filter(a => a.status === "Pending");

  return (
    <div className="space-y-6" data-testid="supervisor-page">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Supervisor Dashboard</h1>
        <p className="text-muted-foreground text-sm">Team overview and approval management</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Team Members", value: TEAM_MEMBERS.length, icon: Users, color: "text-primary", bg: "bg-primary/10" },
          { label: "Hours This Week", value: `${TEAM_MEMBERS.reduce((s, m) => s + m.hoursThisWeek, 0).toFixed(0)}h`, icon: Clock, color: "text-blue-600", bg: "bg-blue-100" },
          { label: "Team Overtime", value: `${TEAM_MEMBERS.reduce((s, m) => s + m.overtime, 0)}h`, icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-100" },
          { label: "Pending Approvals", value: pending.length, icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10" },
        ].map(k => (
          <Card key={k.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{k.label}</span>
                <div className={`h-9 w-9 rounded-lg ${k.bg} flex items-center justify-center`}>
                  <k.icon className={`h-4 w-4 ${k.color}`} />
                </div>
              </div>
              <div className={`text-2xl font-bold ${k.color}`}>{k.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overtime Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Overtime by Member</CardTitle>
            <CardDescription>This week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={OVERTIME_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="overtime" name="Overtime (hrs)" fill="hsl(38 92% 50%)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Team Status</CardTitle>
            <CardDescription>Hours progress this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {TEAM_MEMBERS.map(member => (
              <div key={member.id} className="flex items-center gap-3" data-testid={`team-status-${member.id}`}>
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">{member.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{member.name}</span>
                    <span className="text-xs text-muted-foreground">{member.hoursThisWeek}h</span>
                  </div>
                  <Progress value={(member.hoursThisWeek / 40) * 100} className="h-1.5" />
                </div>
                {member.pendingTimesheets > 0 && (
                  <Badge variant="outline" className="text-[10px] bg-amber-100 text-amber-700 border-amber-200 shrink-0">
                    {member.pendingTimesheets}
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Approval Queue */}
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Approval Queue</CardTitle>
            <CardDescription>{pending.length} awaiting your review</CardDescription>
          </div>
          <Button size="sm" variant="outline" data-testid="button-approve-all">
            <CheckCircle className="h-4 w-4 mr-2" /> Approve All Pending
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Period</TableHead>
                <TableHead className="text-right">Hours</TableHead>
                <TableHead className="text-right">Overtime</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {APPROVALS.map(approval => (
                <TableRow key={approval.id} data-testid={`row-approval-${approval.id}`}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">{approval.avatar}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{approval.employee}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{approval.period}</TableCell>
                  <TableCell className="text-right font-semibold">{approval.hours}h</TableCell>
                  <TableCell className="text-right">
                    {approval.overtime > 0 ? <span className="text-amber-600 font-medium">{approval.overtime}h</span> : "—"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{approval.submittedAt}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] ${approval.status === "Approved" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : approval.status === "Rejected" ? "bg-red-100 text-red-700 border-red-200" : "bg-amber-100 text-amber-700 border-amber-200"}`}>
                      {approval.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {approval.status === "Pending" && (
                      <div className="flex gap-1">
                        <Button size="icon" className="h-7 w-7 bg-emerald-600 hover:bg-emerald-700" data-testid={`button-approve-${approval.id}`}>
                          <CheckCircle className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="icon" variant="outline" className="h-7 w-7 text-destructive" data-testid={`button-reject-${approval.id}`}>
                          <XCircle className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="icon" variant="outline" className="h-7 w-7" data-testid={`button-unlock-${approval.id}`}>
                          <Unlock className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
