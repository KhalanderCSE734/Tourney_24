
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Users, Calendar, DollarSign, Trophy, ArrowLeft, HelpCircle } from "lucide-react";

interface EventsManagementProps {
  tournamentId: number;
}

const EventsManagement = ({ tournamentId }: EventsManagementProps) => {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Men's Singles",
      eventType: "singles",
      matchType: "knockout",
      maxParticipants: 32,
      registeredParticipants: 24,
      entryFee: 250,
      allowBooking: true,
      offers: 0,
      status: "active"
    },
    {
      id: 2,
      name: "Women's Doubles",
      eventType: "doubles",
      matchType: "round-robin",
      maxParticipants: 16,
      registeredParticipants: 12,
      entryFee: 400,
      allowBooking: true,
      offers: 10,
      status: "active"
    }
  ]);

  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    eventType: "singles",
    matchType: "knockout",
    maxParticipants: "",
    entryFee: "",
    allowBooking: true,
    offers: ""
  });

  const handleAddEvent = () => {
    const event = {
      id: events.length + 1,
      ...newEvent,
      maxParticipants: parseInt(newEvent.maxParticipants),
      entryFee: parseInt(newEvent.entryFee),
      offers: parseInt(newEvent.offers || "0"),
      registeredParticipants: 0,
      status: "active"
    };
    setEvents([...events, event]);
    setNewEvent({
      name: "",
      eventType: "singles",
      matchType: "knockout",
      maxParticipants: "",
      entryFee: "",
      allowBooking: true,
      offers: ""
    });
    setIsAddEventOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Events Management</h2>
          <p className="text-gray-600">Manage tournament events and categories</p>
        </div>
        <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setIsAddEventOpen(false)}>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                  <DialogTitle className="text-lg font-semibold">ADD NEW EVENT</DialogTitle>
                  <p className="text-sm text-gray-500">Create a new event for your tournament</p>
                </div>
              </div>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {/* Event Name */}
              <div>
                <Label htmlFor="eventName" className="flex items-center gap-1">
                  EVENT NAME <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="eventName"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                  placeholder="eg: Men's singles"
                  className="mt-1"
                />
              </div>

              {/* Event Type */}
              <div>
                <Label className="flex items-center gap-1">
                  EVENT TYPE <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  value={newEvent.eventType}
                  onValueChange={(value) => setNewEvent({...newEvent, eventType: value})}
                  className="flex gap-6 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="singles" id="singles" />
                    <Label htmlFor="singles">Singles</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="doubles" id="doubles" />
                    <Label htmlFor="doubles">Doubles</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Match Type */}
              <div>
                <Label className="flex items-center gap-1">
                  MATCH TYPE <span className="text-red-500">*</span>
                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    <HelpCircle className="w-4 h-4 text-blue-500" />
                  </Button>
                  <span className="text-blue-500 text-sm cursor-pointer">FIXTURE CALCULATOR HELPER</span>
                </Label>
                <RadioGroup
                  value={newEvent.matchType}
                  onValueChange={(value) => setNewEvent({...newEvent, matchType: value})}
                  className="flex gap-6 mt-2"
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
                <Label htmlFor="maxParticipants" className="flex items-center gap-1">
                  MAXIMUM NUMBER OF TEAMS CAN PARTICIPATE
                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    <HelpCircle className="w-4 h-4 text-blue-500" />
                  </Button>
                </Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  value={newEvent.maxParticipants}
                  onChange={(e) => setNewEvent({...newEvent, maxParticipants: e.target.value})}
                  placeholder="eg: 50"
                  className="mt-1"
                />
              </div>

              {/* Team Entry Fee */}
              <div>
                <Label htmlFor="entryFee" className="flex items-center gap-1">
                  TEAM ENTRY FEE
                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    <HelpCircle className="w-4 h-4 text-blue-500" />
                  </Button>
                </Label>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">INR</span>
                  <Input
                    id="entryFee"
                    type="number"
                    value={newEvent.entryFee}
                    onChange={(e) => setNewEvent({...newEvent, entryFee: e.target.value})}
                    placeholder="0"
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Allow Booking */}
              <div>
                <Label className="flex items-center gap-1">
                  ALLOW BOOKING
                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    <HelpCircle className="w-4 h-4 text-blue-500" />
                  </Button>
                </Label>
                <div className="flex items-center gap-2 mt-2">
                  <Switch
                    checked={newEvent.allowBooking}
                    onCheckedChange={(checked) => setNewEvent({...newEvent, allowBooking: checked})}
                  />
                  <span className="text-sm text-gray-600">
                    {newEvent.allowBooking ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </div>

              {/* Offers */}
              <div>
                <Label htmlFor="offers">OFFERS (IN %)</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    id="offers"
                    type="number"
                    value={newEvent.offers}
                    onChange={(e) => setNewEvent({...newEvent, offers: e.target.value})}
                    placeholder="0"
                    className="flex-1"
                  />
                  <span className="text-gray-500">%</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEvent} className="bg-gray-600 hover:bg-gray-700">
                  Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{event.name}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary" className="capitalize">{event.eventType}</Badge>
                    <Badge variant="outline" className="capitalize">{event.matchType.replace('-', ' ')}</Badge>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Users className="w-4 h-4 mr-2" />
                    Participants
                  </div>
                  <p className="font-semibold">
                    {event.registeredParticipants}/{event.maxParticipants}
                  </p>
                </div>
                <div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Entry Fee
                  </div>
                  <p className="font-semibold">₹{event.entryFee}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Booking:</span>
                  <span className={`font-medium ${event.allowBooking ? 'text-green-600' : 'text-red-600'}`}>
                    {event.allowBooking ? 'Allowed' : 'Not Allowed'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Offers:</span>
                  <span className="font-medium">{event.offers}%</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  <Trophy className="w-4 h-4 mr-2" />
                  Fixtures
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {events.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500 mb-4">No events created yet.</p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsAddEventOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Event
          </Button>
        </Card>
      )}
    </div>
  );
};

export default EventsManagement;
