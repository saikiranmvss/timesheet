import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Plus, Trash2, Lock, Unlock, Send, Clock, TrendingUp, Play, Square, Edit2, Check, X } from "lucide-react";
import { TIMESHEETS, PROJECTS } from "@/lib/data";

const STATUS_STYLES: Record<string, string> = {
  Approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Submitted: "bg-blue-100 text-blue-700 border-blue-200",
  Rejected: "bg-red-100 text-red-700 border-red-200",
  Draft: "bg-gray-100 text-gray-600 border-gray-200",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function offsetDate(dateStr: string, days: number) {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export default function Timesheets() {
  const [currentDate, setCurrentDate] = useState("2026-05-06");
  const [modalOpen, setModalOpen] = useState(false);
  const [locked, setLocked] = useState(false);
  const [entries, setEntries] = useState(TIMESHEETS.filter(t => t.date === "2026-05-06"));
  const [form, setForm] = useState({ project: "", workPack: "", location: "Office", shiftType: "Regular", description: "", hours: "" });

  const dayEntries = entries.filter(e => e.date === currentDate);
  const totalHours = dayEntries.reduce((s, e) => s + e.hours, 0);
  const overtimeHours = dayEntries.filter(e => e.shiftType === "Overtime").reduce((s, e) => s + e.hours, 0);

  const handleAdd = () => {
    if (!form.project || !form.hours) return;
    const newEntry = {
      id: Date.now(),
      date: currentDate,
      project: form.project,
      workPack: form.workPack || "—",
      location: form.location,
      shiftType: form.shiftType,
      description: form.description,
      hours: parseFloat(form.hours),
      status: "Draft" as const,
    };
    setEntries(prev => [...prev, newEntry]);
    setForm({ project: "", workPack: "", location: "Office", shiftType: "Regular", description: "", hours: "" });
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const currentDayEntries = entries.filter(e => e.date === currentDate);
  const totalHoursForDay = currentDayEntries.reduce((s, e) => s + e.hours, 0);

  const allSubmitted = currentDayEntries.length > 0 && currentDayEntries.every(e => e.status === "Submitted" || e.status === "Approved");

  return (
    <div className="space-y-6" data-testid="timesheets-page">
      {/* Date Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => setCurrentDate(offsetDate(currentDate, -1))} data-testid="button-prev-day">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-center">
            <div className="font-semibold">{formatDate(currentDate)}</div>
            <div className="text-xs text-muted-foreground">Click arrows to navigate days</div>
          </div>
          <Button variant="outline" size="icon" onClick={() => setCurrentDate(offsetDate(currentDate, 1))} data-testid="button-next-day">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-primary text-xs" onClick={() => setCurrentDate("2026-05-06")} data-testid="button-today">
            Today
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setLocked(!locked)} data-testid="button-toggle-lock">
            {locked ? <Unlock className="h-4 w-4 mr-2" /> : <Lock className="h-4 w-4 mr-2" />}
            {locked ? "Unlock" : "Lock"}
          </Button>
          <Button onClick={() => setModalOpen(true)} disabled={locked} data-testid="button-add-timesheet">
            <Plus className="h-4 w-4 mr-2" /> Add Entry
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Start Time", value: currentDayEntries.length > 0 ? "08:30" : "—", icon: Play },
          { label: "End Time", value: currentDayEntries.length > 0 ? "17:00" : "—", icon: Square },
          { label: "Total Hours", value: `${totalHoursForDay}h`, icon: Clock },
          { label: "Overtime Hours", value: `${currentDayEntries.filter(e => e.shiftType === "Overtime").reduce((s, e) => s + e.hours, 0)}h`, icon: TrendingUp },
        ].map((m) => (
          <Card key={m.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <m.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{m.label}</div>
                <div className="font-bold text-lg leading-tight">{m.value}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">Timesheet Entries</CardTitle>
          {locked && (
            <Badge variant="outline" className="text-xs gap-1">
              <Lock className="h-3 w-3" /> Locked
            </Badge>
          )}
        </CardHeader>
        <CardContent className="p-0">
          {currentDayEntries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Clock className="h-12 w-12 text-muted-foreground/40 mb-3" />
              <p className="font-medium text-muted-foreground">No timesheet entries yet</p>
              <p className="text-sm text-muted-foreground/70 mt-1">Click "Add Entry" to log your hours</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => setModalOpen(true)} data-testid="button-empty-add">
                <Plus className="h-4 w-4 mr-2" /> Add Entry
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Work Pack</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Shift Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Hours</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentDayEntries.map((entry) => (
                    <TableRow key={entry.id} data-testid={`row-entry-${entry.id}`}>
                      <TableCell className="font-medium">{entry.project}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{entry.workPack}</TableCell>
                      <TableCell className="text-sm">{entry.location}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-[10px] ${entry.shiftType === "Overtime" ? "bg-amber-50 text-amber-700 border-amber-200" : ""}`}>
                          {entry.shiftType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">{entry.description}</TableCell>
                      <TableCell className="text-right font-semibold">{entry.hours}h</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-[10px] ${STATUS_STYLES[entry.status] || ""}`}>
                          {entry.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {!locked && entry.status === "Draft" && (
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => handleDelete(entry.id)} data-testid={`button-delete-${entry.id}`}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        {currentDayEntries.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <div className="flex gap-4 text-sm">
              <span className="text-muted-foreground">Total: <span className="font-semibold text-foreground">{totalHoursForDay}h</span></span>
              <span className="text-muted-foreground">Overtime: <span className="font-semibold text-amber-600">{currentDayEntries.filter(e => e.shiftType === "Overtime").reduce((s, e) => s + e.hours, 0)}h</span></span>
            </div>
            {!allSubmitted && (
              <Button size="sm" data-testid="button-submit-timesheet">
                <Send className="h-4 w-4 mr-2" /> Submit Timesheet
              </Button>
            )}
            {allSubmitted && <Badge className="bg-blue-100 text-blue-700 border-blue-200">Submitted for Approval</Badge>}
          </div>
        )}
      </Card>

      {/* Add Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Timesheet Entry</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Project</Label>
                <Select value={form.project} onValueChange={v => setForm(f => ({ ...f, project: v }))}>
                  <SelectTrigger data-testid="select-project"><SelectValue placeholder="Select project" /></SelectTrigger>
                  <SelectContent>
                    {PROJECTS.map(p => <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Work Pack</Label>
                <Select value={form.workPack} onValueChange={v => setForm(f => ({ ...f, workPack: v }))}>
                  <SelectTrigger data-testid="select-workpack"><SelectValue placeholder="Select work pack" /></SelectTrigger>
                  <SelectContent>
                    {form.project && PROJECTS.find(p => p.name === form.project)?.workPacks.map(wp => (
                      <SelectItem key={wp} value={wp}>{wp}</SelectItem>
                    ))}
                    {!form.project && <SelectItem value="none" disabled>Select project first</SelectItem>}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Location</Label>
                <Select value={form.location} onValueChange={v => setForm(f => ({ ...f, location: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Office">Office</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="Client Site">Client Site</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Shift Type</Label>
                <Select value={form.shiftType} onValueChange={v => setForm(f => ({ ...f, shiftType: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Regular">Regular</SelectItem>
                    <SelectItem value="Overtime">Overtime</SelectItem>
                    <SelectItem value="Holiday">Holiday</SelectItem>
                    <SelectItem value="On-Call">On-Call</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe the work done..." className="h-20" data-testid="input-description" />
            </div>
            <div className="space-y-1.5">
              <Label>Hours Spent</Label>
              <Input type="number" step="0.5" min="0.5" max="24" value={form.hours} onChange={e => setForm(f => ({ ...f, hours: e.target.value }))} placeholder="e.g. 7.5" data-testid="input-hours" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd} disabled={!form.project || !form.hours} data-testid="button-confirm-add">Add Entry</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
