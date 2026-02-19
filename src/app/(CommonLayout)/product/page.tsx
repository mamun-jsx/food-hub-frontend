import { Button } from "@/components/ui/button";
import { getAllProduct } from "../../../../service/product";

export default async function Page() {
  const  data  = await getAllProduct();
  console.log(data);
  return (
    <div className="bg-green-200 py-10">
      profile page is here
      <div className=" bg-green-950">
        <Button>Click me please....</Button>
      </div>
    </div>
  );
}
