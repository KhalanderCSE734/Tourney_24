
import { Heart, Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const EventsSection = () => {
  const events = [
    {
      id: 1,
      title: "American Football",
      date: "23rd Jan 2025",
      location: "Bengaluru Stadium",
      tags: ["U12", "U15", "U18", "U23"],
      image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      title: "American Football",
      date: "23rd Jan 2025",
      location: "Bengaluru Stadium",
      tags: ["U12", "U15", "U18", "U23"],
      image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      title: "American Football",
      date: "23rd Jan 2025",
      location: "Bengaluru Stadium",
      tags: ["U12", "U15", "U18", "U23"],
      image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Explore Upcoming Events
          </h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowRight className="w-4 h-4 rotate-180" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Card 
              key={event.id} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 group animate-scale-in border-0 shadow-lg"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                >
                  <Heart className="w-5 h-5 text-white" />
                </Button>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{event.title}</h3>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.date}</span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.location}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Button className="w-full bg-primary hover:bg-primary/90 text-white group">
                  Explore More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
