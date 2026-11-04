import Link from "next/link";

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] flex flex-col items-center justify-center px-6 text-center">
      <div className="inline-block px-3 py-1 rounded bg-accent/10 border border-accent/25 text-accent font-mono text-xs font-semibold uppercase tracking-wider mb-6">
        404 · Page Not Found
      </div>
      <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight mb-4">
        Resource Out Of Orbit.
      </h1>
      <p className="text-gray-400 text-base max-w-md mb-8 leading-relaxed">
        The page you are looking for has been moved, deprecated, or does not
        exist in the Endow Tech architecture.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-accent text-white text-sm font-bold uppercase tracking-wider hover:bg-accent-hover transition-colors shadow-lg shadow-accent/30"
      >
        Return to Homepage
      </Link>
    </div>
  );
}
