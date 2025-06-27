
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import OrganizerSidebar from "@/components/organizer/OrganizerSidebar";
import LocationSelector from "@/components/organizer/LocationSelector";
import { ArrowLeft, Upload, Save, Eye } from "lucide-react";

const CreateTournament = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type: "public",
    sport: "",
    startDate: "",
    endDate: "",
    location: "",
    coordinates: null as [number, number] | null,
    description: "",
    rules: "",
    registrationOpen: true,
    registrationFee: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    coverImage: null as File | null
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLocationChange = (location: string, coordinates?: [number, number]) => {
    setFormData(prev => ({ 
      ...prev, 
      location,
      coordinates: coordinates || null
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, coverImage: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tournament data:", formData);
    // Handle form submission
    navigate("/organizer/tournaments");
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
              onClick={() => navigate("/organizer/tournaments")}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Tournament</h1>
              <p className="text-gray-600 mt-1">Set up your tournament details and configuration</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="name">Tournament Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter tournament name"
                    required
                  />
                </div>

                <div>
                  <Label>Tournament Type *</Label>
                  <RadioGroup
                    value={formData.type}
                    onValueChange={(value) => handleInputChange("type", value)}
                    className="flex gap-6 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="public" />
                      <Label htmlFor="public">Public</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="private" id="private" />
                      <Label htmlFor="private">Private</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="sport">Sport *</Label>
                  <Select onValueChange={(value) => handleInputChange("sport", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sport" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="badminton">Badminton</SelectItem>
                      <SelectItem value="tennis">Tennis</SelectItem>
                      <SelectItem value="table-tennis">Table Tennis</SelectItem>
                      <SelectItem value="football">Football</SelectItem>
                      <SelectItem value="cricket">Cricket</SelectItem>
                      <SelectItem value="basketball">Basketball</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange("endDate", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <LocationSelector
                  value={formData.location}
                  onChange={handleLocationChange}
                />
              </CardContent>
            </Card>

            {/* Tournament Details */}
            <Card>
              <CardHeader>
                <CardTitle>Tournament Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="coverImage">Cover Image</Label>
                  <div className="mt-2">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                    {formData.coverImage && (
                      <p className="text-sm text-green-600 mt-2">
                        Selected: {formData.coverImage.name}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Enter tournament description..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="rules">Rules & Regulations</Label>
                  <Textarea
                    id="rules"
                    value={formData.rules}
                    onChange={(e) => handleInputChange("rules", e.target.value)}
                    placeholder="Enter tournament rules and regulations..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Registration Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Registration Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Registration Open</Label>
                    <p className="text-sm text-gray-500">Allow participants to register for this tournament</p>
                  </div>
                  <Switch
                    checked={formData.registrationOpen}
                    onCheckedChange={(checked) => handleInputChange("registrationOpen", checked)}
                  />
                </div>

                <div>
                  <Label htmlFor="registrationFee">Registration Fee (₹)</Label>
                  <Input
                    id="registrationFee"
                    type="number"
                    value={formData.registrationFee}
                    onChange={(e) => handleInputChange("registrationFee", e.target.value)}
                    placeholder="Enter registration fee"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="contactName">Contact Person Name *</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange("contactName", e.target.value)}
                    placeholder="Enter contact person name"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactEmail">Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                      placeholder="Enter contact email"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Phone Number *</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                      placeholder="Enter contact phone"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate("/organizer/tournaments")}
              >
                Cancel
              </Button>
              <Button type="button" variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Save as Draft
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Create Tournament
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTournament;
