import { HeroSection } from '@/interfaces/Home/HeroSection';
import { FeaturesSection } from '@/interfaces/Home/FeaturesSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
    </main>
  );
}