import AboutHero from './AboutHero';
import BrandStoryContent from './BrandStoryContent';
import ValuesSection from './ValuesSection';
import CTASection from './CTASection';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <BrandStoryContent />
        <ValuesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}