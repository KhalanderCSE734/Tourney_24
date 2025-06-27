
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Events = () => {
  const events = [
    {
      id: 1,
      name: "State Level Basketball Tournament",
      location: "Bangalore stadium",
      date: "9th February 2025",
      categories: ["U-17", "U-19", "U-21", "U-23"],
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "State Level Basketball Tournament",
      location: "Bangalore stadium",
      date: "9th February 2025",
      categories: ["U-17", "U-19", "U-21", "U-23"],
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "State Level Basketball Tournament",
      location: "Bangalore stadium",
      date: "9th February 2025",
      categories: ["U-17", "U-19", "U-21", "U-23"],
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Sports Categories */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-6">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-2">
                    <span className="text-white text-2xl">🏀</span>
                  </div>
                  <span className="text-sm text-gray-600">Basketball</span>
                </div>
              ))}
            </div>
          </div>

          {/* Events Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">List of all upcoming events</h2>
            <Button variant="link" className="text-primary">→</Button>
          </div>

          {/* Events List */}
          <div className="space-y-6">
            {events.map((event) => (
              <Link key={event.id} to={`/tournament/${event.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex space-x-6">
                      <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-primary mb-2">{event.name}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{event.date}</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Categories:</p>
                          <div className="flex space-x-2">
                            {event.categories.map((category, index) => (
                              <span 
                                key={index}
                                className="px-3 py-1 bg-primary text-white text-xs rounded-full"
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Events;
