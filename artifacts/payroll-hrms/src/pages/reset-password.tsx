import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound } from "lucide-react";

export default function ResetPassword() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/30">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
              <KeyRound className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Set new password</CardTitle>
          <CardDescription>
            Your new password must be at least 8 characters long.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); setLocation("/login"); }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input id="password" type="password" placeholder="Enter new password" required minLength={8} data-testid="input-new-password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input id="confirm" type="password" placeholder="Confirm new password" required data-testid="input-confirm-password" />
            </div>
            <Button type="submit" className="w-full" data-testid="button-reset-password">
              Reset Password
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-4 text-sm text-muted-foreground">
          Remember your password? <button className="ml-1 text-primary font-medium hover:underline" onClick={() => setLocation("/login")}>Sign in</button>
        </CardFooter>
      </Card>
    </div>
  );
}
