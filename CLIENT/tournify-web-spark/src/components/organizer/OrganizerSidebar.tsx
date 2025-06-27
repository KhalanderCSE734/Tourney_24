
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Trophy, 
  Plus, 
  Calendar, 
  Users, 
  Settings,
  BarChart3,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const OrganizerSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/organizer/dashboard', icon: LayoutDashboard },
    { name: 'My Tournaments', href: '/organizer/tournaments', icon: Trophy },
    { name: 'Create Tournament', href: '/organizer/create-tournament', icon: Plus },
    { name: 'Settings', href: '/organizer/settings', icon: Settings },
  ];

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="font-semibold text-gray-900">Organizer Panel</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="p-2"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link key={item.name} to={item.href}>
              <div className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                isActive 
                  ? "bg-blue-50 text-blue-700 border border-blue-200" 
                  : "text-gray-600 hover:bg-gray-50"
              )}>
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium">{item.name}</span>}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className={cn(
          "flex items-center space-x-3 p-3 bg-gray-50 rounded-lg",
          collapsed && "justify-center"
        )}>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <Users className="w-4 h-4 text-gray-600" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">John Organizer</p>
              <p className="text-xs text-gray-500 truncate">john@example.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizerSidebar;
