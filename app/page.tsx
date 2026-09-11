// import { redirect } from "next/navigation";

// export default function Home() {
//   redirect("/dashboard");
// }

import { Navbar } from "@/components/landing/Navbar";
import { TrustSection } from "@/components/landing/TrustSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { PricingSection } from "@/components/landing/PricingScetion";
import { HowItWorks } from "@/components/landing/HowItWorksSection";
import { FeaturesSection } from "@/components/landing/FeatursSection";
import { Hero } from "@/components/landing/HeroSection";

export default function Home() {
  return (
    <main className="bg-paper">
      <Navbar />

      <Hero />

      <TrustSection />

      <ProblemSection />

      <SolutionSection />

      <FeaturesSection />

      <ProductShowcase />

      <HowItWorks />

      <PricingSection />

      <Testimonials />

      <CTASection />

      <Footer />
    </main>
  );
}