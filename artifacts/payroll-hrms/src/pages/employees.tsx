import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Plus, Filter, Eye, Edit } from "lucide-react";
import { EMPLOYEES } from "@/lib/data";

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  "On Leave": "bg-amber-100 text-amber-700 border-amber-200",
  Inactive: "bg-gray-100 text-gray-600 border-gray-200",
};

export default function Employees() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [addOpen, setAddOpen] = useState(false);

  const filtered = EMPLOYEES.filter(emp => {
    const matchSearch = emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      emp.number.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || emp.status === statusFilter;
    const matchDept = deptFilter === "all" || emp.department === deptFilter;
    return matchSearch && matchStatus && matchDept;
  });

  const departments = [...new Set(EMPLOYEES.map(e => e.department))];

  return (
    <div className="space-y-6" data-testid="employees-page">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Employees</h1>
          <p className="text-muted-foreground text-sm">{EMPLOYEES.length} total employees</p>
        </div>
        <Button onClick={() => setAddOpen(true)} data-testid="button-add-employee">
          <Plus className="h-4 w-4 mr-2" /> Add Employee
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active", count: EMPLOYEES.filter(e => e.status === "Active").length, color: "text-emerald-600" },
          { label: "On Leave", count: EMPLOYEES.filter(e => e.status === "On Leave").length, color: "text-amber-600" },
          { label: "Inactive", count: EMPLOYEES.filter(e => e.status === "Inactive").length, color: "text-gray-500" },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className={`text-2xl font-bold ${s.color}`}>{s.count}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search employees..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} data-testid="input-search" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40" data-testid="select-status-filter"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="On Leave">On Leave</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select value={deptFilter} onValueChange={setDeptFilter}>
          <SelectTrigger className="w-48" data-testid="select-dept-filter"><SelectValue placeholder="Department" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Number</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Pay Type</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((emp) => (
                  <TableRow key={emp.id} className="cursor-pointer hover:bg-muted/30" onClick={() => setLocation(`/employees/${emp.id}`)} data-testid={`row-employee-${emp.id}`}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">{emp.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{emp.name}</div>
                          <div className="text-xs text-muted-foreground">{emp.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{emp.number}</TableCell>
                    <TableCell className="text-sm">{emp.department}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px]">{emp.payType}</Badge></TableCell>
                    <TableCell className="text-sm font-medium">
                      {emp.payType === "Hourly" ? `$${emp.hourlyRate}/hr` : `$${emp.monthlySalary?.toLocaleString()}/mo`}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{emp.payFrequency}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] ${STATUS_STYLES[emp.status] || ""}`}>{emp.status}</Badge>
                    </TableCell>
                    <TableCell onClick={e => e.stopPropagation()}>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setLocation(`/employees/${emp.id}`)} data-testid={`button-view-${emp.id}`}>
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" data-testid={`button-edit-${emp.id}`}>
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">No employees found matching your filters.</div>
          )}
        </CardContent>
      </Card>

      {/* Add Employee Modal */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>Add New Employee</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="space-y-1.5"><Label>First Name</Label><Input placeholder="John" data-testid="input-first-name" /></div>
            <div className="space-y-1.5"><Label>Last Name</Label><Input placeholder="Smith" /></div>
            <div className="space-y-1.5 col-span-2"><Label>Email</Label><Input type="email" placeholder="john.smith@company.com" data-testid="input-email" /></div>
            <div className="space-y-1.5"><Label>Designation</Label><Input placeholder="Software Engineer" /></div>
            <div className="space-y-1.5"><Label>Department</Label>
              <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5"><Label>Pay Type</Label>
              <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="salary">Salary</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5"><Label>Rate</Label><Input placeholder="45.00" type="number" /></div>
            <div className="space-y-1.5"><Label>Pay Frequency</Label>
              <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="fortnightly">Fortnightly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5"><Label>Currency</Label>
              <Select><SelectTrigger><SelectValue placeholder="USD" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="eur">EUR</SelectItem>
                  <SelectItem value="gbp">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button data-testid="button-confirm-add-employee">Add Employee</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
