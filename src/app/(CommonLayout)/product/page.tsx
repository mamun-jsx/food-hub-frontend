import { ProductCard } from "@/components/modules/ProductsComponent/ProductCard";
import { fetchMeal } from "../../../../service/product";
import { IMeal } from "@/types/meal.Type"; // Ensure filename matches exactly

export default async function Page() {
  const data = await fetchMeal();
  const mealLists: IMeal[] = data?.meal || [];
 
  console.log("Products found:", mealLists.length);
  if (mealLists.length === 0) {
    return <h3 className="text-center my-10 ">No Meal Published Yet</h3>;
  }
  return (
    <div className="py-10 grid grid-cols-1 items-center md:grid-cols-3 gap-4 w-10/12 mx-auto">
      {mealLists.length > 0 ? (
        mealLists.map((item: IMeal) => (
          <div key={item.id}>
            <ProductCard payload={item} />
          </div>
        ))
      ) : (
        <p className="text-center col-span-3">No meals found.</p>
      )}
    </div>
  );
}
