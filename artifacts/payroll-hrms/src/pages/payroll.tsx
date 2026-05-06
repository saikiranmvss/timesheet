import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DollarSign, Download, TrendingUp, Users, CheckCircle, Clock, BarChart3 } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { PAYROLL_EMPLOYEES, PAYROLL_HISTORY, MONTHLY_PAYROLL_TREND } from "@/lib/data";

const STATUS_STYLES: Record<string, string> = {
  Paid: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Processing: "bg-blue-100 text-blue-700 border-blue-200",
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
};

export default function Payroll() {
  const [cycle, setCycle] = useState("fortnightly");
  const [payslipEmployee, setPayslipEmployee] = useState<typeof PAYROLL_EMPLOYEES[0] | null>(null);

  const totalGross = PAYROLL_EMPLOYEES.reduce((s, e) => s + e.gross, 0);
  const totalNet = PAYROLL_EMPLOYEES.reduce((s, e) => s + e.net, 0);
  const totalTax = PAYROLL_EMPLOYEES.reduce((s, e) => s + e.tax, 0);

  return (
    <div className="space-y-6" data-testid="payroll-page">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payroll</h1>
          <p className="text-muted-foreground text-sm">Current period: Apr 22 – May 5, 2026</p>
        </div>
        <div className="flex gap-2">
          <Tabs value={cycle} onValueChange={setCycle}>
            <TabsList>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="fortnightly">Fortnightly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground font-medium">Total Gross</span>
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-4.5 w-4.5 text-primary" />
              </div>
            </div>
            <div className="text-2xl font-bold">${totalGross.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">This period</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground font-medium">Total Net Pay</span>
              <div className="h-9 w-9 rounded-lg bg-emerald-100 flex items-center justify-center">
                <CheckCircle className="h-4.5 w-4.5 text-emerald-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-emerald-700">${totalNet.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">After deductions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground font-medium">Total Tax</span>
              <div className="h-9 w-9 rounded-lg bg-amber-100 flex items-center justify-center">
                <TrendingUp className="h-4.5 w-4.5 text-amber-600" />
              </div>
            </div>
            <div className="text-2xl font-bold">${totalTax.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">Withheld</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground font-medium">Employees</span>
              <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users className="h-4.5 w-4.5 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold">{PAYROLL_EMPLOYEES.length}</div>
            <div className="text-xs text-muted-foreground mt-1">In this run</div>
          </CardContent>
        </Card>
      </div>

      {/* Trend Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Payroll Trend</CardTitle>
          <CardDescription>Total payroll over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={MONTHLY_PAYROLL_TREND} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Total Payroll"]} />
              <Area type="monotone" dataKey="amount" name="Payroll" stroke="hsl(221.2 83.2% 53.3%)" fill="hsl(221.2 83.2% 53.3% / 0.15)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Employee Payroll Table */}
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Current Payroll Run</CardTitle>
            <CardDescription>Apr 22 – May 5, 2026</CardDescription>
          </div>
          <Button variant="outline" size="sm" data-testid="button-process-payroll">
            Process Payroll
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Pay Type</TableHead>
                  <TableHead className="text-right">Hours</TableHead>
                  <TableHead className="text-right">OT Pay</TableHead>
                  <TableHead className="text-right">Gross</TableHead>
                  <TableHead className="text-right">Tax</TableHead>
                  <TableHead className="text-right">Deductions</TableHead>
                  <TableHead className="text-right">Net</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PAYROLL_EMPLOYEES.map((emp) => (
                  <TableRow key={emp.id} data-testid={`row-payroll-${emp.id}`}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">{emp.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{emp.name}</div>
                          <div className="text-xs text-muted-foreground">{emp.designation}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px]">{emp.payType}</Badge></TableCell>
                    <TableCell className="text-right text-sm">{emp.hours}h{emp.overtime > 0 && <span className="text-amber-600"> +{emp.overtime}OT</span>}</TableCell>
                    <TableCell className="text-right text-sm text-amber-600">{emp.overtimePay > 0 ? `$${emp.overtimePay.toFixed(0)}` : "—"}</TableCell>
                    <TableCell className="text-right font-semibold">${emp.gross.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-muted-foreground text-sm">${emp.tax.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-muted-foreground text-sm">${emp.deductions}</TableCell>
                    <TableCell className="text-right font-bold text-emerald-700">${emp.net.toLocaleString()}</TableCell>
                    <TableCell><Badge variant="outline" className={`text-[10px] ${STATUS_STYLES[emp.status] || ""}`}>{emp.status}</Badge></TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setPayslipEmployee(emp)} data-testid={`button-payslip-${emp.id}`}>
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Payment History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead className="text-right">Hours</TableHead>
                <TableHead className="text-right">OT Hours</TableHead>
                <TableHead className="text-right">Gross</TableHead>
                <TableHead className="text-right">Net</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Paid</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PAYROLL_HISTORY.map((h) => (
                <TableRow key={h.id} data-testid={`row-history-${h.id}`}>
                  <TableCell className="font-medium text-sm">{h.period}</TableCell>
                  <TableCell className="text-right text-sm">{h.hours}h</TableCell>
                  <TableCell className="text-right text-sm text-amber-600">{h.overtime > 0 ? `${h.overtime}h` : "—"}</TableCell>
                  <TableCell className="text-right">${h.gross.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-semibold text-emerald-700">${h.net.toLocaleString()}</TableCell>
                  <TableCell><Badge variant="outline" className={`text-[10px] ${STATUS_STYLES[h.status] || ""}`}>{h.status}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{h.date}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-7 w-7" data-testid={`button-download-${h.id}`}>
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payslip Modal */}
      {payslipEmployee && (
        <Dialog open={!!payslipEmployee} onOpenChange={() => setPayslipEmployee(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Payslip — {payslipEmployee.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                <div>
                  <div className="font-semibold">{payslipEmployee.name}</div>
                  <div className="text-sm text-muted-foreground">{payslipEmployee.designation}</div>
                </div>
                <Badge variant="outline" className={STATUS_STYLES[payslipEmployee.status]}>{payslipEmployee.status}</Badge>
              </div>
              <div className="text-sm text-muted-foreground">Period: Apr 22 – May 5, 2026</div>
              <div className="space-y-2 border rounded-lg p-4">
                <div className="flex justify-between text-sm"><span>Hours Worked</span><span className="font-medium">{payslipEmployee.hours}h</span></div>
                {payslipEmployee.overtime > 0 && <div className="flex justify-between text-sm"><span>Overtime ({payslipEmployee.overtime}h)</span><span className="font-medium text-amber-600">${payslipEmployee.overtimePay.toFixed(2)}</span></div>}
                <div className="flex justify-between text-sm font-semibold border-t pt-2"><span>Gross Pay</span><span>${payslipEmployee.gross.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm text-muted-foreground"><span>Tax Withheld</span><span>-${payslipEmployee.tax.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm text-muted-foreground"><span>Other Deductions</span><span>-${payslipEmployee.deductions}</span></div>
                <div className="flex justify-between font-bold text-emerald-700 border-t pt-2"><span>Net Pay</span><span>${payslipEmployee.net.toLocaleString()}</span></div>
              </div>
              <Button className="w-full" data-testid="button-download-payslip">
                <Download className="h-4 w-4 mr-2" /> Download Payslip PDF
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
