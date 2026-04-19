import Link from "next/link";
import TextLogo from "@/components/ui/TextLogo";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
      <div className="mb-8 opacity-60">
        <TextLogo size="md" asLink={false} />
      </div>
      <h1 className="font-serif text-7xl text-apricot-deep mb-4">404</h1>
      <h2 className="font-serif text-2xl text-ink mb-4">
        Page Not Found
      </h2>
      <p className="text-ink-muted mb-8 max-w-md">
        Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been
        moved or removed.
      </p>
      <Link
        href="/collections/best-sellers"
        className="px-8 py-3 bg-apricot-deep text-white font-medium rounded-full hover:bg-apricot-deep/90 transition-all hover:shadow-[var(--shadow-medium)]"
      >
        Shop Our Best Sellers
      </Link>
    </div>
  );
}
