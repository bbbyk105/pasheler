import Header from "../components/Header";
import HeroCarousel from "../components/HeroCarousel";
import CandleSection from "../components/CandleSection";
import BestsellersSection from "../components/BestsellersSection";
import BrandStorySection from "../components/BrandStorySection";
import TestimonialsSection from "../components/TestimonialsSection";
import Footer from "../components/Footer";
import HashScrollHandler from "@/components/hinoki/HashScrollHandler";
import ProductIntroSection from "@/components/hinoki/ProductIntroSection";
import HinokiStorySection from "@/components/hinoki/HinokiStorySection";
import HowToUseSection from "@/components/hinoki/HowToUseSection";
import BlogSection from "@/components/hinoki/BlogSection";
import { hinokiFontVariables } from "@/lib/hinoki-fonts";
import { HINOKI_SECTION_ID } from "@/lib/site";
import type { BlogCardPost } from "@/lib/blog/types";

// 富士ヒノキの章とブログ欄は、旧 hinokifragrance.com の LP の欄をデザインごと使う
export default function HomePage({ blogPosts }: { blogPosts: BlogCardPost[] }) {
  return (
    <div className={`min-h-screen bg-white ${hinokiFontVariables}`}>
      <HashScrollHandler />
      <Header />
      <main>
        <HeroCarousel />
        <BrandStorySection />
        <div
          id={HINOKI_SECTION_ID}
          className="hinoki-scope relative text-white"
        >
          <ProductIntroSection />
          <HinokiStorySection />
          <HowToUseSection />
        </div>
        <CandleSection />
        <BestsellersSection />
        <div className="hinoki-scope relative text-white">
          <BlogSection posts={blogPosts} />
        </div>
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
