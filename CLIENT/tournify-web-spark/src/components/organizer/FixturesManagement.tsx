
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Users, Target, Calendar, Plus, Play, Edit, Save } from "lucide-react";

interface FixturesManagementProps {
  eventId: number;
  eventName: string;
  matchType: "knockout" | "round-robin" | "hybrid";
}

interface Match {
  id: number;
  round: string;
  player1: string;
  player2: string;
  score1?: number;
  score2?: number;
  winner?: string;
  status: "upcoming" | "live" | "completed";
}

interface Player {
  id: number;
  name: string;
  wins: number;
  losses: number;
  points: number;
}

const FixturesManagement = ({ eventId, eventName, matchType }: FixturesManagementProps) => {
  const [players] = useState<Player[]>([
    { id: 1, name: "Player A", wins: 2, losses: 0, points: 6 },
    { id: 2, name: "Player B", wins: 1, losses: 1, points: 3 },
    { id: 3, name: "Player C", wins: 1, losses: 1, points: 3 },
    { id: 4, name: "Player D", wins: 0, losses: 2, points: 0 }
  ]);

  const [matches, setMatches] = useState<Match[]>([
    {
      id: 1,
      round: "Round 1",
      player1: "Player A",
      player2: "Player B",
      score1: 21,
      score2: 18,
      winner: "Player A",
      status: "completed"
    },
    {
      id: 2,
      round: "Round 1", 
      player1: "Player C",
      player2: "Player D",
      score1: 21,
      score2: 15,
      winner: "Player C",
      status: "completed"
    },
    {
      id: 3,
      round: "Final",
      player1: "Player A",
      player2: "Player C",
      status: "upcoming"
    }
  ]);

  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isScoreDialogOpen, setIsScoreDialogOpen] = useState(false);

  const generateKnockoutBracket = () => {
    console.log("Generating knockout bracket for", players.length, "players");
    // Logic for knockout bracket generation
  };

  const generateRoundRobin = () => {
    console.log("Generating round robin for", players.length, "players");
    // Logic for round robin generation
  };

  const generateHybridTournament = () => {
    console.log("Generating hybrid tournament for", players.length, "players");
    // Logic for hybrid tournament generation
  };

  const updateMatchScore = (matchId: number, score1: number, score2: number) => {
    setMatches(prev => prev.map(match => 
      match.id === matchId 
        ? { 
            ...match, 
            score1, 
            score2, 
            winner: score1 > score2 ? match.player1 : match.player2,
            status: "completed" as const
          }
        : match
    ));
  };

  const KnockoutView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Knockout Bracket</h3>
        <Button onClick={generateKnockoutBracket}>
          <Target className="w-4 h-4 mr-2" />
          Generate Bracket
        </Button>
      </div>
      
      <div className="bg-gray-50 p-8 rounded-lg">
        <div className="grid grid-cols-4 gap-8">
          {/* Quarterfinals */}
          <div className="space-y-4">
            <h4 className="font-medium text-center">Quarterfinals</h4>
            {matches.filter(m => m.round === "Quarterfinal").map(match => (
              <div key={match.id} className="bg-white p-3 rounded border">
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>{match.player1}</span>
                    <span>{match.score1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{match.player2}</span>
                    <span>{match.score2}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Semifinals */}
          <div className="space-y-4">
            <h4 className="font-medium text-center">Semifinals</h4>
            {matches.filter(m => m.round === "Semifinal").map(match => (
              <div key={match.id} className="bg-white p-3 rounded border">
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>{match.player1}</span>
                    <span>{match.score1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{match.player2}</span>
                    <span>{match.score2}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Finals */}
          <div className="space-y-4">
            <h4 className="font-medium text-center">Final</h4>
            {matches.filter(m => m.round === "Final").map(match => (
              <div key={match.id} className="bg-white p-3 rounded border">
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>{match.player1}</span>
                    <span>{match.score1 || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{match.player2}</span>
                    <span>{match.score2 || "-"}</span>
                  </div>
                </div>
                {match.status === "upcoming" && (
                  <Button 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={() => {
                      setSelectedMatch(match);
                      setIsScoreDialogOpen(true);
                    }}
                  >
                    Add Score
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Winner */}
          <div className="space-y-4">
            <h4 className="font-medium text-center">Winner</h4>
            <div className="bg-yellow-50 border-2 border-yellow-200 p-3 rounded">
              <div className="text-center">
                <Trophy className="w-8 h-8 mx-auto text-yellow-600 mb-2" />
                <p className="font-medium">TBD</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const RoundRobinView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Round Robin Standings</h3>
        <Button onClick={generateRoundRobin}>
          <Target className="w-4 h-4 mr-2" />
          Generate Fixtures
        </Button>
      </div>

      {/* Standings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Standings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Position</TableHead>
                <TableHead>Player</TableHead>
                <TableHead>Wins</TableHead>
                <TableHead>Losses</TableHead>
                <TableHead>Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players
                .sort((a, b) => b.points - a.points)
                .map((player, index) => (
                <TableRow key={player.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.wins}</TableCell>
                  <TableCell>{player.losses}</TableCell>
                  <TableCell className="font-semibold">{player.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Match Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Match Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {matches.map(match => (
              <div key={match.id} className="flex items-center justify-between p-3 border rounded">
                <div className="flex-1">
                  <p className="font-medium">{match.player1} vs {match.player2}</p>
                  <p className="text-sm text-gray-500">{match.round}</p>
                </div>
                <div className="flex items-center gap-4">
                  {match.status === "completed" ? (
                    <div className="text-sm">
                      <span className="font-medium">{match.score1} - {match.score2}</span>
                      <p className="text-green-600">Winner: {match.winner}</p>
                    </div>
                  ) : (
                    <Button 
                      size="sm"
                      onClick={() => {
                        setSelectedMatch(match);
                        setIsScoreDialogOpen(true);
                      }}
                    >
                      <Play className="w-3 h-3 mr-1" />
                      Add Score
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const HybridView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Hybrid Tournament (Group Stage + Knockout)</h3>
        <Button onClick={generateHybridTournament}>
          <Target className="w-4 h-4 mr-2" />
          Generate Tournament
        </Button>
      </div>

      <Tabs defaultValue="groups" className="space-y-4">
        <TabsList>
          <TabsTrigger value="groups">Group Stage</TabsTrigger>
          <TabsTrigger value="knockout">Knockout Stage</TabsTrigger>
        </TabsList>

        <TabsContent value="groups">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Group A</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Player</TableHead>
                      <TableHead>Points</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {players.slice(0, 2).map(player => (
                      <TableRow key={player.id}>
                        <TableCell>{player.name}</TableCell>
                        <TableCell>{player.points}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Group B</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Player</TableHead>
                      <TableHead>Points</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {players.slice(2, 4).map(player => (
                      <TableRow key={player.id}>
                        <TableCell>{player.name}</TableCell>
                        <TableCell>{player.points}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="knockout">
          <KnockoutView />
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Fixtures - {eventName}</h2>
          <p className="text-gray-600">Format: {matchType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
        </div>
      </div>

      {/* Tournament Format Views */}
      {matchType === "knockout" && <KnockoutView />}
      {matchType === "round-robin" && <RoundRobinView />}
      {matchType === "hybrid" && <HybridView />}

      {/* Score Update Dialog */}
      <Dialog open={isScoreDialogOpen} onOpenChange={setIsScoreDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Match Score</DialogTitle>
          </DialogHeader>
          {selectedMatch && (
            <div className="space-y-4">
              <div>
                <p className="font-medium">{selectedMatch.player1} vs {selectedMatch.player2}</p>
                <p className="text-sm text-gray-600">{selectedMatch.round}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{selectedMatch.player1} Score</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div>
                  <Label>{selectedMatch.player2} Score</Label>
                  <Input type="number" placeholder="0" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsScoreDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsScoreDialogOpen(false)}>
                  <Save className="w-4 h-4 mr-2" />
                  Update Score
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FixturesManagement;
