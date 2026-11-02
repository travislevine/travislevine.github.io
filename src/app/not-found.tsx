import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-sm text-emerald-400">404</p>
      <h1 className="mt-2 text-3xl font-semibold text-white">Page not found</h1>
      <Link href="/" className="mt-6 text-emerald-300 hover:underline">
        Back home
      </Link>
    </div>
  );
}
