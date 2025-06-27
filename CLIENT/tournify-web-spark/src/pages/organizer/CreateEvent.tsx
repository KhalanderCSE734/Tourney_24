
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, HelpCircle, Save } from "lucide-react";
import OrganizerSidebar from "@/components/organizer/OrganizerSidebar";
import { useToast } from "@/hooks/use-toast";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { tournamentId } = useParams();
  const { toast } = useToast();
  
  const [eventData, setEventData] = useState({
    name: "",
    eventType: "singles",
    matchType: "knockout",
    maxParticipants: "",
    entryFee: "",
    allowBooking: true,
    offers: "",
    description: ""
  });

  const handleSubmit = () => {
    // Validate required fields
    if (!eventData.name || !eventData.maxParticipants) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Save event logic would go here
    console.log("Creating event:", eventData);
    
    toast({
      title: "Success",
      description: "Event created successfully!",
    });
    
    // Navigate back to tournament details
    navigate(`/organizer/tournament/${tournamentId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <OrganizerSidebar />
      
      <div className="flex-1 p-6 ml-64">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(`/organizer/tournament/${tournamentId}`)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tournament
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CREATE NEW EVENT</h1>
              <p className="text-gray-600">Add a new event to your tournament</p>
            </div>
          </div>

          {/* Event Creation Form */}
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Event Name */}
              <div>
                <Label htmlFor="eventName" className="flex items-center gap-1 text-sm font-medium">
                  EVENT NAME <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="eventName"
                  value={eventData.name}
                  onChange={(e) => setEventData({...eventData, name: e.target.value})}
                  placeholder="eg: Men's singles"
                  className="mt-1"
                />
              </div>

              {/* Event Type */}
              <div>
                <Label className="flex items-center gap-1 text-sm font-medium mb-3">
                  EVENT TYPE <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  value={eventData.eventType}
                  onValueChange={(value) => setEventData({...eventData, eventType: value})}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="singles" id="singles" />
                    <Label htmlFor="singles">Singles</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="doubles" id="doubles" />
                    <Label htmlFor="doubles">Doubles</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="team" id="team" />
                    <Label htmlFor="team">Team</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Match Type */}
              <div>
                <Label className="flex items-center gap-1 text-sm font-medium mb-3">
                  MATCH TYPE <span className="text-red-500">*</span>
                  <Button variant="ghost" size="sm" className="p-0 h-auto ml-2">
                    <HelpCircle className="w-4 h-4 text-blue-500" />
                  </Button>
                  <span className="text-blue-500 text-sm cursor-pointer">FIXTURE CALCULATOR HELPER</span>
                </Label>
                <RadioGroup
                  value={eventData.matchType}
                  onValueChange={(value) => setEventData({...eventData, matchType: value})}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="knockout" id="knockout" />
                    <Label htmlFor="knockout">Knockout</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="round-robin" id="round-robin" />
                    <Label htmlFor="round-robin">Round Robin</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hybrid" id="hybrid" />
                    <Label htmlFor="hybrid">Round Robin + Knockout</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Maximum Participants */}
              <div>
                <Label htmlFor="maxParticipants" className="flex items-center gap-1 text-sm font-medium">
                  MAXIMUM NUMBER OF TEAMS CAN PARTICIPATE <span className="text-red-500">*</span>
                  <Button variant="ghost" size="sm" className="p-0 h-auto ml-2">
                    <HelpCircle className="w-4 h-4 text-blue-500" />
                  </Button>
                </Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  value={eventData.maxParticipants}
                  onChange={(e) => setEventData({...eventData, maxParticipants: e.target.value})}
                  placeholder="eg: 50"
                  className="mt-1"
                />
              </div>

              {/* Entry Fee */}
              <div>
                <Label htmlFor="entryFee" className="flex items-center gap-1 text-sm font-medium">
                  TEAM ENTRY FEE
                  <Button variant="ghost" size="sm" className="p-0 h-auto ml-2">
                    <HelpCircle className="w-4 h-4 text-blue-500" />
                  </Button>
                </Label>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium">INR</span>
                  <Input
                    id="entryFee"
                    type="number"
                    value={eventData.entryFee}
                    onChange={(e) => setEventData({...eventData, entryFee: e.target.value})}
                    placeholder="0"
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Allow Booking */}
              <div>
                <Label className="flex items-center gap-1 text-sm font-medium mb-3">
                  ALLOW BOOKING
                  <Button variant="ghost" size="sm" className="p-0 h-auto ml-2">
                    <HelpCircle className="w-4 h-4 text-blue-500" />
                  </Button>
                </Label>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={eventData.allowBooking}
                    onCheckedChange={(checked) => setEventData({...eventData, allowBooking: checked})}
                  />
                  <span className="text-sm text-gray-600">
                    {eventData.allowBooking ? "Booking enabled for participants" : "Booking disabled"}
                  </span>
                </div>
              </div>

              {/* Offers */}
              <div>
                <Label htmlFor="offers" className="text-sm font-medium">OFFERS (IN %)</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    id="offers"
                    type="number"
                    value={eventData.offers}
                    onChange={(e) => setEventData({...eventData, offers: e.target.value})}
                    placeholder="0"
                    className="flex-1"
                    min="0"
                    max="100"
                  />
                  <span className="text-gray-500 text-sm">% discount on entry fee</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => navigate(`/organizer/tournament/${tournamentId}`)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
