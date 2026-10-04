import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-ink-900 to-ink-800 px-4 text-center">
      <div>
        <p className="text-brand-500 font-black text-7xl sm:text-8xl mb-4">
          404
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Page not found
        </h1>
        <p className="text-slate-400 mb-8">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link
          href="/"
          className="inline-flex px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-ink-900 rounded-lg font-bold hover:shadow-lg transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
