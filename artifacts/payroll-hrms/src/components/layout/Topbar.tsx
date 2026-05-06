import { useLocation } from "wouter";
import { Bell, Search, Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export function Topbar() {
  const [location, setLocation] = useLocation();
  const { theme, setTheme } = useTheme();

  // Generate breadcrumbs from path
  const paths = location.split("/").filter(Boolean);
  
  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-4 shrink-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="hidden md:flex">
          <Breadcrumb>
            <BreadcrumbList>
              {paths.map((path, index) => {
                const href = `/${paths.slice(0, index + 1).join('/')}`;
                const isLast = index === paths.length - 1;
                const title = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
                
                return (
                  <div key={path} className="flex items-center gap-2">
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>{title}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink onClick={() => setLocation(href)} className="cursor-pointer">{title}</BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </div>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="w-full bg-muted/50 pl-9 border-muted-foreground/20 h-9"
          />
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-muted-foreground hover:text-foreground"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-destructive text-destructive-foreground border-none">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              {[
                { title: "Timesheet Approved", time: "10m ago", read: false },
                { title: "Payroll Processed", time: "1h ago", read: false },
                { title: "New Team Member", time: "2h ago", read: false },
              ].map((n, i) => (
                <DropdownMenuItem key={i} className="flex flex-col items-start p-3 cursor-pointer">
                  <div className="flex items-center justify-between w-full">
                    <span className={`font-medium ${!n.read ? 'text-foreground' : 'text-muted-foreground'}`}>{n.title}</span>
                    {!n.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">{n.time}</span>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-primary font-medium cursor-pointer" onClick={() => setLocation("/notifications")}>
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="@sarah" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Sarah Chen</p>
                <p className="text-xs leading-none text-muted-foreground">
                  sarah.chen@company.com
                </p>
                <Badge variant="secondary" className="w-fit mt-1 text-[10px]">Engineer</Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setLocation("/employees/1")} className="cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLocation("/settings")} className="cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setLocation("/login")} className="cursor-pointer text-destructive focus:text-destructive">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}