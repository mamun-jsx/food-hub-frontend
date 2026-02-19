import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const products = [
  {
    id: 1,
    title: "Cheese Burger",
    description:
      "Juicy grilled beef burger with melted cheese and fresh veggies.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    badge: "Popular",
  },
  {
    id: 2,
    title: "Italian Pizza",
    description: "Authentic Italian pizza topped with mozzarella and basil.",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXRhbGlhbiUyMHBpenphfGVufDB8fDB8fHww",
    badge: "Best Seller",
  },
  {
    id: 3,
    title: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with tender spicy chicken.",
    image:
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q2hpY2tlbiUyMEJpcnlhbml8ZW58MHx8MHx8fDA%3D",
    badge: "Trending",
  },
  {
    id: 4,
    title: "Grilled Steak",
    description: "Perfectly grilled steak served with garlic butter sauce.",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
    badge: "Chef's Choice",
  },
  {
    id: 5,
    title: "Fresh Salad Bowl",
    description: "Healthy mixed greens with avocado and lemon dressing.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
    badge: "Healthy",
  },
  {
    id: 6,
    title: "Chocolate Dessert",
    description: "Rich and creamy chocolate delight for sweet lovers.",
    image:
      "https://images.unsplash.com/photo-1709195902163-7eee13e78970?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q2hvY29sYXRlJTIwRGVzc2VydHxlbnwwfHwwfHx8MA%3D%3D",
    badge: "New",
  },
];

export default function FeaturesProducts() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Delicious Products
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore our carefully crafted meals made with fresh ingredients and
            unforgettable flavors.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="relative w-full overflow-hidden pt-0 hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <div className="relative">
                <div className="absolute inset-0 z-10 bg-black/40" />
                <img
                  src={product.image}
                  alt={product.title}
                  className="aspect-video w-full object-cover"
                />
              </div>

              <CardHeader className="relative z-20">
                <CardAction>
                  <Badge variant="secondary">{product.badge}</Badge>
                </CardAction>
                <CardTitle className="text-lg">{product.title}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>

              <CardFooter>
                {/* <Button className="w-full bg-green-600 hover:bg-green-700">
                  
                </Button> */}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
