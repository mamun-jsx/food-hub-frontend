"use client";
import { LoginForm } from "@/components/modules/Form/LoginForm";

const Page = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Login to FoodHub
        </h1>

        {/* Login Form */}
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
