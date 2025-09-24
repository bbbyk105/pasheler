"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white">
      <div className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Brand */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-['Pacifico'] text-white mb-2">
                  Pachelar Room
                </h3>
                <p className="text-sm text-stone-400 leading-relaxed">
                  Natural skincare crafted from the finest organic ingredients.
                  Discover the essence of pure beauty.
                </p>
              </div>

              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/pachelar_room/"
                  className="w-8 h-8 flex items-center justify-center bg-stone-800 hover:bg-stone-700 rounded-full transition-colors cursor-pointer"
                  target="blank"
                >
                  <i className="ri-instagram-line text-sm"></i>
                </a>
                <a
                  href="https://x.com/kanabo_292929?t=evTOYumN6nB379phr_tp_Q"
                  className="w-8 h-8 flex items-center justify-center bg-stone-800 hover:bg-stone-700 rounded-full transition-colors cursor-pointer"
                  target="blank"
                >
                  <i className="ri-twitter-x-line text-sm"></i>
                </a>
              </div>
            </div>

            {/* Shop */}
            <div className="space-y-4">
              <h4 className="font-medium text-white">Shop</h4>
              <nav className="space-y-2">
                <Link
                  href="/catalog"
                  className="block text-sm text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  All Products
                </Link>
                <Link
                  href="/cart"
                  className="block text-sm text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  Shopping Cart
                </Link>
                <Link
                  href="/wishlist"
                  className="block text-sm text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  Wishlist
                </Link>
                <Link
                  href="/contact"
                  className="block text-sm text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us
                </Link>
              </nav>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-stone-800">
            <div className="flex flex-col md:flex-row justify-center items-center">
              <p className="text-sm text-stone-400">
                © 2025 Pachelar Room All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
