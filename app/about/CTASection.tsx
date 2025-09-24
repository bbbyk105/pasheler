'use client';

import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-stone-800 to-stone-900 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Luxurious%20natural%20skincare%20products%20arranged%20elegantly%20on%20marble%20surface%20with%20soft%20golden%20lighting%2C%20spa-like%20atmosphere%2C%20Korean%20beauty%20products%2C%20serums%20and%20creams%2C%20minimalist%20aesthetic%2C%20warm%20ambient%20glow%2C%20premium%20cosmetics%20display%2C%20clean%20white%20background%20with%20subtle%20textures&width=1400&height=600&seq=cta-bg-1&orientation=landscape"
          alt="Skincare products"
          className="w-full h-full object-cover object-top opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-800/90 to-stone-900/90"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-serif text-white leading-tight">
              Ready to Transform <br />
              Your Skincare Routine?
            </h2>
            <p className="text-xl text-stone-200 max-w-2xl mx-auto leading-relaxed">
              Discover our complete collection of natural, Korean-inspired skincare products 
              crafted with the finest organic ingredients.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/catalog"
              className="px-10 py-4 bg-white text-stone-900 text-sm font-medium hover:bg-stone-100 transition-colors whitespace-nowrap cursor-pointer inline-block"
            >
              SHOP ALL PRODUCTS
            </Link>
            <Link 
              href="/contact"
              className="px-10 py-4 border-2 border-white text-white text-sm font-medium hover:bg-white hover:text-stone-900 transition-colors whitespace-nowrap cursor-pointer inline-block"
            >
              GET SKINCARE ADVICE
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-stone-700">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 flex items-center justify-center text-white mx-auto mb-4 bg-stone-700 rounded-full">
                <i className="ri-truck-line text-xl"></i>
              </div>
              <h3 className="text-white font-medium">Free Shipping</h3>
              <p className="text-sm text-stone-300">On orders over $75</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 flex items-center justify-center text-white mx-auto mb-4 bg-stone-700 rounded-full">
                <i className="ri-shield-check-line text-xl"></i>
              </div>
              <h3 className="text-white font-medium">30-Day Guarantee</h3>
              <p className="text-sm text-stone-300">Money back if not satisfied</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 flex items-center justify-center text-white mx-auto mb-4 bg-stone-700 rounded-full">
                <i className="ri-customer-service-2-line text-xl"></i>
              </div>
              <h3 className="text-white font-medium">Expert Support</h3>
              <p className="text-sm text-stone-300">Skincare consultation available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}