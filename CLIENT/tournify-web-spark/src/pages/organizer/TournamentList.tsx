
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, Eye, Edit, Trash2, Calendar, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import OrganizerSidebar from "@/components/organizer/OrganizerSidebar";

const TournamentList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const tournaments = [
    {
      id: 1,
      name: "Summer Badminton Championship 2024",
      sport: "Badminton",
      status: "active",
      startDate: "2024-07-15",
      endDate: "2024-07-20",
      location: "Sports Complex, Mumbai",
      participants: 64,
      maxParticipants: 128,
      registrationFee: 500,
      events: 8
    },
    {
      id: 2,
      name: "Inter-College Football Tournament",
      sport: "Football",
      status: "upcoming",
      startDate: "2024-08-10",
      endDate: "2024-08-15",
      location: "University Ground, Delhi",
      participants: 32,
      maxParticipants: 64,
      registrationFee: 1000,
      events: 4
    },
    {
      id: 3,
      name: "City Tennis Open",
      sport: "Tennis",
      status: "completed",
      startDate: "2024-06-01",
      endDate: "2024-06-05",
      location: "Tennis Club, Bangalore",
      participants: 48,
      maxParticipants: 48,
      registrationFee: 750,
      events: 6
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tournament.sport.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || tournament.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <OrganizerSidebar />
      
      <div className="flex-1 p-6 ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Tournaments</h1>
              <p className="text-gray-600 mt-2">Manage all your tournaments and events</p>
            </div>
            <Link to="/organizer/create-tournament">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create New Tournament
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search tournaments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filterStatus === 'all' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('all')}
                    size="sm"
                  >
                    All
                  </Button>
                  <Button
                    variant={filterStatus === 'active' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('active')}
                    size="sm"
                  >
                    Active
                  </Button>
                  <Button
                    variant={filterStatus === 'upcoming' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('upcoming')}
                    size="sm"
                  >
                    Upcoming
                  </Button>
                  <Button
                    variant={filterStatus === 'completed' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('completed')}
                    size="sm"
                  >
                    Completed
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tournaments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTournaments.map((tournament) => (
              <Card key={tournament.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{tournament.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{tournament.sport}</Badge>
                        <Badge className={getStatusColor(tournament.status)}>
                          {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {tournament.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {tournament.participants}/{tournament.maxParticipants} participants
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                    <div>
                      <p className="text-xs text-gray-500">Registration Fee</p>
                      <p className="font-semibold">₹{tournament.registrationFee}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Events</p>
                      <p className="font-semibold">{tournament.events} events</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Link to={`/organizer/tournament/${tournament.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </Link>
                    <Link to={`/organizer/tournament/${tournament.id}/edit`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTournaments.length === 0 && (
            <Card className="p-8 text-center">
              <p className="text-gray-500 mb-4">No tournaments found matching your criteria.</p>
              <Link to="/organizer/create-tournament">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Tournament
                </Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentList;
