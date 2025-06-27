
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Eye, Trash2, Calendar, Trophy, Users } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

const AdminDashboard = () => {
  const [tournaments] = useState([
    {
      id: 1,
      name: "Summer Badminton Championship 2024",
      organizer: "SportsCorp India",
      status: "pending",
      startDate: "2024-07-15",
      endDate: "2024-07-20",
      location: "Sports Complex, Mumbai",
      participants: 64,
      events: 8
    },
    {
      id: 2,
      name: "Football League 2024",
      organizer: "Elite Sports Club", 
      status: "approved",
      startDate: "2024-08-01",
      endDate: "2024-08-10",
      location: "Stadium, Delhi",
      participants: 32,
      events: 4
    }
  ]);

  const stats = [
    { title: "Total Tournaments", value: "25", icon: Trophy, color: "text-blue-600" },
    { title: "Pending Approvals", value: "8", icon: Calendar, color: "text-orange-600" },
    { title: "Active Events", value: "12", icon: Users, color: "text-green-600" },
    { title: "Total Participants", value: "1,240", icon: Users, color: "text-purple-600" },
  ];

  const handleApproveTournament = (tournamentId: number) => {
    console.log("Approving tournament:", tournamentId);
    // Implement approval logic
  };

  const handleRejectTournament = (tournamentId: number) => {
    console.log("Rejecting tournament:", tournamentId);
    // Implement rejection logic
  };

  const handleDeleteTournament = (tournamentId: number) => {
    console.log("Deleting tournament:", tournamentId);
    // Implement deletion logic
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <div className="flex-1 p-6 ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage tournaments, events, and platform operations</p>
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

          {/* Tournaments Management */}
          <Card>
            <CardHeader>
              <CardTitle>Tournament Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="all">All Tournaments</TabsTrigger>
                  <TabsTrigger value="pending">Pending Approval</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {tournaments.map((tournament) => (
                    <div key={tournament.id} className="border rounded-lg p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold">{tournament.name}</h3>
                            <Badge 
                              className={
                                tournament.status === 'approved' 
                                  ? 'bg-green-100 text-green-800'
                                  : tournament.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }
                            >
                              {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-2">Organizer: {tournament.organizer}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Dates:</span>
                              <p className="font-medium">{tournament.startDate} to {tournament.endDate}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Location:</span>
                              <p className="font-medium">{tournament.location}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Events:</span>
                              <p className="font-medium">{tournament.events}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Participants:</span>
                              <p className="font-medium">{tournament.participants}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          {tournament.status === 'pending' && (
                            <>
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleApproveTournament(tournament.id)}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleRejectTournament(tournament.id)}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject
                              </Button>
                            </>
                          )}
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeleteTournament(tournament.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="pending">
                  {tournaments.filter(t => t.status === 'pending').map((tournament) => (
                    <div key={tournament.id} className="border rounded-lg p-6">
                      {/* Same tournament card structure */}
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="approved">
                  {tournaments.filter(t => t.status === 'approved').map((tournament) => (
                    <div key={tournament.id} className="border rounded-lg p-6">
                      {/* Same tournament card structure */}
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
