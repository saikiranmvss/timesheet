import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Download, FileText, BarChart3, FileBarChart } from "lucide-react";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { EMPLOYEES, MONTHLY_PAYROLL_TREND, PAYROLL_EMPLOYEES } from "@/lib/data";

const HOURS_REPORT = [
  { employee: "Sarah Chen", initials: "SC", week1: 38.5, week2: 40, week3: 42, week4: 37.5, total: 158, overtime: 2 },
  { employee: "Marcus Johnson", initials: "MJ", week1: 40, week2: 42, week3: 38, week4: 40, total: 160, overtime: 2 },
  { employee: "Tom Williams", initials: "TW", week1: 45, week2: 40, week3: 43, week4: 40, total: 168, overtime: 8 },
  { employee: "Rachel Torres", initials: "RT", week1: 36, week2: 40, week3: 38, week4: 36, total: 150, overtime: 0 },
  { employee: "David Kim", initials: "DK", week1: 40, week2: 40, week3: 40, week4: 40, total: 160, overtime: 0 },
  { employee: "James Wilson", initials: "JW", week1: 44, week2: 42, week3: 40, week4: 44, total: 170, overtime: 10 },
];

const OVERTIME_CHART = [
  { name: "Sarah", hours: 2 }, { name: "Marcus", hours: 2 },
  { name: "Tom", hours: 8 }, { name: "Rachel", hours: 0 },
  { name: "David", hours: 0 }, { name: "James", hours: 10 },
];

export default function Reports() {
  const [reportType, setReportType] = useState("payroll");
  const [period, setPeriod] = useState("april");

  return (
    <div className="space-y-6" data-testid="reports-page">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground text-sm">Analytics and data exports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" data-testid="button-export-csv">
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </Button>
          <Button variant="outline" size="sm" data-testid="button-export-pdf">
            <FileText className="h-4 w-4 mr-2" /> Export PDF
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={reportType} onValueChange={setReportType}>
          <SelectTrigger className="w-48" data-testid="select-report-type"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="payroll">Payroll Report</SelectItem>
            <SelectItem value="hours">Employee Hours Report</SelectItem>
            <SelectItem value="overtime">Overtime Report</SelectItem>
            <SelectItem value="attendance">Attendance Report</SelectItem>
            <SelectItem value="team">Team Report</SelectItem>
          </SelectContent>
        </Select>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-40" data-testid="select-period"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="may">May 2026</SelectItem>
            <SelectItem value="april">April 2026</SelectItem>
            <SelectItem value="march">March 2026</SelectItem>
            <SelectItem value="q1">Q1 2026</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-48" data-testid="select-employee"><SelectValue placeholder="All Employees" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Employees</SelectItem>
            {EMPLOYEES.map(e => <SelectItem key={e.id} value={e.id.toString()}>{e.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Report Type Content */}
      {reportType === "payroll" && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Payroll Summary — April 2026</CardTitle>
              <CardDescription>Total payroll expenditure by month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
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
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Individual Payroll Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Pay Type</TableHead>
                      <TableHead className="text-right">Hours</TableHead>
                      <TableHead className="text-right">Gross</TableHead>
                      <TableHead className="text-right">Tax</TableHead>
                      <TableHead className="text-right">Net</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {PAYROLL_EMPLOYEES.map(emp => (
                      <TableRow key={emp.id} data-testid={`row-report-${emp.id}`}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarFallback className="text-xs bg-primary/10 text-primary">{emp.avatar}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{emp.name}</span>
                          </div>
                        </TableCell>
                        <TableCell><Badge variant="outline" className="text-[10px]">{emp.payType}</Badge></TableCell>
                        <TableCell className="text-right text-sm">{emp.hours}h</TableCell>
                        <TableCell className="text-right font-semibold">${emp.gross.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-muted-foreground text-sm">${emp.tax.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-bold text-emerald-700">${emp.net.toLocaleString()}</TableCell>
                        <TableCell><Badge variant="outline" className={`text-[10px] ${emp.status === "Paid" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : emp.status === "Processing" ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-amber-100 text-amber-700 border-amber-200"}`}>{emp.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/30 font-bold">
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell className="text-right">{PAYROLL_EMPLOYEES.reduce((s, e) => s + e.hours, 0)}h</TableCell>
                      <TableCell className="text-right">${PAYROLL_EMPLOYEES.reduce((s, e) => s + e.gross, 0).toLocaleString()}</TableCell>
                      <TableCell className="text-right text-muted-foreground">${PAYROLL_EMPLOYEES.reduce((s, e) => s + e.tax, 0).toLocaleString()}</TableCell>
                      <TableCell className="text-right text-emerald-700">${PAYROLL_EMPLOYEES.reduce((s, e) => s + e.net, 0).toLocaleString()}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {reportType === "hours" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Employee Hours Report — April 2026</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead className="text-right">Week 1</TableHead>
                    <TableHead className="text-right">Week 2</TableHead>
                    <TableHead className="text-right">Week 3</TableHead>
                    <TableHead className="text-right">Week 4</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Overtime</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {HOURS_REPORT.map((row, i) => (
                    <TableRow key={i} data-testid={`row-hours-${i}`}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">{row.initials}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{row.employee}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-sm">{row.week1}h</TableCell>
                      <TableCell className="text-right text-sm">{row.week2}h</TableCell>
                      <TableCell className="text-right text-sm">{row.week3}h</TableCell>
                      <TableCell className="text-right text-sm">{row.week4}h</TableCell>
                      <TableCell className="text-right font-bold">{row.total}h</TableCell>
                      <TableCell className="text-right">
                        {row.overtime > 0 ? <span className="text-amber-600 font-medium">{row.overtime}h</span> : "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {reportType === "overtime" && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Overtime Report — April 2026</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={OVERTIME_CHART} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="hours" name="Overtime Hours" fill="hsl(38 92% 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {(reportType === "attendance" || reportType === "team") && (
        <Card>
          <CardContent className="p-16 text-center">
            <FileBarChart className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
            <div className="font-medium text-muted-foreground">Report generated</div>
            <div className="text-sm text-muted-foreground/70 mt-1">
              {reportType === "attendance" ? "Attendance" : "Team"} report for {period === "april" ? "April 2026" : period}
            </div>
            <Button variant="outline" size="sm" className="mt-4" data-testid="button-download-report">
              <Download className="h-4 w-4 mr-2" /> Download Report
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
