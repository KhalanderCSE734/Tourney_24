
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { toast } from "sonner";

const LoginForm = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(formData.email, formData.password, role as UserRole);
      toast.success("Login successful!");
      
      // Redirect based on role
      switch (role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'organizer':
          navigate('/organizer/dashboard');
          break;
        case 'player':
          navigate('/player/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
    
    setIsLoading(false);
  };

  const getRoleTitle = () => {
    return role?.charAt(0).toUpperCase() + role?.slice(1) + " Login";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/auth/role-selection")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to role selection
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">{getRoleTitle()}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button 
                  onClick={() => navigate(`/auth/signup/${role}`)}
                  className="text-blue-600 hover:underline"
                >
                  Sign up
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
