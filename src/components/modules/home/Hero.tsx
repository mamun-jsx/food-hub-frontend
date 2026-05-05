"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

// Import local assets
import heroBanner from "@/assets/heroSectionBanner1.png"; // Salad
import dessertImg from "@/assets/Icecream.png";
import drinksImg from "@/assets/drinks.png";
import biriyaniImg from "@/assets/biriyani.png";
import localFoodImg from "@/assets/localFood.png";

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(heroBanner);

  const categories = [
    {
      id: "salad",
      image: heroBanner,
      icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUO46b0Z5N5PTL0zs6zvt0fMkzayU5LQvxhZDo870ZIEUFQ1LzgEuWGOlIdK_5iaF6n19uonML0wbWgF7MyWjnt7bydO8E5Ad-1iZsIMx2o4oHAt5l9pZ0ruBi-raCikdEb6UPjX-CeYOqrfMc15p00Mk12V7qt-s0ZVr2mXoi-TKjGCySrBAw6t-l_bv4Mg8QMTK9tKqMhvvLl6cFfZZ5WZiJai-_goRSy3XkkeZRoFzJNxKaVfB2COc1UWrp8fUx4ZkT1DBJ_EM",
      bgColor: "bg-gray-100",
    },
    {
      id: "dessert",
      image: dessertImg,
      icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuAay0bzDR6Fgs-hleEQcjAgSuY9QW0So-9AMKzi1D869S4z3BXVQmljVlwDbVC88du_Q9RzgfKco4aHU2GxLHFMdhLxUH1fRGXUqSxqIjK2OC4G8f3ApPRX7RFpP1PFBqQcI1kRKb5GrZXCXBjVS-UxOViHT-c-yPlNWL_dADefT5n4LUvytTofp139YV6BZ0AIVS2HVxMYN58Z_MTVNtPlEF4m-G653L9Pen9EOOLBiOW919fKwHI2dVZ0yWDTUsCxfobNhdOEz2U",
      bgColor: "bg-primary",
    },
    {
      id: "drinks",
      image: drinksImg,
      icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuDABETd7Vtok7JwiKHjlxOX-6rlN7A-Zjze-OkNfm49zGCVBhAKPQjL4FOv0OOmxRCjtSFCEv8SQMZtuIPT7BDZ2Ezs9SgwPSakxgMBbD8arfN4xfu_h7ZGiSKNJa5ARmlb4oVQfE9Lw4ujjM3_U06GAsgFf1VIDbfQZ-CuQApXGU7EiswA1PROdeV5v0LrNFfEfr7-ChR4S8LtnQwzPGcKfCsqE7Qf3QwrhckQerzbb71SxCJ6kHobGo_dTu2VVIrE5TDVpXkAICM",
      bgColor: "bg-black",
    },
    {
      id: "biriyani",
      image: biriyaniImg,
      icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuBS6bbim_jTPedG04KxL17137fg5I0_rmceP4MPDBqyFpuOucdS04RLB4IpwAiwLkQxqQusOsskwlWyJ2KmvGpf3Fl3stEhmxmVKX_ZDvHw95PV4ZZdZZkgK_garY8__EngT0oZYXSVYheDQZFv4Uc1r_OnuvLa4dmkYqUu3okWw8H2heVxrzZGOtwmcwvZPHx4pOtAL8QPZn3CSqMxqzXOCodl-O1VBlhrqwr5UugTQl5ZRkG_GuMfsINdlJd8q8rWvhPo8_8FKOg",
      bgColor: "bg-gray-100",
    },
    {
      id: "local",
      image: localFoodImg,
      icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuClDp0Qe-z-7n9wffAwmenQ0pxCt2uBx4zGMAqzLBqv8WJVzlFr0QzdgUamG4Y8kgHarwUrHLrWTFMwiL8Noy91erY6vF8Whcq_Vh-fnVAFIPju11CRetA2ebVjsiImc8X4kbF-6xXnRa4wJuGExxvxFtZ_SwHEl6V07xTI6gEZgHOn-ofQIZQ3SDrdrcGV2XdN_rceeh6QC3IhCskM5ofwcKSHPwbWiUccbhNhyrITmOQ5Ke6BThPomslVA-aGCROs-3aXKf2orGs",
      bgColor: "bg-orange-500",
    },
  ];

  return (
    <main className="relative min-h-[70vh] flex items-center px-6 md:px-12 lg:px-24 py-12 overflow-hidden">
      {/* Decorative background patterns */}
      <div className="absolute top-20 left-10 opacity-20 pointer-events-none">
        <svg
          className="text-gray-400"
          fill="currentColor"
          height="100"
          viewBox="0 0 100 100"
          width="100"
        >
          <circle cx="10" cy="10" r="2"></circle>{" "}
          <circle cx="30" cy="10" r="2"></circle>{" "}
          <circle cx="50" cy="10" r="2"></circle>
          <circle cx="20" cy="30" r="2"></circle>{" "}
          <circle cx="40" cy="30" r="2"></circle>{" "}
          <circle cx="60" cy="30" r="2"></circle>
          <circle cx="10" cy="50" r="2"></circle>{" "}
          <circle cx="30" cy="50" r="2"></circle>{" "}
          <circle cx="50" cy="50" r="2"></circle>
        </svg>
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 pointer-events-none">
        <svg
          className="text-gray-400"
          fill="currentColor"
          height="120"
          viewBox="0 0 120 120"
          width="120"
        >
          <circle cx="10" cy="10" r="2"></circle>{" "}
          <circle cx="30" cy="10" r="2"></circle>{" "}
          <circle cx="50" cy="10" r="2"></circle>
          <circle cx="20" cy="30" r="2"></circle>{" "}
          <circle cx="40" cy="30" r="2"></circle>{" "}
          <circle cx="60" cy="30" r="2"></circle>
          <circle cx="70" cy="10" r="2"></circle>{" "}
          <circle cx="90" cy="30" r="2"></circle>
        </svg>
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* BEGIN: ContentLeft */}
        <section className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] mb-8">
            We Serve The Test
            <br />
            You Love 😍
          </h1>
          <p className="text-gray-600 text-lg md:text-xl mb-10 leading-relaxed max-w-lg">
            Discover a unique dining experience where passion meets flavor. We
            bring you the finest ingredients crafted into unforgettable meals
            that celebrate the art of food.
          </p>
          <div className="flex flex-wrap gap-4">
            {/* Primary CTA Button */}
            <Link href="/meals">
              <Button size="lg" className="rounded-full px-8 py-7 text-lg bg-primary hover:bg-primary-hover text-white border-none shadow-lg hover:shadow-primary/25 transition-all duration-300">
                Explore Menu
              </Button>
            </Link>

            {/* About Us Button */}
            <Link href="/about">
              <Button
                variant="outline"
                className="flex cursor-pointer items-center gap-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold py-7 px-10 rounded-full shadow-sm hover:shadow-md transition-all text-lg"
              >
                About Us
              </Button>
            </Link>
          </div>
        </section>
        {/* END: ContentLeft */}

        {/* BEGIN: ContentRight */}
        <section className="relative flex justify-center items-center">
          {/* Circular Background Decoration */}
          <div className="absolute inset-0 flex justify-center items-center -z-10">
            <div className="w-[450px] h-[450px] md:w-[600px] md:h-[600px] border border-primary/20 rounded-full absolute animate-pulse"></div>
            <div className="w-[350px] h-[350px] md:w-[500px] md:h-[500px] border border-primary/10 rounded-full absolute"></div>
          </div>

          {/* Main Plate Image */}
          <div className="relative z-20 transition-transform duration-700 hover:rotate-6 flex items-center justify-center w-full max-w-[500px] md:max-w-[600px] aspect-square">
            <Image
              src={currentImage}
              alt="Delicious Food Plate"
              className="w-full h-full object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* BEGIN: FloatingMenuCategories (Icons Only) */}
          <div className="absolute right-0 lg:-right-4 space-y-4 z-30">
            {categories.map((cat, index) => (
              <div
                key={index}
                onClick={() => setCurrentImage(cat.image)}
                className={`flex items-center justify-center bg-white p-2 rounded-full shadow-lg border border-gray-50 transition-all cursor-pointer w-14 h-14 hover:scale-110 active:scale-95 ${
                  index % 2 === 1 ? "translate-x-4 lg:translate-x-8" : ""
                } ${index === 2 ? "translate-x-8 lg:translate-x-12" : ""}`}
              >
                <div
                  className={`w-10 h-10 rounded-full ${cat.bgColor} flex items-center justify-center overflow-hidden`}
                >
                  <img
                    alt="Category Icon"
                    className="w-full h-full object-cover"
                    src={cat.icon}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* END: FloatingMenuCategories */}
        </section>
        {/* END: ContentRight */}
      </div>
    </main>
  );
}
