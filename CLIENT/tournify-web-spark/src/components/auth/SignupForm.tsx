
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload } from "lucide-react";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { toast } from "sonner";

const SignupForm = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dateOfBirth: "",
    aadhaarCard: null as File | null
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signup({
        ...formData,
        role: role as UserRole
      });
      toast.success("Registration successful!");
      
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
      toast.error("Registration failed. Please try again.");
    }
    
    setIsLoading(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, aadhaarCard: file }));
    }
  };

  const getRoleTitle = () => {
    return role?.charAt(0).toUpperCase() + role?.slice(1) + " Registration";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
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
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
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

              {role === 'player' && (
                <>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="aadhaarCard">Aadhaar Card</Label>
                    <div className="mt-2">
                      <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-2 pb-2">
                          <Upload className="w-6 h-6 mb-2 text-gray-400" />
                          <p className="text-sm text-gray-500">Upload Aadhaar Card</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*,.pdf"
                          onChange={handleFileUpload}
                          required
                        />
                      </label>
                      {formData.aadhaarCard && (
                        <p className="text-sm text-green-600 mt-2">
                          Selected: {formData.aadhaarCard.name}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button 
                  onClick={() => navigate(`/auth/login/${role}`)}
                  className="text-blue-600 hover:underline"
                >
                  Sign in
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupForm;
