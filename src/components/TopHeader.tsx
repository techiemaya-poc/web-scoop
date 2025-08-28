import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Mail, Sun } from "lucide-react";

export function TopHeader() {
  const userName = "Admin User";
  const userRole = "Project Manager";

  return (
    <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-8 w-8" />
        <div>
          <h1 className="text-lg font-medium text-foreground">
            Hello {userName} 👋
          </h1>
          <p className="text-sm text-muted-foreground">Good Morning...!</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Sun className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Mail className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center gap-2 ml-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-avatar.jpg" alt={userName} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {userName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-foreground">{userName}</p>
            <p className="text-xs text-muted-foreground">{userRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
}