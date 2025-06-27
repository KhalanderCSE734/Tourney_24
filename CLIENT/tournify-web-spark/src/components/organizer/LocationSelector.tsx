
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface LocationSelectorProps {
  value: string;
  onChange: (location: string, coordinates?: [number, number]) => void;
}

const LocationSelector = ({ value, onChange }: LocationSelectorProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [showMap, setShowMap] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Sample Indian cities for suggestions
  const indianCities = [
    "Mumbai, Maharashtra",
    "Delhi, Delhi",
    "Bangalore, Karnataka",
    "Hyderabad, Telangana",
    "Chennai, Tamil Nadu",
    "Kolkata, West Bengal",
    "Pune, Maharashtra",
    "Ahmedabad, Gujarat",
    "Jaipur, Rajasthan",
    "Surat, Gujarat",
    "Lucknow, Uttar Pradesh",
    "Kanpur, Uttar Pradesh",
    "Nagpur, Maharashtra",
    "Indore, Madhya Pradesh",
    "Thane, Maharashtra",
    "Bhopal, Madhya Pradesh",
    "Visakhapatnam, Andhra Pradesh",
    "Pimpri-Chinchwad, Maharashtra",
    "Patna, Bihar",
    "Vadodara, Gujarat"
  ];

  useEffect(() => {
    if (value && value.length > 2) {
      const filtered = indianCities.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
      
      if (value.length > 3) {
        setShowMap(true);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setShowMap(false);
    }
  }, [value]);

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    setShowMap(true);
  };

  const renderSimpleMap = () => {
    // Simple map placeholder - in a real app, you'd use a proper map service
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100"></div>
        <div className="relative z-10 text-center">
          <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <p className="text-sm font-medium text-gray-700">{value}</p>
          <p className="text-xs text-gray-500">Location Preview</p>
        </div>
        {/* Grid lines to simulate map */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(8)].map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full h-px bg-gray-400" style={{ top: `${(i + 1) * 12.5}%` }} />
          ))}
          {[...Array(8)].map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full w-px bg-gray-400" style={{ left: `${(i + 1) * 12.5}%` }} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Label htmlFor="location">Tournament Location</Label>
        <Input
          id="location"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter location (e.g., Mumbai, Maharashtra)"
          className="mt-1"
        />
        
        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <Card className="absolute z-10 w-full mt-1 max-h-40 overflow-y-auto">
            <div className="p-2">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {showMap && (
        <div className="space-y-2">
          <Label>Location Preview</Label>
          {renderSimpleMap()}
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
