import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Clock, TrendingUp, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TEAM_MEMBERS } from "@/lib/data";

const TEAM_HOURS_DATA = [
  { name: "Sarah", regular: 38.5, overtime: 0 },
  { name: "Marcus", regular: 40, overtime: 2 },
  { name: "Tom", regular: 40, overtime: 5 },
  { name: "Rachel", regular: 36, overtime: 0 },
  { name: "David", regular: 40, overtime: 0 },
];

export default function Teams() {
  const totalHours = TEAM_MEMBERS.reduce((s, m) => s + m.hoursThisWeek, 0);
  const totalOvertime = TEAM_MEMBERS.reduce((s, m) => s + m.overtime, 0);
  const pendingCount = TEAM_MEMBERS.reduce((s, m) => s + m.pendingTimesheets, 0);

  return (
    <div className="space-y-6" data-testid="teams-page">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Teams</h1>
        <p className="text-muted-foreground text-sm">Engineering team — {TEAM_MEMBERS.length} members</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Team Size</span>
            </div>
            <div className="text-2xl font-bold">{TEAM_MEMBERS.length}</div>
            <div className="text-xs text-muted-foreground">Active members</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Total Hours</span>
            </div>
            <div className="text-2xl font-bold">{totalHours.toFixed(1)}h</div>
            <div className="text-xs text-muted-foreground">This week</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-amber-600" />
              <span className="text-xs text-muted-foreground">Overtime</span>
            </div>
            <div className="text-2xl font-bold text-amber-600">{totalOvertime}h</div>
            <div className="text-xs text-muted-foreground">Team total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-xs text-muted-foreground">Pending</span>
            </div>
            <div className="text-2xl font-bold text-destructive">{pendingCount}</div>
            <div className="text-xs text-muted-foreground">Timesheets to review</div>
          </CardContent>
        </Card>
      </div>

      {/* Team Hours Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Team Hours This Week</CardTitle>
          <CardDescription>Regular vs overtime per team member</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={TEAM_HOURS_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="regular" name="Regular" fill="hsl(221.2 83.2% 53.3%)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="overtime" name="Overtime" fill="hsl(38 92% 50%)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Team Member Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEAM_MEMBERS.map(member => (
          <Card key={member.id} data-testid={`card-member-${member.id}`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">{member.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">{member.name}</div>
                    <div className="text-xs text-muted-foreground">{member.role}</div>
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px] bg-emerald-100 text-emerald-700 border-emerald-200">
                  {member.status}
                </Badge>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Hours this week</span>
                    <span className="font-medium text-foreground">{member.hoursThisWeek}h / 40h</span>
                  </div>
                  <Progress value={(member.hoursThisWeek / 40) * 100} className="h-1.5" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Overtime</span>
                  <span className={`font-medium ${member.overtime > 0 ? "text-amber-600" : "text-muted-foreground"}`}>
                    {member.overtime > 0 ? `${member.overtime}h` : "—"}
                  </span>
                </div>
                {member.pendingTimesheets > 0 && (
                  <div className="flex items-center gap-2 p-2 bg-amber-50 dark:bg-amber-900/20 rounded text-xs text-amber-700 dark:text-amber-400">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {member.pendingTimesheets} timesheet{member.pendingTimesheets > 1 ? "s" : ""} pending review
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Team Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Hours</TableHead>
                <TableHead className="text-right">Overtime</TableHead>
                <TableHead>Pending</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TEAM_MEMBERS.map(member => (
                <TableRow key={member.id} data-testid={`row-member-${member.id}`}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">{member.avatar}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{member.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{member.role}</TableCell>
                  <TableCell className="text-right font-medium">{member.hoursThisWeek}h</TableCell>
                  <TableCell className="text-right">
                    {member.overtime > 0 ? <span className="text-amber-600 font-medium">{member.overtime}h</span> : <span className="text-muted-foreground">—</span>}
                  </TableCell>
                  <TableCell>
                    {member.pendingTimesheets > 0 ? (
                      <Badge variant="outline" className="text-[10px] bg-amber-100 text-amber-700 border-amber-200">{member.pendingTimesheets} pending</Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px]">Up to date</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] bg-emerald-100 text-emerald-700 border-emerald-200">{member.status}</Badge>
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
