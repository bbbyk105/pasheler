'use client';

import { useEffect } from 'react';

interface IngredientsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IngredientsModal({ isOpen, onClose }: IngredientsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const ingredients = [
    {
      name: 'Ginseng Root Extract',
      origin: 'Korean Mountains',
      benefits: 'Revitalizes skin, improves elasticity, and provides anti-aging properties',
      icon: 'ri-plant-line'
    },
    {
      name: 'Rice Bran Water',
      origin: 'Organic Korean Farms',
      benefits: 'Deeply hydrates, brightens complexion, and provides essential vitamins',
      icon: 'ri-drop-line'
    },
    {
      name: 'Green Tea Extract',
      origin: 'Jeju Island',
      benefits: 'Antioxidant protection, soothes inflammation, and purifies pores',
      icon: 'ri-leaf-line'
    },
    {
      name: 'Bamboo Sap',
      origin: 'Korean Bamboo Forests',
      benefits: 'Natural moisturizing, improves skin texture, and provides minerals',
      icon: 'ri-seedling-line'
    },
    {
      name: 'Honey Extract',
      origin: 'Wild Korean Honey',
      benefits: 'Natural antibacterial, deeply nourishes, and promotes healing',
      icon: 'ri-heart-pulse-line'
    },
    {
      name: 'Volcanic Ash',
      origin: 'Jeju Volcanic Soil',
      benefits: 'Deep cleansing, removes impurities, and minimizes pores',
      icon: 'ri-earth-line'
    }
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-8 border-b border-stone-200">
            <div>
              <h2 className="text-3xl font-serif text-stone-800 mb-2">Our Premium Ingredients</h2>
              <p className="text-stone-600">Discover the natural power behind our skincare</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="grid md:grid-cols-2 gap-6">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="bg-stone-50 p-6 rounded-xl">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-stone-800 text-white rounded-full flex-shrink-0">
                      <i className={`${ingredient.icon} text-lg`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-stone-800 mb-1">{ingredient.name}</h3>
                      <p className="text-sm text-stone-500 mb-3">Origin: {ingredient.origin}</p>
                    </div>
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed">{ingredient.benefits}</p>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-6 bg-gradient-to-r from-stone-800 to-stone-700 rounded-xl text-white">
              <h3 className="text-xl font-serif mb-3">Our Promise</h3>
              <p className="text-stone-200 mb-4">
                Every ingredient is carefully selected from trusted Korean sources, 
                ensuring the highest quality and purity. Our sustainable harvesting 
                practices protect the environment while delivering exceptional results.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <i className="ri-check-line text-green-400"></i>
                  <span>100% Natural</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-check-line text-green-400"></i>
                  <span>Sustainably Sourced</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-check-line text-green-400"></i>
                  <span>Cruelty Free</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}