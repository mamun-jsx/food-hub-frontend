import { getAllProduct } from "../../../../service/product";
import { ProductCard } from "@/components/modules/ProductsComponent/ProductCard";

export default async function Page() {
  const data = await getAllProduct();

  return (
    <div className="py-10 grid grid-cols-1 items-center md:grid-cols-3 gap-4 w-10/12 mx-auto">
      {data?.map((items) => {
        return (
          <div key={items?.id}>
            <ProductCard payload={items} />
          </div>
        );
      })}
    </div>
  );
}
