import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { AppLayout } from "@/components/layout/AppLayout";
import NotFound from "@/pages/not-found";

import Login from "@/pages/login";
import ForgotPassword from "@/pages/forgot-password";
import ResetPassword from "@/pages/reset-password";
import Dashboard from "@/pages/dashboard";
import Timesheets from "@/pages/timesheets";
import CalculatedHours from "@/pages/calculated-hours";
import Payroll from "@/pages/payroll";
import Employees from "@/pages/employees";
import EmployeeDetail from "@/pages/employee-detail";
import Projects from "@/pages/projects";
import Teams from "@/pages/teams";
import ApprovalsPage from "@/pages/approvals";
import Supervisor from "@/pages/supervisor";
import Admin from "@/pages/admin";
import Reports from "@/pages/reports";
import Notifications from "@/pages/notifications";
import Settings from "@/pages/settings";

const queryClient = new QueryClient();

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={() => <Redirect to="/login" />} />
        <Route path="/login" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/timesheets" component={Timesheets} />
        <Route path="/calculated-hours" component={CalculatedHours} />
        <Route path="/payroll" component={Payroll} />
        <Route path="/employees" component={Employees} />
        <Route path="/employees/:id" component={EmployeeDetail} />
        <Route path="/projects" component={Projects} />
        <Route path="/teams" component={Teams} />
        <Route path="/approvals" component={ApprovalsPage} />
        <Route path="/supervisor" component={Supervisor} />
        <Route path="/admin" component={Admin} />
        <Route path="/reports" component={Reports} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="payroll-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
