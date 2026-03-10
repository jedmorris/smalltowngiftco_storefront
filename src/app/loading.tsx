export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]" role="status" aria-label="Loading">
      <div className="relative">
        {/* Pulsing gold spinner */}
        <div className="w-12 h-12 rounded-full border-2 border-brand-pink border-t-brand-gold animate-spin" />
        <span className="absolute inset-0 flex items-center justify-center text-brand-gold text-xs animate-pulse-soft">
          ◆
        </span>
      </div>
      <p className="mt-4 text-sm text-gray-400 font-serif">Loading...</p>
      <span className="sr-only">Loading</span>
    </div>
  );
}
