import { HeroSection } from '@/interfaces/Home/HeroSection';
import { FeaturesSection } from '@/interfaces/Home/FeaturesSection';
import { TalentPreview } from '@/interfaces/Home/TalentPreview'
import { mockTalents } from '@/infrastructure/api/mockTalents';

export default function HomePage() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Grid */}
      <FeaturesSection />

      {/* Featured Talent */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Talent</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockTalents.slice(0, 3).map((talent) => (
              <TalentPreview key={talent.address} talent={talent} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}