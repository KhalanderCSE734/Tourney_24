
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Clock, Trophy, Users, Plus, Edit, Play, Square } from "lucide-react";

interface MatchesManagementProps {
  tournamentId: number;
}

const MatchesManagement = ({ tournamentId }: MatchesManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isScoreDialogOpen, setIsScoreDialogOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);

  const matches = [
    {
      id: 1,
      event: "Men's Singles",
      round: "Quarterfinal",
      player1: "Rahul Sharma",
      player2: "Amit Kumar", 
      status: "completed",
      score: "21-18, 21-15",
      winner: "Rahul Sharma",
      scheduledTime: "2024-07-15T10:00:00",
      court: "Court 1"
    },
    {
      id: 2,
      event: "Women's Singles",
      round: "Semifinal",
      player1: "Priya Patel",
      player2: "Sneha Reddy",
      status: "live",
      score: "21-19, 15-18, 8-5",
      winner: null,
      scheduledTime: "2024-07-15T14:00:00",
      court: "Court 2"
    },
    {
      id: 3,
      event: "Mixed Doubles",
      round: "Final",
      player1: "Rahul & Priya",
      player2: "Amit & Sneha",
      status: "upcoming",
      score: null,
      winner: null,
      scheduledTime: "2024-07-16T16:00:00",
      court: "Center Court"
    },
    {
      id: 4,
      event: "Men's Doubles",
      round: "Round 1",
      player1: "Team Alpha",
      player2: "Team Beta",
      status: "postponed",
      score: null,
      winner: null,
      scheduledTime: "2024-07-15T12:00:00",
      court: "Court 3"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'live': return 'bg-red-100 text-red-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'postponed': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.player1.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.player2.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || match.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleUpdateScore = (match: any) => {
    setSelectedMatch(match);
    setIsScoreDialogOpen(true);
  };

  const generateFixtures = () => {
    console.log("Generating fixtures for tournament", tournamentId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Matches Management</h2>
          <p className="text-gray-600">Manage tournament fixtures and results</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={generateFixtures}>
            <Trophy className="w-4 h-4 mr-2" />
            Generate Fixtures
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Schedule Match
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{matches.length}</p>
              <p className="text-sm text-gray-600">Total Matches</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {matches.filter(m => m.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {matches.filter(m => m.status === 'live').length}
              </p>
              <p className="text-sm text-gray-600">Live</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {matches.filter(m => m.status === 'upcoming').length}
              </p>
              <p className="text-sm text-gray-600">Upcoming</p>
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
                placeholder="Search matches..."
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
                variant={filterStatus === 'upcoming' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('upcoming')}
                size="sm"
              >
                Upcoming
              </Button>
              <Button
                variant={filterStatus === 'live' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('live')}
                size="sm"
              >
                Live
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

      {/* Matches Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event & Round</TableHead>
                <TableHead>Players/Teams</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMatches.map((match) => (
                <TableRow key={match.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{match.event}</p>
                      <p className="text-sm text-gray-500">{match.round}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm">{match.player1}</p>
                      <p className="text-xs text-gray-500">vs</p>
                      <p className="text-sm">{match.player2}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Clock className="w-3 h-3 mr-2 text-gray-400" />
                        {new Date(match.scheduledTime).toLocaleDateString()}
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(match.scheduledTime).toLocaleTimeString()} • {match.court}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(match.status)}>
                      {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {match.score ? (
                      <div className="text-sm">
                        <p>{match.score}</p>
                        {match.winner && (
                          <p className="text-xs text-green-600 font-medium">
                            Winner: {match.winner}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">Not started</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {match.status === 'upcoming' && (
                        <Button size="sm" variant="outline">
                          <Play className="w-3 h-3 mr-1" />
                          Start
                        </Button>
                      )}
                      {(match.status === 'live' || match.status === 'completed') && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUpdateScore(match)}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Score
                        </Button>
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

      {/* Score Update Dialog */}
      <Dialog open={isScoreDialogOpen} onOpenChange={setIsScoreDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Match Score</DialogTitle>
          </DialogHeader>
          {selectedMatch && (
            <div className="space-y-4">
              <div>
                <p className="font-medium">{selectedMatch.event} - {selectedMatch.round}</p>
                <p className="text-sm text-gray-600">{selectedMatch.player1} vs {selectedMatch.player2}</p>
              </div>
              <div className="space-y-2">
                <Label>Current Score</Label>
                <Input 
                  placeholder="e.g., 21-18, 21-15" 
                  defaultValue={selectedMatch.score || ""} 
                />
              </div>
              <div className="space-y-2">
                <Label>Winner</Label>
                <select className="w-full p-2 border rounded">
                  <option value="">Select winner</option>
                  <option value={selectedMatch.player1}>{selectedMatch.player1}</option>
                  <option value={selectedMatch.player2}>{selectedMatch.player2}</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsScoreDialogOpen(false)}>
                  Cancel
                </Button>
                <Button>Update Score</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MatchesManagement;
