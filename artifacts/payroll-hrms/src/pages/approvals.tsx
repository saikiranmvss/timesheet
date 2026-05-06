import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Unlock, Clock, CheckSquare, Filter } from "lucide-react";
import { APPROVALS } from "@/lib/data";

const STATUS_STYLES: Record<string, string> = {
  Approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Rejected: "bg-red-100 text-red-700 border-red-200",
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
};

export default function ApprovalsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<number[]>([]);
  const [approvals, setApprovals] = useState(APPROVALS);
  const [rejectModal, setRejectModal] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const filtered = approvals.filter(a => statusFilter === "all" || a.status === statusFilter);
  const pending = approvals.filter(a => a.status === "Pending");

  const toggleSelect = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleApprove = (id: number) => {
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: "Approved" } : a));
    setSelected(prev => prev.filter(x => x !== id));
  };

  const handleReject = (id: number) => {
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: "Rejected" } : a));
    setRejectModal(null);
    setRejectReason("");
  };

  const handleBulkApprove = () => {
    setApprovals(prev => prev.map(a => selected.includes(a.id) ? { ...a, status: "Approved" } : a));
    setSelected([]);
  };

  return (
    <div className="space-y-6" data-testid="approvals-page">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Approvals</h1>
          <p className="text-muted-foreground text-sm">{pending.length} pending approval</p>
        </div>
        {selected.length > 0 && (
          <div className="flex gap-2 items-center">
            <span className="text-sm text-muted-foreground">{selected.length} selected</span>
            <Button size="sm" onClick={handleBulkApprove} data-testid="button-bulk-approve">
              <CheckCircle className="h-4 w-4 mr-2" /> Approve All
            </Button>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Pending", count: approvals.filter(a => a.status === "Pending").length, color: "text-amber-600", bg: "bg-amber-100", icon: Clock },
          { label: "Approved", count: approvals.filter(a => a.status === "Approved").length, color: "text-emerald-600", bg: "bg-emerald-100", icon: CheckCircle },
          { label: "Rejected", count: approvals.filter(a => a.status === "Rejected").length, color: "text-red-600", bg: "bg-red-100", icon: XCircle },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`h-9 w-9 rounded-lg ${s.bg} flex items-center justify-center`}>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <div>
                <div className={`text-2xl font-bold ${s.color}`}>{s.count}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40" data-testid="select-status-filter"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
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
                  <TableHead className="w-10">
                    <Checkbox
                      checked={selected.length === filtered.filter(a => a.status === "Pending").length && filtered.filter(a => a.status === "Pending").length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) setSelected(filtered.filter(a => a.status === "Pending").map(a => a.id));
                        else setSelected([]);
                      }}
                    />
                  </TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead className="text-right">Hours</TableHead>
                  <TableHead className="text-right">Overtime</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-36">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(approval => (
                  <TableRow key={approval.id} data-testid={`row-approval-${approval.id}`}>
                    <TableCell>
                      {approval.status === "Pending" && (
                        <Checkbox
                          checked={selected.includes(approval.id)}
                          onCheckedChange={() => toggleSelect(approval.id)}
                          data-testid={`checkbox-${approval.id}`}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">{approval.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">{approval.employee}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{approval.period}</TableCell>
                    <TableCell className="text-right font-semibold">{approval.hours}h</TableCell>
                    <TableCell className="text-right">
                      {approval.overtime > 0 ? <span className="text-amber-600 font-medium">{approval.overtime}h</span> : <span className="text-muted-foreground">—</span>}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{approval.submittedAt}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] ${STATUS_STYLES[approval.status] || ""}`}>{approval.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {approval.status === "Pending" ? (
                        <div className="flex gap-1">
                          <Button size="icon" className="h-7 w-7 bg-emerald-600 hover:bg-emerald-700" onClick={() => handleApprove(approval.id)} data-testid={`button-approve-${approval.id}`}>
                            <CheckCircle className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="icon" variant="outline" className="h-7 w-7 text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => setRejectModal(approval.id)} data-testid={`button-reject-${approval.id}`}>
                            <XCircle className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="icon" variant="outline" className="h-7 w-7" data-testid={`button-unlock-${approval.id}`}>
                            <Unlock className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ) : approval.status === "Approved" ? (
                        <Button size="sm" variant="ghost" className="h-7 text-xs text-muted-foreground" data-testid={`button-unlock-approved-${approval.id}`}>
                          <Unlock className="h-3 w-3 mr-1" /> Unlock
                        </Button>
                      ) : (
                        <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => handleApprove(approval.id)} data-testid={`button-reconsider-${approval.id}`}>
                          Reconsider
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Reject Modal */}
      <Dialog open={!!rejectModal} onOpenChange={() => setRejectModal(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Reject Timesheet</DialogTitle></DialogHeader>
          <div className="space-y-3 py-2">
            <p className="text-sm text-muted-foreground">Please provide a reason for rejection. The employee will be notified.</p>
            <div className="space-y-1.5">
              <Label>Reason</Label>
              <Textarea value={rejectReason} onChange={e => setRejectReason(e.target.value)} placeholder="e.g. Incorrect project code, missing description..." className="h-24" data-testid="input-reject-reason" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectModal(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => rejectModal && handleReject(rejectModal)} data-testid="button-confirm-reject">
              Reject Timesheet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
