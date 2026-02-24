export default function FaixaLateral() {
  return (
    <div className="pointer-events-none absolute left-0 top-0 h-full w-32 md:w-48 z-0">
      <div className="h-full w-full bg-gradient-to-r from-red-700 via-red-600 to-transparent" />

      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:12px_12px]" />
    </div>
  );
}