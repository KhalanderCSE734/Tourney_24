
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Save, RefreshCw } from "lucide-react";

interface Match {
  id: number;
  player1: string;
  player2: string;
  score1: number;
  score2: number;
  sets?: { player1: number; player2: number }[];
  status: 'upcoming' | 'live' | 'completed';
}

interface ScoringInterfaceProps {
  eventId: number;
  eventName: string;
}

const ScoringInterface = ({ eventId, eventName }: ScoringInterfaceProps) => {
  const [matches, setMatches] = useState<Match[]>([
    {
      id: 1,
      player1: "John Doe",
      player2: "Jane Smith", 
      score1: 15,
      score2: 12,
      sets: [
        { player1: 21, player2: 18 },
        { player1: 19, player2: 21 },
        { player1: 15, player2: 12 }
      ],
      status: 'live'
    },
    {
      id: 2,
      player1: "Mike Johnson",
      player2: "Sarah Wilson",
      score1: 0,
      score2: 0,
      sets: [{ player1: 0, player2: 0 }],
      status: 'upcoming'
    }
  ]);

  const [selectedMatch, setSelectedMatch] = useState<Match | null>(matches[0]);

  const updateScore = (matchId: number, player: 'player1' | 'player2', increment: boolean) => {
    setMatches(prev => prev.map(match => {
      if (match.id === matchId) {
        const newScore = increment 
          ? match[player === 'player1' ? 'score1' : 'score2'] + 1
          : Math.max(0, match[player === 'player1' ? 'score1' : 'score2'] - 1);
        
        if (player === 'player1') {
          return { ...match, score1: newScore };
        } else {
          return { ...match, score2: newScore };
        }
      }
      return match;
    }));
    
    // Update selected match
    if (selectedMatch?.id === matchId) {
      setSelectedMatch(prev => {
        if (!prev) return null;
        const newScore = increment 
          ? prev[player === 'player1' ? 'score1' : 'score2'] + 1
          : Math.max(0, prev[player === 'player1' ? 'score1' : 'score2'] - 1);
        
        if (player === 'player1') {
          return { ...prev, score1: newScore };
        } else {
          return { ...prev, score2: newScore };
        }
      });
    }
  };

  const saveMatch = (matchId: number) => {
    console.log("Saving match:", matchId);
    // Implement save logic
  };

  const resetMatch = (matchId: number) => {
    setMatches(prev => prev.map(match => {
      if (match.id === matchId) {
        return { ...match, score1: 0, score2: 0, sets: [{ player1: 0, player2: 0 }] };
      }
      return match;
    }));
    
    if (selectedMatch?.id === matchId) {
      setSelectedMatch(prev => prev ? { ...prev, score1: 0, score2: 0, sets: [{ player1: 0, player2: 0 }] } : null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Live Scoring</h2>
          <p className="text-gray-600">Event: {eventName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Matches List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Matches</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {matches.map((match) => (
              <div 
                key={match.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedMatch?.id === match.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedMatch(match)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-sm">{match.player1} vs {match.player2}</span>
                  <Badge 
                    className={
                      match.status === 'live' 
                        ? 'bg-green-100 text-green-800'
                        : match.status === 'completed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }
                  >
                    {match.status}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  Score: {match.score1} - {match.score2}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Scoring Interface */}
        {selectedMatch && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>
                {selectedMatch.player1} vs {selectedMatch.player2}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Set Score */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">{selectedMatch.player1}</h3>
                  <div className="text-6xl font-bold text-blue-600 mb-4">
                    {selectedMatch.score1}
                  </div>
                  <div className="flex justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateScore(selectedMatch.id, 'player1', false)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => updateScore(selectedMatch.id, 'player1', true)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">{selectedMatch.player2}</h3>
                  <div className="text-6xl font-bold text-red-600 mb-4">
                    {selectedMatch.score2}
                  </div>
                  <div className="flex justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateScore(selectedMatch.id, 'player2', false)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => updateScore(selectedMatch.id, 'player2', true)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sets History */}
              {selectedMatch.sets && selectedMatch.sets.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Sets</h4>
                  <div className="space-y-2">
                    {selectedMatch.sets.map((set, index) => (
                      <div key={index} className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded">
                        <span>Set {index + 1}</span>
                        <span className="font-medium">
                          {set.player1} - {set.player2}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button
                  onClick={() => saveMatch(selectedMatch.id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Match
                </Button>
                <Button
                  variant="outline"
                  onClick={() => resetMatch(selectedMatch.id)}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset Score
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ScoringInterface;
