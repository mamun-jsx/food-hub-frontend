import { ProductCard } from "@/components/modules/ProductsComponent/ProductCard";
import { IMeal } from "@/types/meal.Type";

export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  // ✅ FIX: await searchParams
  const params = await searchParams;

  const category = params.category || "";
  const search = params.search || "";

  const query = new URLSearchParams({
    category,
    search,
  });

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
    <div className="py-10 grid grid-cols-1 md:grid-cols-3 gap-4 w-10/12 mx-auto">
      {mealLists.map((item: IMeal) => (
        <div key={item.id}>
          <ProductCard payload={item} />
        </div>
      ))}
    </div>
  );
}
