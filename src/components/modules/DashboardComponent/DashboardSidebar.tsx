"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import logo from "@/assets/food-hub.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Home, ShoppingCart, PlusCircle, LayoutGrid, ClipboardList, Users } from "lucide-react";

export default function DashboardSidebar() {
  const userData = useAuth();
  const userRole = userData?.data?.user?.role;

  const navItemsForAdmin = [
    { name: "Home", href: "/", icon: Home },
    { name: "Orders", href: "/dashboard/orders", icon: ClipboardList },
    { name: "Users", href: "/dashboard/users", icon: Users },
  ];

  const navItemsForProvider = [
    { name: "Home", href: "/", icon: Home },
    { name: "Orders", href: "/dashboard/orders", icon: ClipboardList },
    { name: "Add Products", href: "/dashboard/add-products", icon: PlusCircle },
    { name: "All Items", href: "/dashboard/meals", icon: LayoutGrid },
  ];

  const navItemsForUser = [
    { name: "Home", href: "/", icon: Home },
    { name: "Orders", href: "/dashboard/orders", icon: ClipboardList },
    { name: "View Cart", href: "/dashboard/view-cart", icon: ShoppingCart },
  ];

  const navItems =
    userRole?.toUpperCase() === "ADMIN"
      ? navItemsForAdmin
      : userRole?.toUpperCase() === "PROVIDER"
        ? navItemsForProvider
        : navItemsForUser;

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-100 bg-white">
      <SidebarHeader className="h-20 flex items-center px-6 border-b border-gray-50">
        <Link href="/" className="flex items-center">
          <Image 
            src={logo} 
            alt="FoodHub Logo" 
            width={120} 
            height={40} 
            className="w-auto logoImg h-10 md:h-12 object-contain" 
          />
        </Link>
      </SidebarHeader>
      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 px-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.name}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-primary/10 hover:text-primary active:scale-[0.98]"
                  >
                    <Link href={item.href}>
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium text-[15px]">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
