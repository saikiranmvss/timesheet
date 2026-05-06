import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Save, Building, CreditCard, Bell, Shield, Key } from "lucide-react";

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [approvalAlerts, setApprovalAlerts] = useState(true);
  const [payrollAlerts, setPayrollAlerts] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="space-y-6" data-testid="settings-page">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your account and system configuration</p>
      </div>

      <Tabs defaultValue="company">
        <TabsList className="flex flex-wrap h-auto gap-1" data-testid="tabs-settings">
          <TabsTrigger value="company" className="gap-2"><Building className="h-4 w-4" />Company</TabsTrigger>
          <TabsTrigger value="payroll" className="gap-2"><CreditCard className="h-4 w-4" />Payroll</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2"><Bell className="h-4 w-4" />Notifications</TabsTrigger>
          <TabsTrigger value="security" className="gap-2"><Shield className="h-4 w-4" />Security</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Company Information</CardTitle>
              <CardDescription>Update your organization's details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>Company Name</Label>
                  <Input defaultValue="Acme Technologies Inc." data-testid="input-company-name" />
                </div>
                <div className="space-y-1.5">
                  <Label>Company Registration Number</Label>
                  <Input defaultValue="ACN 123 456 789" />
                </div>
                <div className="space-y-1.5">
                  <Label>Tax Identification Number</Label>
                  <Input defaultValue="12-3456789" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>Business Address</Label>
                  <Input defaultValue="123 Market St, Suite 400, San Francisco, CA 94105" />
                </div>
                <div className="space-y-1.5">
                  <Label>Country</Label>
                  <Select defaultValue="us">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Industry</Label>
                  <Select defaultValue="tech">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="health">Healthcare</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Company Email</Label>
                  <Input type="email" defaultValue="admin@acmetech.com" />
                </div>
                <div className="space-y-1.5">
                  <Label>Phone Number</Label>
                  <Input defaultValue="+1 (415) 555-0100" />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button data-testid="button-save-company"><Save className="h-4 w-4 mr-2" /> Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Payroll Configuration</CardTitle>
              <CardDescription>Configure payroll cycles and calculation rules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label>Default Pay Frequency</Label>
                  <Select defaultValue="fortnightly">
                    <SelectTrigger data-testid="select-pay-frequency"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="fortnightly">Fortnightly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Default Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD — US Dollar</SelectItem>
                      <SelectItem value="eur">EUR — Euro</SelectItem>
                      <SelectItem value="gbp">GBP — British Pound</SelectItem>
                      <SelectItem value="aud">AUD — Australian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Standard Hours per Week</Label>
                  <Input type="number" defaultValue="40" data-testid="input-standard-hours" />
                </div>
                <div className="space-y-1.5">
                  <Label>Overtime Rate Multiplier</Label>
                  <Input type="number" step="0.25" defaultValue="1.5" />
                </div>
                <div className="space-y-1.5">
                  <Label>Payroll Processing Day</Label>
                  <Select defaultValue="friday">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monday">Monday</SelectItem>
                      <SelectItem value="wednesday">Wednesday</SelectItem>
                      <SelectItem value="friday">Friday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Tax Calculation Method</Label>
                  <Select defaultValue="automatic">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automatic">Automatic (ATO/IRS Tables)</SelectItem>
                      <SelectItem value="manual">Manual Rate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="text-sm font-semibold">Leave Accrual</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm">Annual Leave (days/year)</Label>
                    <Input type="number" defaultValue="20" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">Sick Leave (days/year)</Label>
                    <Input type="number" defaultValue="10" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button data-testid="button-save-payroll"><Save className="h-4 w-4 mr-2" /> Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notification Preferences</CardTitle>
              <CardDescription>Control when and how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {[
                { label: "Email Notifications", description: "Receive notifications via email", state: emailNotifications, setState: setEmailNotifications, id: "email" },
                { label: "Timesheet Approval Alerts", description: "Get notified when timesheets are submitted for approval", state: approvalAlerts, setState: setApprovalAlerts, id: "approval" },
                { label: "Payroll Processing Alerts", description: "Notifications when payroll is processed or paid", state: payrollAlerts, setState: setPayrollAlerts, id: "payroll-alerts" },
              ].map(setting => (
                <div key={setting.id} className="flex items-center justify-between p-4 rounded-lg border" data-testid={`setting-${setting.id}`}>
                  <div>
                    <div className="font-medium text-sm">{setting.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{setting.description}</div>
                  </div>
                  <Switch
                    checked={setting.state}
                    onCheckedChange={setting.setState}
                    data-testid={`switch-${setting.id}`}
                  />
                </div>
              ))}
              <div className="space-y-1.5">
                <Label>Notification Email</Label>
                <Input type="email" defaultValue="sarah.chen@company.com" data-testid="input-notification-email" />
              </div>
              <div className="flex justify-end">
                <Button data-testid="button-save-notifications"><Save className="h-4 w-4 mr-2" /> Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Current Password</Label>
                <Input type="password" placeholder="Enter current password" data-testid="input-current-password" />
              </div>
              <div className="space-y-1.5">
                <Label>New Password</Label>
                <Input type="password" placeholder="Enter new password" data-testid="input-new-password" />
              </div>
              <div className="space-y-1.5">
                <Label>Confirm New Password</Label>
                <Input type="password" placeholder="Confirm new password" data-testid="input-confirm-password" />
              </div>
              <Button data-testid="button-change-password">
                <Key className="h-4 w-4 mr-2" /> Change Password
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <div className="font-medium text-sm">Enable 2FA</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Require a code from your authenticator app on sign in</div>
                </div>
                <Switch checked={twoFactor} onCheckedChange={setTwoFactor} data-testid="switch-2fa" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-destructive">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/30 bg-destructive/5">
                <div>
                  <div className="font-medium text-sm">Deactivate Account</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Permanently deactivate your account and all data</div>
                </div>
                <Button variant="destructive" size="sm" data-testid="button-deactivate">Deactivate</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
