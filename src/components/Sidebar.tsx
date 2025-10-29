import { NavLink } from "react-router-dom";
import { Home, Calendar, Users, Bell, BarChart3, Settings, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const navItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Calendar, label: "Events", path: "/events" },
    { icon: Users, label: "Users", path: "/users" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: BarChart3, label: "Reports", path: "/reports" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          {isOpen && (
            <h1 className="text-2xl font-bold gradient-text">Collegium</h1>
          )}
          {!isOpen && (
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center mx-auto">
              <span className="text-white font-bold">C</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-gradient-primary text-white shadow-lg"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="font-medium">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Toggle Button */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className={cn(
              "w-full hover:bg-muted transition-all duration-200",
              !isOpen && "mx-auto"
            )}
          >
            <ChevronLeft
              className={cn(
                "w-5 h-5 transition-transform duration-300",
                !isOpen && "rotate-180"
              )}
            />
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
