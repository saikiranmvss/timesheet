import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, DollarSign, Clock, AlertCircle, TrendingUp, ShieldCheck, Search, Filter } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { EMPLOYEES, MONTHLY_PAYROLL_TREND, PAYROLL_EMPLOYEES } from "@/lib/data";

const DEPT_DATA = [
  { name: "Engineering", value: 4, color: "hsl(221.2 83.2% 53.3%)" },
  { name: "Design", value: 2, color: "hsl(212 95% 68%)" },
  { name: "HR", value: 1, color: "hsl(262 80% 60%)" },
  { name: "Marketing", value: 1, color: "hsl(38 92% 50%)" },
  { name: "Analytics", value: 1, color: "hsl(159 60% 45%)" },
  { name: "Infrastructure", value: 1, color: "hsl(4 86% 58%)" },
];

const AUDIT_LOGS = [
  { id: 1, action: "Payroll Processed", user: "Admin System", time: "2026-05-05 09:00", type: "payroll" },
  { id: 2, action: "Timesheet Approved — Sarah Chen", user: "Priya Patel", time: "2026-05-05 10:15", type: "approval" },
  { id: 3, action: "Employee Added — Rachel Torres", user: "Lisa Rodriguez", time: "2026-05-03 14:30", type: "employee" },
  { id: 4, action: "Timesheet Unlocked — Marcus Johnson", user: "Priya Patel", time: "2026-05-02 16:45", type: "unlock" },
  { id: 5, action: "Settings Updated — Payroll Config", user: "Admin", time: "2026-05-01 11:00", type: "settings" },
  { id: 6, action: "Bulk Approval — 5 Timesheets", user: "Priya Patel", time: "2026-04-30 17:00", type: "approval" },
];

const LOG_TYPE_STYLES: Record<string, string> = {
  payroll: "bg-emerald-100 text-emerald-700",
  approval: "bg-blue-100 text-blue-700",
  employee: "bg-purple-100 text-purple-700",
  unlock: "bg-amber-100 text-amber-700",
  settings: "bg-gray-100 text-gray-600",
};

export default function Admin() {
  const totalPayroll = PAYROLL_EMPLOYEES.reduce((s, e) => s + e.gross, 0);
  const activeEmployees = EMPLOYEES.filter(e => e.status === "Active").length;
  const totalHours = PAYROLL_EMPLOYEES.reduce((s, e) => s + e.hours, 0);

  return (
    <div className="space-y-6" data-testid="admin-page">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
          <ShieldCheck className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm">System-wide analytics and controls</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Employees", value: EMPLOYEES.length.toString(), sub: `${activeEmployees} active`, icon: Users, color: "text-primary", bg: "bg-primary/10" },
          { label: "Payroll This Period", value: `$${totalPayroll.toLocaleString()}`, sub: "Apr 22 – May 5", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-100" },
          { label: "Hours Logged Today", value: "342h", sub: "Across all employees", icon: Clock, color: "text-blue-600", bg: "bg-blue-100" },
          { label: "Pending Approvals", value: "3", sub: "Require action", icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-100" },
        ].map(k => (
          <Card key={k.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{k.label}</span>
                <div className={`h-9 w-9 rounded-lg ${k.bg} flex items-center justify-center`}>
                  <k.icon className={`h-4.5 w-4.5 ${k.color}`} />
                </div>
              </div>
              <div className="text-2xl font-bold">{k.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{k.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payroll Trend */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Payroll Trend</CardTitle>
            <CardDescription>6-month payroll overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={MONTHLY_PAYROLL_TREND} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Payroll"]} />
                <Area type="monotone" dataKey="amount" stroke="hsl(221.2 83.2% 53.3%)" fill="hsl(221.2 83.2% 53.3% / 0.15)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Breakdown */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">By Department</CardTitle>
            <CardDescription>Employee distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={DEPT_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                  {DEPT_DATA.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1 mt-2">
              {DEPT_DATA.map(d => (
                <div key={d.name} className="flex items-center gap-1.5 text-xs">
                  <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="text-muted-foreground truncate">{d.name} ({d.value})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Search & Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-base">All Employees</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-9 h-8 w-48 text-sm" data-testid="input-search" />
              </div>
              <Select>
                <SelectTrigger className="w-36 h-8 text-sm" data-testid="select-dept"><SelectValue placeholder="Department" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Depts</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-28 h-8 text-sm" data-testid="select-status"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Pay Type</TableHead>
                  <TableHead className="text-right">Rate</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {EMPLOYEES.map(emp => (
                  <TableRow key={emp.id} data-testid={`row-admin-emp-${emp.id}`}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">{emp.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{emp.name}</div>
                          <div className="text-xs text-muted-foreground">{emp.number}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{emp.department}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px]">{emp.payType}</Badge></TableCell>
                    <TableCell className="text-right text-sm font-medium">
                      {emp.payType === "Hourly" ? `$${emp.hourlyRate}/hr` : `$${emp.monthlySalary?.toLocaleString()}/mo`}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{emp.payFrequency}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] ${emp.status === "Active" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : emp.status === "On Leave" ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-gray-100 text-gray-600"}`}>
                        {emp.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Audit Log</CardTitle>
          <CardDescription>Recent system activity</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {AUDIT_LOGS.map(log => (
              <div key={log.id} className="flex items-center justify-between px-6 py-3 hover:bg-muted/20" data-testid={`log-${log.id}`}>
                <div className="flex items-center gap-3">
                  <Badge className={`text-[10px] ${LOG_TYPE_STYLES[log.type] || ""}`}>{log.type}</Badge>
                  <span className="text-sm">{log.action}</span>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <div className="text-xs text-muted-foreground">{log.user}</div>
                  <div className="text-xs text-muted-foreground">{log.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
