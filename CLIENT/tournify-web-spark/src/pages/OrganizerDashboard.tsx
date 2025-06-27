
import { useState } from "react";
import { Plus, Trophy, Users, Calendar, Settings, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import OrganizerSidebar from "@/components/organizer/OrganizerSidebar";

const OrganizerDashboard = () => {
  const [organizations] = useState([
    {
      id: 1,
      name: "SportsCorp India",
      totalTournaments: 15,
      activeTournaments: 3,
      completedTournaments: 12,
      totalParticipants: 450,
    },
    {
      id: 2,
      name: "Elite Sports Club",
      totalTournaments: 8,
      activeTournaments: 2,
      completedTournaments: 6,
      totalParticipants: 200,
    }
  ]);

  const stats = [
    { title: "Total Organizations", value: "2", icon: Trophy, color: "text-blue-600" },
    { title: "Active Tournaments", value: "5", icon: Calendar, color: "text-green-600" },
    { title: "Total Participants", value: "650", icon: Users, color: "text-purple-600" },
    { title: "Completed Events", value: "18", icon: BarChart3, color: "text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <OrganizerSidebar />
      
      <div className="flex-1 p-6 ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your tournaments.</p>
            </div>
            <Link to="/organizer/create-tournament">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create New Tournament
              </Button>
            </Link>
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

          {/* Organizations List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>My Organizations</span>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Settings
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {organizations.map((org) => (
                  <div key={org.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{org.name}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Total Tournaments:</span>
                            <p className="font-semibold">{org.totalTournaments}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Active:</span>
                            <p className="font-semibold text-green-600">{org.activeTournaments}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Completed:</span>
                            <p className="font-semibold text-blue-600">{org.completedTournaments}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Participants:</span>
                            <p className="font-semibold text-purple-600">{org.totalParticipants}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Link to={`/organizer/tournaments/${org.id}`}>
                          <Button variant="outline" size="sm">View Tournaments</Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
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

export default OrganizerDashboard;
