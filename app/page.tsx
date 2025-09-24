"use client";

import Header from "../components/Header";
import HeroCarousel from "../components/HeroCarousel";
import BestsellersSection from "../components/BestsellersSection";
import BrandStorySection from "../components/BrandStorySection";
import TestimonialsSection from "../components/TestimonialsSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroCarousel />
        <BestsellersSection />
        <BrandStorySection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
