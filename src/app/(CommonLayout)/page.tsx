import FAQSection from "@/components/modules/Home/FAQ";
import FeaturesProducts from "@/components/modules/Home/FeaturesProducts";
import Hero from "@/components/modules/Home/Hero";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <FeaturesProducts />
      <FAQSection />
    </div>
  );
}
