import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Plus, Edit, Trophy, Target } from "lucide-react";
import OrganizerSidebar from "@/components/organizer/OrganizerSidebar";
import EventsManagement from "@/components/organizer/EventsManagement";
import ParticipantsManagement from "@/components/organizer/ParticipantsManagement";
import MatchesManagement from "@/components/organizer/MatchesManagement";
import ResultsLeaderboard from "@/components/organizer/ResultsLeaderboard";
import FixturesManagement from "@/components/organizer/FixturesManagement";
import ScoringInterface from "@/components/organizer/ScoringInterface";

const TournamentDetails = () => {
  const { id } = useParams();
  
  const tournament = {
    id: 1,
    name: "Summer Badminton Championship 2024",
    sport: "Badminton",
    status: "active",
    startDate: "2024-07-15",
    endDate: "2024-07-20",
    location: "Sports Complex, Mumbai",
    description: "Annual badminton championship featuring multiple categories and skill levels.",
    participants: 64,
    maxParticipants: 128,
    registrationFee: 500,
    registrationOpen: true,
    contactName: "John Organizer",
    contactEmail: "john@example.com",
    contactPhone: "+91 98765 43210"
  };

  const stats = [
    { title: "Total Events", value: "8", icon: Trophy, color: "text-blue-600" },
    { title: "Registered Players", value: "64", icon: Users, color: "text-green-600" },
    { title: "Completed Matches", value: "12", icon: Target, color: "text-purple-600" },
    { title: "Revenue", value: "₹32,000", icon: Calendar, color: "text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <OrganizerSidebar />
      
      <div className="flex-1 p-6 ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{tournament.name}</h1>
                <Badge className="bg-green-100 text-green-800">
                  {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                </Badge>
              </div>
              <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {tournament.location}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  {tournament.participants}/{tournament.maxParticipants} participants
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit Tournament
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => window.location.href = `/organizer/tournament/${tournament.id}/create-event`}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="events" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="participants">Participants</TabsTrigger>
              <TabsTrigger value="fixtures">Fixtures</TabsTrigger>
              <TabsTrigger value="matches">Matches</TabsTrigger>
              <TabsTrigger value="scoring">Live Scoring</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            <TabsContent value="events">
              <EventsManagement tournamentId={tournament.id} />
            </TabsContent>

            <TabsContent value="participants">
              <ParticipantsManagement tournamentId={tournament.id} />
            </TabsContent>

            <TabsContent value="fixtures">
              <FixturesManagement 
                eventId={1} 
                eventName="Men's Singles" 
                matchType="knockout" 
              />
            </TabsContent>

            <TabsContent value="matches">
              <MatchesManagement tournamentId={tournament.id} />
            </TabsContent>

            <TabsContent value="scoring">
              <ScoringInterface eventId={1} eventName="Men's Singles" />
            </TabsContent>

            <TabsContent value="results">
              <ResultsLeaderboard tournamentId={tournament.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetails;
