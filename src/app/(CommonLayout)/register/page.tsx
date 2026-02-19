import React from "react";
import { RegisterForm } from "@/components/modules/Form/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
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
