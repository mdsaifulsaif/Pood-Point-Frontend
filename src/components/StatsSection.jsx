export default function StatsSection() {
  const stats = [
    { value: "80%", label: "Reduction in manual communication" },
    { value: "2-4x", label: "Higher engagement than competitors" },
    { value: "40%", label: "Increase in customer engagement" },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-2xl shadow-sm p-8 text-center hover:shadow-md transition"
          >
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              {item.value}
            </h3>
            <p className="text-sm uppercase tracking-wide text-gray-600">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
