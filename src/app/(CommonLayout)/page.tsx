import FAQSection from "@/components/modules/Home/FAQ";
import FeaturesProducts from "@/components/modules/Home/FeaturesProducts";
import Hero from "@/components/modules/Home/Hero";
import Staff from "@/components/modules/Home/Staff";
import UserReview from "@/components/modules/Home/UserReview";
import DinnerPlan from "@/components/modules/Home/DinnerPlan";
import CategoryProducts from "@/components/modules/Home/CategoryProducts";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <FeaturesProducts />
      <Staff />
      <DinnerPlan />
      <CategoryProducts />
      <UserReview />
    </div>
  );
}
