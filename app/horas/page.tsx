export default function HorasPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Lançamento de horas</h1>
          <p className="mt-1 text-sm text-[#737373]">6 lançamentos, 25h em agosto de 2026.</p>
        </div>

        <div className="flex gap-3">
          <select
            aria-label="Filtrar por coach"
            className="w-56 rounded-md border border-[#d4d4d4] bg-white px-3 py-2 text-sm text-[#171717] focus:border-[#90C156] focus:outline-none focus:ring-2 focus:ring-[#90C156]/40"
          >
            <option value="todos">Todos os coaches</option>
            <option value="47291368805">Ana Beatriz Ramalho</option>
          </select>

          <select
            aria-label="Mês"
            className="w-48 rounded-md border border-[#d4d4d4] bg-white px-3 py-2 text-sm text-[#171717] focus:border-[#90C156] focus:outline-none focus:ring-2 focus:ring-[#90C156]/40"
          >
            <option value="2026-08">agosto de 2026</option>
          </select>
        </div>
      </div>
      <div>
        
      </div>
    </main>
  );
}