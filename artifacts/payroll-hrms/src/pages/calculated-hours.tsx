import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const WEEKLY_DATA = [
  { date: "Mon, Apr 29", timeIn: "08:25", timeOut: "17:05", totalHours: 8.5, overtime: 0.5 },
  { date: "Tue, Apr 30", timeIn: "08:30", timeOut: "17:00", totalHours: 8.0, overtime: 0 },
  { date: "Wed, May 1", timeIn: "08:15", timeOut: "17:30", totalHours: 8.75, overtime: 0.75 },
  { date: "Thu, May 2", timeIn: "09:00", timeOut: "17:00", totalHours: 8.0, overtime: 0 },
  { date: "Fri, May 3", timeIn: "08:30", timeOut: "16:30", totalHours: 8.0, overtime: 0 },
  { date: "Sat, May 4", timeIn: "—", timeOut: "—", totalHours: 0, overtime: 0 },
  { date: "Sun, May 5", timeIn: "—", timeOut: "—", totalHours: 0, overtime: 0 },
];

const FORTNIGHTLY_DATA = [
  { date: "Mon, Apr 22", timeIn: "08:20", timeOut: "17:10", totalHours: 8.5, overtime: 0.5 },
  { date: "Tue, Apr 23", timeIn: "08:30", timeOut: "17:00", totalHours: 8.0, overtime: 0 },
  { date: "Wed, Apr 24", timeIn: "08:00", timeOut: "18:00", totalHours: 10.0, overtime: 2.0 },
  { date: "Thu, Apr 25", timeIn: "09:00", timeOut: "17:00", totalHours: 8.0, overtime: 0 },
  { date: "Fri, Apr 26", timeIn: "08:30", timeOut: "16:30", totalHours: 8.0, overtime: 0 },
  ...WEEKLY_DATA,
];

const CHART_DATA = [
  { day: "Apr 22", hours: 8.5 },
  { day: "Apr 23", hours: 8.0 },
  { day: "Apr 24", hours: 10.0 },
  { day: "Apr 25", hours: 8.0 },
  { day: "Apr 26", hours: 8.0 },
  { day: "Apr 29", hours: 8.5 },
  { day: "Apr 30", hours: 8.0 },
  { day: "May 1", hours: 8.75 },
  { day: "May 2", hours: 8.0 },
  { day: "May 3", hours: 8.0 },
];

export default function CalculatedHours() {
  const [cycle, setCycle] = useState("fortnightly");
  const [period, setPeriod] = useState("current");

  const data = cycle === "weekly" ? WEEKLY_DATA : FORTNIGHTLY_DATA;
  const totalHours = data.reduce((s, d) => s + d.totalHours, 0);
  const totalOvertime = data.reduce((s, d) => s + d.overtime, 0);

  return (
    <div className="space-y-6" data-testid="calculated-hours-page">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Calculated Hours</h1>
          <p className="text-muted-foreground text-sm">Read-only payroll cycle summary</p>
        </div>
        <div className="flex gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-48" data-testid="select-period">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Period</SelectItem>
              <SelectItem value="previous">Previous Period</SelectItem>
              <SelectItem value="2periods">2 Periods Ago</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={cycle} onValueChange={setCycle}>
        <TabsList data-testid="tabs-cycle">
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="fortnightly">Fortnightly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value={cycle} className="mt-4 space-y-6">
          {/* Period Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground font-medium">Total Hours</span>
                </div>
                <div className="text-2xl font-bold">{totalHours.toFixed(1)}h</div>
                <div className="text-xs text-muted-foreground mt-1">of {cycle === "weekly" ? 40 : cycle === "fortnightly" ? 80 : 173}h expected</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-amber-600" />
                  <span className="text-xs text-muted-foreground font-medium">Total Overtime</span>
                </div>
                <div className="text-2xl font-bold text-amber-600">{totalOvertime.toFixed(1)}h</div>
                <div className="text-xs text-muted-foreground mt-1">at 1.5x rate</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs text-muted-foreground font-medium">Period Start</span>
                </div>
                <div className="text-xl font-bold">{cycle === "weekly" ? "Apr 29" : "Apr 22"}</div>
                <div className="text-xs text-muted-foreground mt-1">2026</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="text-xs text-muted-foreground font-medium">Period End</span>
                </div>
                <div className="text-xl font-bold">May 5</div>
                <div className="text-xs text-muted-foreground mt-1">2026</div>
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Daily Hours Trend</CardTitle>
              <CardDescription>Hours logged per working day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={CHART_DATA.slice(0, cycle === "weekly" ? 5 : 10)} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} domain={[0, 12]} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Area type="monotone" dataKey="hours" name="Hours" stroke="hsl(221.2 83.2% 53.3%)" fill="hsl(221.2 83.2% 53.3% / 0.15)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Summary Table */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Daily Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Time In</TableHead>
                      <TableHead>Time Out</TableHead>
                      <TableHead className="text-right">Total Hours</TableHead>
                      <TableHead className="text-right">Overtime</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((row, i) => (
                      <TableRow key={i} className={row.totalHours === 0 ? "opacity-40" : ""} data-testid={`row-hours-${i}`}>
                        <TableCell className="font-medium text-sm">{row.date}</TableCell>
                        <TableCell className="text-muted-foreground">{row.timeIn}</TableCell>
                        <TableCell className="text-muted-foreground">{row.timeOut}</TableCell>
                        <TableCell className="text-right font-semibold">{row.totalHours > 0 ? `${row.totalHours}h` : "—"}</TableCell>
                        <TableCell className="text-right">
                          {row.overtime > 0 ? (
                            <span className="text-amber-600 font-semibold">{row.overtime}h</span>
                          ) : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/30 font-bold">
                      <TableCell colSpan={3}>Total</TableCell>
                      <TableCell className="text-right">{totalHours.toFixed(1)}h</TableCell>
                      <TableCell className="text-right text-amber-600">{totalOvertime.toFixed(1)}h</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
