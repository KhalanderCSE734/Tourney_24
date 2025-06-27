
const SportsCategories = () => {
  const sports = [
    { name: "Basketball", icon: "🏀" },
    { name: "Basketball", icon: "🏀" },
    { name: "Basketball", icon: "🏀" },
    { name: "Basketball", icon: "🏀" },
    { name: "Basketball", icon: "🏀" },
    { name: "Basketball", icon: "🏀" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-4xl">
            {sports.map((sport, index) => (
              <div
                key={index}
                className="flex flex-col items-center group cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 border-2 border-primary/20">
                  <span className="text-2xl">{sport.icon}</span>
                </div>
                <span className="mt-3 text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                  {sport.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SportsCategories;
