
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const CreateTournament = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Create New Tournament</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="name">Tournament Name</Label>
                <Input id="name" placeholder="Enter tournament name" />
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter location" />
              </div>
              
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea 
                  id="description"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={4}
                  placeholder="Enter tournament description"
                />
              </div>
              
              <Button className="w-full bg-primary hover:bg-primary/90">
                Create Tournament
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CreateTournament;
