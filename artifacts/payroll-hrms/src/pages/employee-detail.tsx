import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Edit, Save, X, Mail, Building, CreditCard, Clock } from "lucide-react";
import { EMPLOYEES, TIMESHEETS, PAYROLL_HISTORY } from "@/lib/data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const LEAVE_BALANCES = [
  { type: "Annual Leave", total: 20, used: 7, remaining: 13 },
  { type: "Sick Leave", total: 10, used: 2, remaining: 8 },
  { type: "Personal Leave", total: 5, used: 1, remaining: 4 },
  { type: "Parental Leave", total: 0, used: 0, remaining: 0 },
];

const ATTENDANCE_CHART = [
  { month: "Nov", days: 21 }, { month: "Dec", days: 19 }, { month: "Jan", days: 22 },
  { month: "Feb", days: 19 }, { month: "Mar", days: 22 }, { month: "Apr", days: 20 },
];

export default function EmployeeDetail() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const employee = EMPLOYEES.find(e => e.id === parseInt(params.id || "1")) || EMPLOYEES[0];
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...employee });

  return (
    <div className="space-y-6" data-testid="employee-detail-page">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => setLocation("/employees")} data-testid="button-back">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">{employee.name}</h1>
          <p className="text-muted-foreground text-sm">{employee.number} · {employee.designation}</p>
        </div>
        {!editing ? (
          <Button variant="outline" onClick={() => setEditing(true)} data-testid="button-edit">
            <Edit className="h-4 w-4 mr-2" /> Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button size="sm" onClick={() => setEditing(false)} data-testid="button-save">
              <Save className="h-4 w-4 mr-2" /> Save
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setEditing(false)} data-testid="button-cancel">
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">{employee.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="text-xl font-bold">{employee.name}</div>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant="outline" className="gap-1 text-xs"><Building className="h-3 w-3" />{employee.department}</Badge>
                <Badge variant="outline" className="gap-1 text-xs"><Mail className="h-3 w-3" />{employee.email}</Badge>
                <Badge variant="outline" className={`text-xs ${employee.status === "Active" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : employee.status === "On Leave" ? "bg-amber-100 text-amber-700 border-amber-200" : ""}`}>{employee.status}</Badge>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <div className="text-xs text-muted-foreground">Employee Since</div>
              <div className="font-semibold">Jan 15, 2023</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview">
        <TabsList data-testid="tabs-employee">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payroll">Payroll Settings</TabsTrigger>
          <TabsTrigger value="leave">Leave Balances</TabsTrigger>
          <TabsTrigger value="attendance">Attendance History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: "Full Name", value: employee.name, field: "name" },
                  { label: "Employee Number", value: employee.number, field: "number" },
                  { label: "Email Address", value: employee.email, field: "email" },
                  { label: "Designation", value: employee.designation, field: "designation" },
                  { label: "Department", value: employee.department, field: "department" },
                  { label: "Address", value: "123 Main St, San Francisco, CA 94105", field: "address" },
                  { label: "Phone", value: "+1 (415) 555-0198", field: "phone" },
                  { label: "Start Date", value: "January 15, 2023", field: "startDate" },
                ].map(f => (
                  <div key={f.field} className="space-y-1">
                    <Label className="text-xs text-muted-foreground">{f.label}</Label>
                    {editing ? (
                      <Input defaultValue={f.value} className="h-8" data-testid={`input-${f.field}`} />
                    ) : (
                      <div className="text-sm font-medium">{f.value}</div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Payroll Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Pay Type</Label>
                  {editing ? (
                    <Select defaultValue={employee.payType.toLowerCase()}>
                      <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="salary">Salary</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : <div className="text-sm font-medium">{employee.payType}</div>}
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">{employee.payType === "Hourly" ? "Hourly Rate" : "Monthly Salary"}</Label>
                  {editing ? (
                    <Input defaultValue={employee.payType === "Hourly" ? employee.hourlyRate?.toString() : employee.monthlySalary?.toString()} className="h-8" />
                  ) : <div className="text-sm font-medium">{employee.payType === "Hourly" ? `$${employee.hourlyRate}/hr` : `$${employee.monthlySalary?.toLocaleString()}/mo`}</div>}
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Payment Frequency</Label>
                  {editing ? (
                    <Select defaultValue={employee.payFrequency.toLowerCase()}>
                      <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="fortnightly">Fortnightly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : <div className="text-sm font-medium">{employee.payFrequency}</div>}
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Overtime Threshold (hrs/week)</Label>
                  {editing ? (
                    <Input defaultValue={employee.overtimeThreshold.toString()} className="h-8" />
                  ) : <div className="text-sm font-medium">{employee.overtimeThreshold}h</div>}
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Currency</Label>
                  {editing ? (
                    <Select defaultValue="usd">
                      <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD</SelectItem>
                        <SelectItem value="eur">EUR</SelectItem>
                        <SelectItem value="gbp">GBP</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : <div className="text-sm font-medium">{employee.currency}</div>}
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Tax File Number</Label>
                  {editing ? (
                    <Input defaultValue="***-**-4589" className="h-8" />
                  ) : <div className="text-sm font-medium">***-**-4589</div>}
                </div>
              </div>

              <div className="mt-6 border-t pt-4">
                <div className="text-sm font-semibold mb-3">Payment History</div>
                <div className="space-y-2">
                  {PAYROLL_HISTORY.slice(0, 3).map(h => (
                    <div key={h.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg text-sm" data-testid={`payment-${h.id}`}>
                      <span className="text-muted-foreground">{h.period}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-emerald-700">${h.net.toLocaleString()}</span>
                        <Badge variant="outline" className="text-[10px] bg-emerald-100 text-emerald-700 border-emerald-200">{h.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leave" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Leave Balances</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {LEAVE_BALANCES.map(leave => (
                <div key={leave.type} data-testid={`leave-${leave.type.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium">{leave.type}</span>
                    <span className="text-sm text-muted-foreground">{leave.remaining} / {leave.total} days remaining</span>
                  </div>
                  <Progress value={leave.total > 0 ? ((leave.remaining / leave.total) * 100) : 0} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Used: {leave.used} days</span>
                    <span>Total: {leave.total} days</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Monthly Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={ATTENDANCE_CHART} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Bar dataKey="days" name="Days Present" fill="hsl(221.2 83.2% 53.3%)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Timesheets</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead className="text-right">Hours</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TIMESHEETS.map(ts => (
                    <TableRow key={ts.id} data-testid={`ts-row-${ts.id}`}>
                      <TableCell className="text-sm">{ts.date}</TableCell>
                      <TableCell className="text-sm">{ts.project}</TableCell>
                      <TableCell className="text-right font-medium">{ts.hours}h</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px]">{ts.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
