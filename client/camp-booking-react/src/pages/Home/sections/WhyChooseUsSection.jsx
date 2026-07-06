const features = [
  {
    icon: "✅",
    title: "Verified Camps",
    description:
      "Every camp is personally reviewed and verified by our team to ensure quality and safety standards.",
  },
  {
    icon: "⚡",
    title: "Instant Booking",
    description:
      "Confirm your reservation in seconds. No waiting, no callbacks — just seamless booking.",
  },
  {
    icon: "🔒",
    title: "Secure Payments",
    description:
      "Your payments are fully encrypted and protected. Book with complete peace of mind.",
  },
  {
    icon: "🌄",
    title: "Best Locations",
    description:
      "Curated camps in the most scenic spots — mountains, rivers, forests, deserts and more.",
  },
];

function WhyChooseUsSection() {
  return (
    <section id="about" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Why CampBooking
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            The Smarter Way to Camp
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-500">
            We take the hassle out of planning so you can focus on what matters
            — the experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-emerald-100"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-3xl transition-colors group-hover:bg-emerald-100">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-base font-bold text-slate-900">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUsSection;
