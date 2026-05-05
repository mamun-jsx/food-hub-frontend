import React from "react";
import { RegisterForm } from "@/components/modules/Form/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFCF7] px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full -ml-32 -mb-32 blur-3xl" />
      {/* Card Container */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-10">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Create Your Account
        </h1>
        {/* Subtitle */}
        <p className="text-center text-gray-600 mb-8">
          Join FoodHub and start ordering delicious meals in just a few steps.
        </p>

        {/* Register Form */}
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
