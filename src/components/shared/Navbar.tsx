"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { logoutUser } from "../../../service/auth/authService";
import { useRouter } from "next/navigation";
import LoadingBtn from "./LoadingBtn";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/context/CartContext";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: session, isPending } = useAuth();
  const { cartItems } = useCart();

  const logOutFnc = async () => {
    await logoutUser();
    router.push("/login");
    router.refresh();
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value === "all") {
      router.push("/meals");
    } else {
      router.push(`/meals?category=${value}`);
    }
  };

  const menu = [
    { title: "Home", url: "/" },
    { title: "Providers", url: "/provider" },
    { title: "Meals", url: "/meals" },
    { title: "About", url: "/about" },
    { title: "Contact", url: "/contact" },
  ];

  return (
    <section className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="container mx-auto px-4 py-4">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary tracking-tighter">
                FoodHub
              </span>
            </Link>

            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList className="gap-2">
                  {menu.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink
                        asChild
                        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                      >
                        <Link href={item.url}>{item.title}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>

              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="border px-3 py-2 rounded-lg ml-4 text-sm"
              >
                <option value="all">All</option>
                <option value="pasta">Pasta</option>
                <option value="pizza">Pizza</option>
                <option value="burger">Burger</option>
                <option value="chawmin">Chawmin</option>
                <option value="local food">Local Food</option>
                <option value="biryani">Biryani</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link href="/dashboard/view-cart" className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="relative rounded-full">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Auth */}
            {isPending ? (
              <LoadingBtn />
            ) : session ? (
              <div className="flex items-center gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button onClick={logOutFnc} size="sm">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/register">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary tracking-tighter">
                FoodHub
              </span>
            </Link>

            <div className="flex items-center gap-4">
              {/* Mobile Cart */}
              <Link href="/dashboard/view-cart">
                <Button variant="outline" size="icon" className="relative rounded-full h-9 w-9">
                  <ShoppingCart className="h-4 w-4" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                      {cartItems.length}
                    </span>
                  )}
                </Button>
              </Link>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary tracking-tighter">
                          FoodHub
                        </span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 p-4 mt-4">
                    <div className="flex flex-col gap-4">
                      {menu.map((item) => (
                        <Link
                          key={item.title}
                          href={item.url}
                          className="text-md font-semibold hover:text-primary transition-colors"
                        >
                          {item.title}
                        </Link>
                      ))}
                      
                      <select
                        value={selectedCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="border px-3 py-2 rounded-lg w-full mt-2"
                      >
                        <option value="all">All</option>
                        <option value="pasta">Pasta</option>
                        <option value="pizza">Pizza</option>
                        <option value="burger">Burger</option>
                        <option value="chawmin">Chawmin</option>
                        <option value="local food">Local Food</option>
                        <option value="biryani">Biryani</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-3 mt-4 pt-4 border-t">
                      {isPending ? (
                        <LoadingBtn />
                      ) : session ? (
                        <>
                          <Button asChild variant="outline" className="w-full justify-start">
                            <Link href="/dashboard">Dashboard</Link>
                          </Button>
                          <Button onClick={logOutFnc} className="w-full justify-start">
                            Logout
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button asChild variant="outline" className="w-full justify-start">
                            <Link href="/login">Login</Link>
                          </Button>
                          <Button asChild className="w-full justify-start">
                            <Link href="/register">Sign up</Link>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}