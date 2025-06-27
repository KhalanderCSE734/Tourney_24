
import { ChevronDown } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "Explore Events",
      description: "Browse through a wide range of sports events, from football and basketball to cricket and tennis.",
      isActive: true
    },
    {
      number: "02",
      title: "Choose Your Spot",
      description: "Select your preferred location and time slot for the event you want to participate in.",
      isActive: false
    },
    {
      number: "03",
      title: "Book And Enjoy",
      description: "Complete your booking and get ready to enjoy an amazing sports experience.",
      isActive: false
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative animate-fade-in">
            <img
              src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Stadium"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 animate-fade-in">
              Effortlessly Easy To Play The <span className="text-primary">Sport</span><br />
              You Love
            </h2>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div 
                  key={step.number}
                  className={`p-6 rounded-xl border transition-all duration-300 animate-fade-in ${
                    step.isActive 
                      ? 'bg-white border-primary/20 shadow-lg' 
                      : 'bg-white/50 border-gray-200 hover:bg-white hover:shadow-md'
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl font-bold text-primary mr-4">
                          {step.number}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900">
                          {step.title}
                        </h3>
                      </div>
                      {step.isActive && (
                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      )}
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        step.isActive ? 'rotate-180' : ''
                      }`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
