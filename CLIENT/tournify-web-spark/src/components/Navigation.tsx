
import { Search, MapPin, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isHomePage = location.pathname === "/";
  
  const getDashboardLink = () => {
    if (!user) return "/auth/role-selection";
    
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'organizer':
        return '/organizer/dashboard';
      case 'player':
        return '/player/dashboard';
      default:
        return '/dashboard';
    }
  };
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isHomePage ? 'bg-transparent' : 'bg-white shadow-sm'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`hover:text-primary transition-colors ${isHomePage ? 'text-white' : 'text-gray-700'}`}>
              Home
            </Link>
            <Link to="/events" className={`hover:text-primary transition-colors ${isHomePage ? 'text-white' : 'text-gray-700'}`}>
              Events
            </Link>
            <Link to="/create-tournament" className={`hover:text-primary transition-colors ${isHomePage ? 'text-white' : 'text-gray-700'}`}>
              Create Tournament
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search Sports" 
                className="pl-10 bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Location and Auth */}
          <div className="flex items-center space-x-4">
            <div className={`hidden md:flex items-center space-x-2 ${isHomePage ? 'text-white' : 'text-gray-700'}`}>
              <MapPin className="w-4 h-4" />
              <span>Bengaluru</span>
            </div>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <Link to={getDashboardLink()}>
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={logout}
                  className={isHomePage ? 'text-black border-white hover:bg-white hover:text-gray-900' : ''}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/auth/role-selection">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Login 
                </Button>
              </Link>
            )}
            
            <Button variant="ghost" size="icon" className={`md:hidden ${isHomePage ? 'text-white' : 'text-gray-700'}`}>
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
