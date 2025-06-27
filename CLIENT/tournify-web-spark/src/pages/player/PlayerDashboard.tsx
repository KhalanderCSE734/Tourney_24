
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Trophy, Clock, IndianRupee } from "lucide-react";
import PlayerSidebar from "@/components/player/PlayerSidebar";

const PlayerDashboard = () => {
  const [upcomingTournaments] = useState([
    {
      id: 1,
      name: "Summer Badminton Championship 2024",
      sport: "Badminton",
      startDate: "2024-07-15",
      endDate: "2024-07-20",
      location: "Sports Complex, Mumbai",
      registrationFee: 500,
      events: ["Men's Singles", "Women's Singles", "Mixed Doubles"],
      registrationDeadline: "2024-07-10",
      status: "open"
    },
    {
      id: 2,
      name: "Football League 2024",
      sport: "Football",
      startDate: "2024-08-01",
      endDate: "2024-08-10",
      location: "Stadium, Delhi",
      registrationFee: 1000,
      events: ["Senior Team", "U-19 Team"],
      registrationDeadline: "2024-07-25",
      status: "open"
    }
  ]);

  const [myRegistrations] = useState([
    {
      id: 1,
      tournamentName: "Winter Tennis Open",
      eventName: "Men's Singles",
      status: "confirmed",
      startDate: "2024-06-20"
    }
  ]);

  const stats = [
    { title: "Registered Events", value: "3", icon: Trophy, color: "text-blue-600" },
    { title: "Completed Matches", value: "12", icon: Calendar, color: "text-green-600" },
    { title: "Win Rate", value: "75%", icon: Trophy, color: "text-purple-600" },
    { title: "Upcoming Events", value: "2", icon: Clock, color: "text-orange-600" },
  ];

  const handleRegister = (tournamentId: number, eventName: string) => {
    console.log("Registering for tournament:", tournamentId, "event:", eventName);
    // Implement registration logic
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <PlayerSidebar />
      
      <div className="flex-1 p-6 ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Player Dashboard</h1>
            <p className="text-gray-600 mt-2">Discover tournaments and track your progress</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Upcoming Tournaments */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Upcoming Tournaments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTournaments.map((tournament) => (
                  <div key={tournament.id} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">{tournament.name}</h3>
                          <Badge className="bg-blue-100 text-blue-800">
                            {tournament.sport}
                          </Badge>
                          <Badge 
                            className={
                              tournament.status === 'open' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }
                          >
                            Registration {tournament.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                            <span>{tournament.startDate} - {tournament.endDate}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                            <span>{tournament.location}</span>
                          </div>
                          <div className="flex items-center">
                            <IndianRupee className="w-4 h-4 mr-2 text-gray-500" />
                            <span>₹{tournament.registrationFee}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-gray-500" />
                            <span>Deadline: {tournament.registrationDeadline}</span>
                          </div>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">Available Events:</p>
                          <div className="flex gap-2 flex-wrap">
                            {tournament.events.map((event, idx) => (
                              <Badge key={idx} variant="outline">{event}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 ml-4">
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleRegister(tournament.id, tournament.events[0])}
                        >
                          Register Now
                        </Button>
                        <Button variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* My Registrations */}
          <Card>
            <CardHeader>
              <CardTitle>My Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myRegistrations.map((registration) => (
                  <div key={registration.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{registration.tournamentName}</h4>
                        <p className="text-sm text-gray-600">{registration.eventName}</p>
                        <p className="text-sm text-gray-500">Start Date: {registration.startDate}</p>
                      </div>
                      <Badge 
                        className={
                          registration.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {registration.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard;
