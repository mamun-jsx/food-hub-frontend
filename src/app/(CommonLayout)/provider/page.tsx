import { CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { fetchAllProvider } from "../../../../service/user-api-endpoint";

interface User {
  name: string;
  email: string;
  image?: string;
}

interface Provider {
  id: string;
  userId: string;
  restaurantName: string;
  description: string;
  address: string;
  phone: string;
  user: User;
}

const Providers = async () => {
  const allProviders = await fetchAllProvider();

  const userAvater =
    "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_incoming&w=740&q=80";
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        🍽️ All Food Providers
      </h1>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/*  */}
        {allProviders?.provider?.map((p: Provider) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 border border-gray-100"
          >
            {/* Restaurant Name */}
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {p.restaurantName}
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">
              {p.description}
            </p>

            {/* Divider */}
            <div className="border-t my-3"></div>
            {/* middle information part  */}
            <div className="flex w-11/12 mx-auto items-center justify-between mb-8">
              {/* Owner Info */}
              <div className="leftSideContent text-sm text-gray-600 ">
                <p className="font-medium text-xl">Name : {p.user.name}</p>
                <p className="text-md my-2 text-gray-400">ID: {p.id}</p>
                <p className="text-xs text-gray-400">{p.user.email}</p>

                {/* Address */}
                <p className="mt-3 text-sm text-gray-500">📍 {p.address}</p>
                {/* Phone */}
                <p className="mt-1 text-sm text-gray-500">📞 {p.phone}</p>
              </div>

              <div className="rightSideImage">
                {p.user?.image ? (
                  <Image
                    className="profileIcn rounded shadow"
                    src={p.user.image}
                    alt={p.user.name}
                    width={200}
                    height={200}
                  />
                ) : (
                  <Image
                    src={userAvater}
                    className="profileIcn rounded shadow"
                    alt={"notFound"}
                    width={200}
                    height={200}
                  />
                )}
              </div>
            </div>

            <CardFooter>
              <Link
                href={`/provider/${p.id}`}
                className="w-full rounded-lg bg-slate-900 py-2.5 text-center text-sm font-semibold hover:bg-green-600 text-white transition-colors "
              >
                View Menu
              </Link>
            </CardFooter>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Providers;
