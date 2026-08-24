import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">404</h1>
      <p className="text-neutral-400 text-base sm:text-lg mb-8 max-w-md">
        This page could not be found.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
