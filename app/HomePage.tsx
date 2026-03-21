"use client";

import Header from "../components/Header";
import HeroCarousel from "../components/HeroCarousel";
import CandleSection from "../components/CandleSection";
import BestsellersSection from "../components/BestsellersSection";
import BrandStorySection from "../components/BrandStorySection";
import TestimonialsSection from "../components/TestimonialsSection";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroCarousel />
        <BrandStorySection />
        <CandleSection />
        <BestsellersSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
