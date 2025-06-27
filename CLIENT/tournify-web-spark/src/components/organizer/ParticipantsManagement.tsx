
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Check, X, User, Mail, Phone, Calendar } from "lucide-react";

interface ParticipantsManagementProps {
  tournamentId: number;
}

const ParticipantsManagement = ({ tournamentId }: ParticipantsManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const participants = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@email.com",
      phone: "+91 98765 43210",
      age: 25,
      events: ["Men's Singles", "Men's Doubles"],
      status: "confirmed",
      registrationDate: "2024-06-15",
      seed: 1
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.patel@email.com",
      phone: "+91 87654 32109",
      age: 23,
      events: ["Women's Singles"],
      status: "pending",
      registrationDate: "2024-06-16",
      seed: null
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit.kumar@email.com",
      phone: "+91 76543 21098",
      age: 28,
      events: ["Mixed Doubles"],
      status: "confirmed",
      registrationDate: "2024-06-14",
      seed: 2
    },
    {
      id: 4,
      name: "Sneha Reddy",
      email: "sneha.reddy@email.com",
      phone: "+91 65432 10987",
      age: 22,
      events: ["Women's Singles", "Mixed Doubles"],
      status: "rejected",
      registrationDate: "2024-06-17",
      seed: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || participant.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = (participantId: number, newStatus: string) => {
    console.log(`Changing participant ${participantId} status to ${newStatus}`);
  };

  const handleSeedAssign = (participantId: number, seed: number) => {
    console.log(`Assigning seed ${seed} to participant ${participantId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Participants Management</h2>
          <p className="text-gray-600">Manage tournament registrations and participants</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export List</Button>
          <Button>Send Notifications</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{participants.length}</p>
              <p className="text-sm text-gray-600">Total Registered</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {participants.filter(p => p.status === 'confirmed').length}
              </p>
              <p className="text-sm text-gray-600">Confirmed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {participants.filter(p => p.status === 'pending').length}
              </p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {participants.filter(p => p.status === 'rejected').length}
              </p>
              <p className="text-sm text-gray-600">Rejected</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search participants..."
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
                variant={filterStatus === 'confirmed' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('confirmed')}
                size="sm"
              >
                Confirmed
              </Button>
              <Button
                variant={filterStatus === 'pending' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('pending')}
                size="sm"
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === 'rejected' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('rejected')}
                size="sm"
              >
                Rejected
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Participants Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Participant</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Seed</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredParticipants.map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">{participant.name}</p>
                        <p className="text-sm text-gray-500">Age: {participant.age}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="w-3 h-3 mr-2 text-gray-400" />
                        {participant.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="w-3 h-3 mr-2 text-gray-400" />
                        {participant.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {participant.events.map((event, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {event}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(participant.status)}>
                      {participant.status.charAt(0).toUpperCase() + participant.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {participant.seed ? (
                      <Badge variant="outline">Seed #{participant.seed}</Badge>
                    ) : (
                      <span className="text-gray-400 text-sm">Not assigned</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-3 h-3 mr-2 text-gray-400" />
                      {new Date(participant.registrationDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {participant.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 hover:text-green-700"
                            onClick={() => handleStatusChange(participant.id, 'confirmed')}
                          >
                            <Check className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleStatusChange(participant.id, 'rejected')}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParticipantsManagement;
