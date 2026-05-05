import Loader from "@/components/shared/Loader";
import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Loader />
    </div>
  );
}
