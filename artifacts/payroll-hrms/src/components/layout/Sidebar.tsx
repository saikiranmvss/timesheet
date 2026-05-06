import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Clock, 
  Calculator, 
  Banknote, 
  Users, 
  Briefcase, 
  UsersRound, 
  CheckSquare, 
  FileBarChart, 
  Bell, 
  Settings,
  ChevronLeft,
  ChevronRight,
  UserCog,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Timesheets", href: "/timesheets", icon: Clock },
  { title: "Calculated Hours", href: "/calculated-hours", icon: Calculator },
  { title: "Payroll", href: "/payroll", icon: Banknote },
  { title: "Employees", href: "/employees", icon: Users },
  { title: "Projects", href: "/projects", icon: Briefcase },
  { title: "Teams", href: "/teams", icon: UsersRound },
  { title: "Approvals", href: "/approvals", icon: CheckSquare },
  { title: "Reports", href: "/reports", icon: FileBarChart },
  { title: "Notifications", href: "/notifications", icon: Bell },
  { title: "Settings", href: "/settings", icon: Settings },
];

const ADMIN_ITEMS = [
  { title: "Supervisor", href: "/supervisor", icon: UserCog },
  { title: "Admin", href: "/admin", icon: ShieldCheck },
];

export function Sidebar() {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  return (
    <div 
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 z-10 hidden md:flex",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-primary-foreground">P</span>
            </div>
            <span className="font-semibold text-sidebar-foreground truncate">PayScale</span>
          </div>
        )}
        {collapsed && (
          <div className="h-8 w-8 mx-auto rounded-lg bg-primary flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-primary-foreground">P</span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-2">
        {NAV_ITEMS.map((item) => {
          const active = location === item.href || location.startsWith(`${item.href}/`);
          return (
            <Link key={item.href} href={item.href}>
              <div 
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors group",
                  active 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                  collapsed ? "justify-center px-0" : ""
                )}
                title={collapsed ? item.title : undefined}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {!collapsed && <span className="truncate">{item.title}</span>}
              </div>
            </Link>
          );
        })}
        
        <div className="my-2 border-t border-sidebar-border mx-2" />
        
        {ADMIN_ITEMS.map((item) => {
          const active = location === item.href || location.startsWith(`${item.href}/`);
          return (
            <Link key={item.href} href={item.href}>
              <div 
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors group",
                  active 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                  collapsed ? "justify-center px-0" : ""
                )}
                title={collapsed ? item.title : undefined}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {!collapsed && <span className="truncate">{item.title}</span>}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-3 border-t border-sidebar-border flex justify-end">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 text-sidebar-foreground"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}