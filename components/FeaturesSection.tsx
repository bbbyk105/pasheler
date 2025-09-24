
'use client';

export default function FeaturesSection() {
  const features = [
    {
      icon: 'ri-leaf-line',
      title: 'Natural Ingredients',
      description: 'Sourced from organic farms across Korea, our ingredients are carefully selected for their purity and effectiveness.'
    },
    {
      icon: 'ri-flask-line',
      title: 'Science-Backed',
      description: 'Every formula is developed with cutting-edge research, combining traditional wisdom with modern innovation.'
    },
    {
      icon: 'ri-earth-line',
      title: 'Eco-Friendly',
      description: 'Sustainable packaging and ethical sourcing practices that respect both your skin and the environment.'
    },
    {
      icon: 'ri-heart-pulse-line',
      title: 'Gentle Care',
      description: 'Suitable for all skin types, including sensitive skin. Dermatologically tested for optimal safety.'
    }
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-serif text-stone-800 mb-4">
            Why Choose Natural Beauty
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Discover the difference that authentic, natural skincare can make in your daily routine
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6 rounded-full bg-gradient-to-br from-stone-100 to-amber-50 group-hover:from-amber-100 group-hover:to-stone-100 transition-all duration-300">
                <i className={`${feature.icon} text-2xl text-stone-700`}></i>
              </div>
              <h3 className="text-xl font-medium text-stone-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-stone-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
