
import { Calendar, MapPin, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const upcomingTournaments = [
    {
      id: 1,
      name: "Uberx Badminton league",
      date: "Sun, 2nd Feb 2025 10:00 am - Sun, 2nd Feb 2025 6:00 pm",
      venue: "RG Royal Sports Club, Yeswanthpur Industrial Suburb, Yeswanthpur, Bengaluru, Karnataka, India",
      status: "Big Daddy"
    },
    {
      id: 2,
      name: "Uberx Badminton league",
      date: "Sun, 2nd Feb 2025 10:00 am - Sun, 2nd Feb 2025 6:00 pm",
      venue: "RG Royal Sports Club, Yeswanthpur Industrial Suburb, Yeswanthpur, Bengaluru, Karnataka, India",
      status: "Big Daddy"
    },
    {
      id: 3,
      name: "Uberx Badminton league",
      date: "Sun, 2nd Feb 2025 10:00 am - Sun, 2nd Feb 2025 6:00 pm",
      venue: "RG Royal Sports Club, Yeswanthpur Industrial Suburb, Yeswanthpur, Bengaluru, Karnataka, India",
      status: "Big Daddy"
    },
    {
      id: 4,
      name: "Uberx Badminton league",
      date: "Sun, 2nd Feb 2025 10:00 am - Sun, 2nd Feb 2025 6:00 pm",
      venue: "RG Royal Sports Club, Yeswanthpur Industrial Suburb, Yeswanthpur, Bengaluru, Karnataka, India",
      status: "Big Daddy"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header Section with White Background */}
      <div className="bg-white pt-20 pb-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <h2 className="text-2xl text-gray-700 mb-4">Welcome Back, Name</h2>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Name Name • <span className="text-primary">ORGANIZER</span></p>
                  <p className="text-sm text-gray-600">namename@gmail.com</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-700">
              <span>Badminton</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with White Background */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Upcoming Tournaments */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Upcoming Tournaments</h3>
              <Link to="/events">
                <Button variant="link" className="text-primary">
                  View all →
                </Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {upcomingTournaments.map((tournament) => (
                <Link key={tournament.id} to={`/tournament/${tournament.id}`}>
                  <Card className="bg-primary text-white border-0 hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                            <div className="w-8 h-8 bg-white rounded-full"></div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-2">{tournament.name}</h4>
                            <div className="flex items-center text-white/90 mb-1">
                              <Calendar className="w-4 h-4 mr-2" />
                              <span className="text-sm">{tournament.date}</span>
                            </div>
                            <div className="flex items-start text-white/90">
                              <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{tournament.venue}</span>
                            </div>
                          </div>
                        </div>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                          {tournament.status}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column - Completed Tournaments & Create New */}
          <div className="space-y-6">
            {/* Completed Tournaments */}
            <Card className="border shadow-lg">
              <CardHeader className="bg-primary text-white">
                <h3 className="font-semibold">Completed Tournaments</h3>
              </CardHeader>
              <CardContent className="p-6 bg-white">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Project Progress Update →</h4>
                    <p className="text-sm text-gray-600">The Project progress has been updated as per the...</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Request for Access</h4>
                    <p className="text-sm text-gray-600">Hello Hi, this is to inform you...</p>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
                  View All
                </Button>
              </CardContent>
            </Card>

            {/* Create New Tournament */}
            <Link to="/create-tournament">
              <Card className="bg-primary text-white border-0 shadow-lg hover:bg-primary/90 transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Create New Tournament</h3>
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">→</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
