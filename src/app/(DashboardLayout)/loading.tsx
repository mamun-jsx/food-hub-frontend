import Loader from "@/components/shared/Loader";

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-80px)] w-full items-center justify-center bg-[#FFFCF7]">
      <Loader />
    </div>
  );
}
