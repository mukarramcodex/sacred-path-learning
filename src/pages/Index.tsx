import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { CoursesSection } from "@/components/home/CoursesSection";
import { TeachersSection } from "@/components/home/TeachersSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <CoursesSection />
      <WhyChooseUsSection />
      <TeachersSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <NewsletterSection />
    </Layout>
  );
};

export default Index;
