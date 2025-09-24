
'use client';

export default function TeamSection() {
  const team = [
    {
      name: 'Sarah Kim',
      role: 'Founder & CEO',
      description: 'Former dermatologist with 15 years of experience in skincare research and natural ingredient development.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Korean%20woman%20CEO%20in%20elegant%20business%20attire%2C%20confident%20smile%2C%20natural%20beauty%2C%20minimalist%20background%2C%20professional%20portrait%20lighting%2C%20sophisticated%20appearance%2C%20natural%20makeup%2C%20modern%20corporate%20style&width=400&height=500&seq=team-1&orientation=portrait'
    },
    {
      name: 'James Park',
      role: 'Head of Product Development',
      description: 'Biochemist specializing in natural ingredient extraction and formulation with over 12 years in the beauty industry.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Korean%20man%20scientist%20in%20lab%20coat%2C%20friendly%20expression%2C%20natural%20lighting%2C%20clean%20modern%20laboratory%20background%2C%20professional%20portrait%2C%20confident%20demeanor%2C%20skincare%20research%20environment&width=400&height=500&seq=team-2&orientation=portrait'
    },
    {
      name: 'Emily Chen',
      role: 'Sustainability Director',
      description: 'Environmental scientist dedicated to ensuring our practices protect the planet while delivering exceptional products.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Asian%20woman%20environmental%20scientist%2C%20warm%20smile%2C%20natural%20beauty%2C%20sustainable%20background%20with%20plants%2C%20eco-friendly%20atmosphere%2C%20professional%20portrait%2C%20modern%20office%20environment&width=400&height=500&seq=team-3&orientation=portrait'
    }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-stone-800 mb-6">Meet Our Team</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            The passionate individuals behind our mission to bring you the finest natural skincare products.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {team.map((member, index) => (
            <div key={index} className="text-center group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent"></div>
              </div>
              <h3 className="text-xl font-medium text-stone-800 mb-2">{member.name}</h3>
              <div className="text-stone-600 font-medium mb-4">{member.role}</div>
              <p className="text-stone-600 leading-relaxed">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
