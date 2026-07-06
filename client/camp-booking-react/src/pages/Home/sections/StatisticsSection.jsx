const stats = [
  { value: "50+", label: "Camps Available", icon: "🏕" },
  { value: "10,000+", label: "Happy Campers", icon: "😊" },
  { value: "4.8", label: "Average Rating", icon: "⭐" },
  { value: "20", label: "Scenic Locations", icon: "📍" },
];

function StatisticsSection() {
  return (
    <section className="bg-emerald-600 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mb-2 text-4xl">{stat.icon}</div>
              <div className="text-3xl font-extrabold text-white sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm font-medium text-emerald-100">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatisticsSection;
