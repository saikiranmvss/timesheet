import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, Plus, ChevronDown, ChevronRight, Briefcase, FolderOpen, Package } from "lucide-react";
import { PROJECTS } from "@/lib/data";

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
  Completed: "bg-gray-100 text-gray-600 border-gray-200",
  "On Hold": "bg-amber-100 text-amber-700 border-amber-200",
};

export default function Projects() {
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState<number | null>(1);

  const filtered = PROJECTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.number.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6" data-testid="projects-page">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects & Work Packs</h1>
          <p className="text-muted-foreground text-sm">{PROJECTS.length} projects</p>
        </div>
        <Button onClick={() => setAddOpen(true)} data-testid="button-add-project">
          <Plus className="h-4 w-4 mr-2" /> New Project
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active Projects", count: PROJECTS.filter(p => p.status === "Active").length, icon: FolderOpen, color: "text-primary" },
          { label: "In Progress", count: PROJECTS.filter(p => p.status === "In Progress").length, icon: Briefcase, color: "text-blue-600" },
          { label: "Completed", count: PROJECTS.filter(p => p.status === "Completed").length, icon: Package, color: "text-emerald-600" },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <div>
                <div className="text-xl font-bold">{s.count}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search projects..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} data-testid="input-search" />
      </div>

      {/* Project List */}
      <div className="space-y-3">
        {filtered.map(project => (
          <Card key={project.id} data-testid={`card-project-${project.id}`}>
            <Collapsible open={expandedProject === project.id} onOpenChange={() => setExpandedProject(expandedProject === project.id ? null : project.id)}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors rounded-t-lg pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {expandedProject === project.id ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Briefcase className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">{project.name}</div>
                        <div className="text-xs text-muted-foreground">{project.number} · {project.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">{project.workPacks.length} work packs</Badge>
                      <Badge variant="outline" className={`text-xs ${STATUS_STYLES[project.status] || ""}`}>{project.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 pb-4">
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-medium text-muted-foreground">Work Packs</div>
                      <Button variant="ghost" size="sm" className="h-7 text-xs" data-testid={`button-add-workpack-${project.id}`}>
                        <Plus className="h-3.5 w-3.5 mr-1" /> Add Work Pack
                      </Button>
                    </div>
                    <div className="grid gap-2">
                      {project.workPacks.map((wp, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg" data-testid={`workpack-${project.id}-${i}`}>
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{wp}</span>
                          </div>
                          <Badge variant="outline" className="text-[10px]">Active</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {/* Add Project Modal */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Create New Project</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-2"><Label>Project Name</Label><Input placeholder="Project Alpha" data-testid="input-project-name" /></div>
              <div className="space-y-1.5"><Label>Project Number</Label><Input placeholder="P006" /></div>
              <div className="space-y-1.5"><Label>Status</Label>
                <Select><SelectTrigger><SelectValue placeholder="Active" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5 col-span-2"><Label>Description</Label><Input placeholder="Brief project description" /></div>
            </div>
            <div className="space-y-2">
              <Label>Initial Work Packs</Label>
              <Input placeholder="Work Pack Name (e.g. WP-001 Frontend)" />
              <Button variant="ghost" size="sm" className="text-primary text-xs">
                <Plus className="h-3.5 w-3.5 mr-1" /> Add another
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button data-testid="button-confirm-add-project">Create Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
