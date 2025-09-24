
'use client';

import { useState } from 'react';
import IngredientsModal from '../../components/IngredientsModal';

export default function BrandStoryContent() {
  const [showIngredientsModal, setShowIngredientsModal] = useState(false);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="text-sm text-stone-600 italic">
                I'm from - a brand of skin-care cosmetics created from the best ingredients of Korean nature.
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-serif text-stone-800 leading-tight">
                Pure Nature, <br />
                Pure Beauty
              </h2>
              
              <p className="text-lg text-stone-600 leading-relaxed">
                We believe that nature holds the most powerful secrets to healthy, radiant skin. 
                Our carefully curated collection harnesses the finest organic ingredients, 
                sustainably sourced and thoughtfully formulated to nurture your natural beauty.
              </p>
              
              <p className="text-stone-600 leading-relaxed">
                Each product in our range is a testament to our commitment to purity, 
                effectiveness, and environmental responsibility. From our signature serums 
                to our nourishing treatments, every formula is designed to work in harmony 
                with your skin's natural processes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setShowIngredientsModal(true)}
                className="px-8 py-3 bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                OUR INGREDIENTS
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <img
              src="https://readdy.ai/api/search-image?query=Natural%20Korean%20skincare%20ingredients%20setup%20with%20ginseng%2C%20rice%20water%2C%20green%20tea%2C%20volcanic%20ash%2C%20natural%20botanical%20elements%2C%20minimalist%20composition%2C%20soft%20natural%20lighting%2C%20organic%20textures%2C%20spa%20atmosphere%2C%20clean%20aesthetic%2C%20earth%20tones&width=800&height=1000&seq=brand-story-1&orientation=portrait"
              alt="Natural skincare ingredients"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent"></div>
          </div>
        </div>

        {/* Detailed Story Section */}
        <div className="space-y-16">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h3 className="text-3xl font-serif text-stone-800">The Beginning</h3>
            <p className="text-lg text-stone-600 leading-relaxed">
              Founded in the heart of Seoul by skincare enthusiasts who believed in the power of Korean traditional beauty secrets, 
              our brand emerged from a simple yet profound philosophy: nature provides everything our skin needs to thrive.
            </p>
            <p className="text-stone-600 leading-relaxed">
              Our founders spent years researching ancient Korean beauty rituals, working closely with local farmers and 
              herbalists to understand the true potential of ingredients like ginseng, rice water, and volcanic ash. 
              This deep respect for tradition, combined with modern scientific innovation, forms the foundation of every product we create.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-stone-50 rounded-xl">
              <div className="text-3xl font-serif text-stone-800 mb-2">2018</div>
              <div className="text-sm text-stone-600">Founded</div>
            </div>
            <div className="text-center p-6 bg-stone-50 rounded-xl">
              <div className="text-3xl font-serif text-stone-800 mb-2">50+</div>
              <div className="text-sm text-stone-600">Natural Ingredients</div>
            </div>
            <div className="text-center p-6 bg-stone-50 rounded-xl">
              <div className="text-3xl font-serif text-stone-800 mb-2">100K+</div>
              <div className="text-sm text-stone-600">Happy Customers</div>
            </div>
            <div className="text-center p-6 bg-stone-50 rounded-xl">
              <div className="text-3xl font-serif text-stone-800 mb-2">15</div>
              <div className="text-sm text-stone-600">Awards Won</div>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredients Modal */}
      <IngredientsModal 
        isOpen={showIngredientsModal} 
        onClose={() => setShowIngredientsModal(false)} 
      />
    </section>
  );
}
