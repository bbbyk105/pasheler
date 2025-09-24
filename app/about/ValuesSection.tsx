
'use client';

export default function ValuesSection() {
  const values = [
    {
      icon: 'ri-leaf-line',
      title: 'Sustainability',
      description: 'We are committed to protecting our planet through eco-friendly practices and sustainable sourcing of all our ingredients.'
    },
    {
      icon: 'ri-heart-line',
      title: 'Natural Care',
      description: 'Every product is crafted with pure, natural ingredients that nourish your skin without harmful chemicals or additives.'
    },
    {
      icon: 'ri-award-line',
      title: 'Excellence',
      description: 'We maintain the highest standards of quality in every aspect of our business, from ingredient selection to customer service.'
    },
    {
      icon: 'ri-group-line',
      title: 'Community',
      description: 'We believe in building strong relationships with our customers, suppliers, and the communities we serve worldwide.'
    }
  ];

  return (
    <section className="py-20 px-6 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-stone-800 mb-6">Our Values</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            These core principles guide everything we do and reflect our commitment to you and our planet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 flex items-center justify-center text-stone-600 mx-auto mb-6 bg-stone-50 rounded-full">
                <i className={`${value.icon} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-medium text-stone-800 mb-4">{value.title}</h3>
              <p className="text-stone-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
