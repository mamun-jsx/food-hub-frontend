import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>

      <p className="mt-4 text-lg text-gray-600">
        This page could not be found.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-black transition"
      >
        Go to Home
      </Link>
    </div>
  );
}
