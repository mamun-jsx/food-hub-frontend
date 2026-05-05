import MealCard from "@/components/shared/MealCard";
import { IMeal } from "@/types/meal.Type";

export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  // ✅ REQUIRED in Next 15+
  const params = await searchParams;

  const category = params.category || "";
  const search = params.search || "";

  const query = new URLSearchParams();

  if (category) query.set("category", category);
  if (search) query.set("search", search);

  console.log(query.toString(), "✅ query string");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/meals?${query.toString()}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return <h3 className="text-center my-10">Something went wrong</h3>;
  }

  const data = await res.json();
  const mealLists: IMeal[] = data?.meal || [];

  if (mealLists.length === 0) {
    return <h3 className="text-center my-10">No Meal Found</h3>;
  }

  return (
    <div className="py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-11/12 max-w-7xl mx-auto">
      {mealLists.map((item: IMeal) => (
        <MealCard key={item.id} item={item} />
      ))}
    </div>
  );
}
