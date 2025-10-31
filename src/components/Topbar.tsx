import { Bell, Menu, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import CreateEventDialog from "./CreateEventDialog";
import { clearAuthToken } from "@/lib/api";

interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthToken();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-6">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex-1" />

      {/* Create Event Button */}
      <CreateEventDialog />

      {/* Notifications */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-secondary text-xs">
              3
            </Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className="flex flex-col gap-1">
              <p className="font-medium">New event registration</p>
              <p className="text-sm text-muted-foreground">
                5 students registered for Tech Fest 2024
              </p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex flex-col gap-1">
              <p className="font-medium">Event reminder</p>
              <p className="text-sm text-muted-foreground">
                Cultural Night starts in 2 hours
              </p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex flex-col gap-1">
              <p className="font-medium">Profile update</p>
              <p className="text-sm text-muted-foreground">
                10 students updated their profiles
              </p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Profile */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 gap-2 px-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gradient-primary text-white">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:inline-block font-medium">Admin</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="text-destructive cursor-pointer"
            onClick={() => {
              clearAuthToken();
              toast.success("Logged out successfully");
              window.location.href = "/login";
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Topbar;
