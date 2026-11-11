export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0B]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-accent animate-spin" />
        </div>
        <div className="text-xs font-sans font-medium text-gray-400 uppercase tracking-[0.18em]">
          Loading Endow Tech...
        </div>
      </div>
    </div>
  );
}
