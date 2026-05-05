import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IMeal } from "@/types/meal.Type";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"; 
interface productCardProps {
  payload: IMeal;
}

export function ProductCard({ payload }: productCardProps) {
  const { id, name, description, price, image, category, reviews } = payload;

  return (
    <Card className="group overflow-hidden rounded-xl border-none shadow-lg transition-all hover:shadow-2xl">
      {/* 1. Image Header - Moves outside CardHeader for full-bleed look */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Floating Category Badge */}
        <Badge className="absolute left-3 top-3 bg-white/90 text-black hover:bg-white">
          {category}
        </Badge>
      </div>

      <CardHeader className="space-y-1 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-1 text-xl font-bold">
            {name}
          </CardTitle>
          <div className="flex items-center gap-1 text-sm font-medium text-amber-500">
            <p>Reviews : </p>
            <span>({reviews.length})</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <CardDescription className="line-clamp-2 h-10 text-sm">
          {description}
        </CardDescription>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-2xl font-bold text-primary">{price}</span>
          <span className="text-sm font-medium text-muted-foreground">TK</span>
        </div>
      </CardContent>

      <CardFooter className="border-t bg-slate-50/50 p-4">
        <Link
          href={`/meals/${id}`}
          className="w-full rounded-lg bg-slate-900 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
}
