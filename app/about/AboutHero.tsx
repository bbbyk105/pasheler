
'use client';

export default function AboutHero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://readdy.ai/api/search-image?query=Elegant%20Korean%20beauty%20spa%20environment%20with%20natural%20elements%2C%20soft%20lighting%2C%20serene%20atmosphere%2C%20minimalist%20design%2C%20natural%20textures%2C%20botanical%20elements%2C%20zen%20aesthetic%2C%20peaceful%20ambiance%2C%20organic%20materials%2C%20subtle%20earth%20tones%2C%20sophisticated%20interior%20design&width=1920&height=1080&seq=about-hero&orientation=landscape')`
      }}
    >
      <div className="w-full">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h1 className="text-5xl lg:text-7xl font-serif mb-6 leading-tight">
            Our Story
          </h1>
          <p className="text-xl lg:text-2xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Discover the journey behind our commitment to natural beauty and sustainable skincare
          </p>
          <div className="w-20 h-0.5 bg-white mx-auto"></div>
        </div>
      </div>
    </section>
  );
}
