import AboutSection from "@/components/home/AboutSection";
import Banner from "@/components/home/Banner";
import CTASection from "@/components/home/CTASection";
import FAQSection from "@/components/home/FAQSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import SuccessMetrics from "@/components/home/SuccessMetrics";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <Banner />
      <AboutSection />
      <ServicesOverview />
      <WhyChooseUs />
      <SuccessMetrics />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </div>
  );
}
