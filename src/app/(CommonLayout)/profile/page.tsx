"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

const Profile = () => {
  const userAvater =
    "https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?w=360";
  const { data: session, isPending } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return <div className="p-10"><Skeleton className="h-40 w-full" /></div>;
  }

  if (!session) {
    return null;
  }
  const { name, email, image, id, role } = session?.user;

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Profile Image */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border">
            <img
              src={image || userAvater}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              {name || "User"}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">{email}</p>

            <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
              Role: {role}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t" />

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500">User ID</p>
            <p className="font-medium break-all">{id}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500">Account Type</p>
            <p className="font-medium">
              {role}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
