
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Trophy, Medal, Award, Target } from "lucide-react";

interface ResultsLeaderboardProps {
  tournamentId: number;
}

const ResultsLeaderboard = ({ tournamentId }: ResultsLeaderboardProps) => {
  const eventResults = [
    {
      eventName: "Men's Singles",
      status: "completed",
      winner: "Rahul Sharma",
      runnerUp: "Amit Kumar",
      totalParticipants: 32,
      matches: 31
    },
    {
      eventName: "Women's Singles", 
      status: "completed",
      winner: "Priya Patel",
      runnerUp: "Sneha Reddy",
      totalParticipants: 16,
      matches: 15
    },
    {
      eventName: "Mixed Doubles",
      status: "ongoing",
      winner: null,
      runnerUp: null,
      totalParticipants: 24,
      matches: 18
    }
  ];

  const leaderboard = [
    {
      rank: 1,
      name: "Rahul Sharma",
      events: 2,
      wins: 8,
      losses: 1,
      points: 85,
      winRate: "88.9%"
    },
    {
      rank: 2,
      name: "Priya Patel", 
      events: 2,
      wins: 7,
      losses: 1,
      points: 82,
      winRate: "87.5%"
    },
    {
      rank: 3,
      name: "Amit Kumar",
      events: 2,
      wins: 6,
      losses: 2,
      points: 75,
      winRate: "75.0%"
    },
    {
      rank: 4,
      name: "Sneha Reddy",
      events: 3,
      wins: 5,
      losses: 3,
      points: 68,
      winRate: "62.5%"
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-orange-600" />;
      default: return <Target className="w-5 h-5 text-gray-400" />;
    }
  };

  const exportResults = (format: 'pdf' | 'excel') => {
    console.log(`Exporting results as ${format}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Results & Leaderboard</h2>
          <p className="text-gray-600">Tournament results and overall standings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportResults('excel')}>
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
          <Button variant="outline" onClick={() => exportResults('pdf')}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Event Results */}
      <Card>
        <CardHeader>
          <CardTitle>Event Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {eventResults.map((event, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{event.eventName}</h3>
                    <p className="text-sm text-gray-600">
                      {event.totalParticipants} participants • {event.matches} matches
                    </p>
                  </div>
                  <Badge className={event.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </Badge>
                </div>
                
                {event.status === 'completed' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Trophy className="w-6 h-6 text-yellow-500" />
                      <div>
                        <p className="text-sm text-gray-500">Winner</p>
                        <p className="font-semibold">{event.winner}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Medal className="w-6 h-6 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Runner-up</p>
                        <p className="font-semibold">{event.runnerUp}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500">Event in progress...</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Overall Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Tournament Leaderboard</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Player</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Matches</TableHead>
                <TableHead>Win Rate</TableHead>
                <TableHead>Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((player) => (
                <TableRow key={player.rank}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getRankIcon(player.rank)}
                      <span className="font-semibold">#{player.rank}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{player.name}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{player.events}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <span className="text-green-600 font-medium">{player.wins}W</span>
                      <span className="text-gray-400 mx-1">-</span>
                      <span className="text-red-600 font-medium">{player.losses}L</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={player.rank <= 3 ? 'border-green-200 text-green-700' : ''}
                    >
                      {player.winRate}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-lg">{player.points}</div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tournament Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">8</p>
            <p className="text-sm text-gray-600">Total Events</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">64</p>
            <p className="text-sm text-gray-600">Total Matches</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Award className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">72</p>
            <p className="text-sm text-gray-600">Total Players</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultsLeaderboard;
