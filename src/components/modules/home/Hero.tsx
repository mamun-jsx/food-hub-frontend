import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
          alt="Delicious food"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl px-4">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Tasty Food That Reduces Your Hunger Instantly
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-200">
          Discover delicious meals crafted with fresh ingredients and
          unforgettable flavors. At FoodHub, we bring happiness to your table
          with every bite.
        </p>

        <Link
          href="/product"
          className="inline-block mt-8 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-lg font-semibold transition duration-300"
        >
          View All
        </Link>
      </div>
    </section>
  );
}
