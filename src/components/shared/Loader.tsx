import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        {/* Spinning ring */}
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        {/* Inner pulsing circle */}
        <div className="absolute inset-4 bg-primary/40 rounded-full animate-pulse"></div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight">Preparing Deliciousness</h3>
        <p className="text-sm text-gray-500 animate-pulse">Just a moment...</p>
      </div>
    </div>
  );
};

export default Loader;
