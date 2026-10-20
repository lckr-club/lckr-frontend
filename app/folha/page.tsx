export default function FolhaPage() {
    return (
        <main className="mx-auto w-full max-w-7xl px-6 py-8">
            <div className="flex items-end justify-between">
            <div>
                <h1 className="text-2xl font-semibold">Folha</h1>
                <p className="mt-1 text-sm text-[#737373]">5 do 6 coaches da folha tiveram aulas em agosto de 2026</p>
            </div>
            <div className="flex gap-4 ">
                <button className="border border-gray-400 py-1 px-3 rounded-lg  text-gray-700 font-semibold ">Exportar</button>
                <button className="py-1 px-3 rounded-lg bg-green-logo text-black  font-semibold ">Fechar folha</button>
            </div>
            </div>
             <select
            aria-label="Filtrar por coach"
            className="w-56 rounded-md border border-[#d4d4d4] bg-white mt-4 mb-2 px-3 py-2 text-sm text-[#171717] focus:border-[#90C156] focus:outline-none focus:ring-2 focus:ring-[#90C156]/40"
          >
            <option value="todos">Agosto de 2026</option>
            <option value="47291368805">Setembro de 2026</option>
          </select>
            <div className="mt-6 overflow-x-auto rounded-lg border border-[#e5e5e5] bg-white">
                
        <table className="w-full">
  <thead>
    <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
      <th className="py-2 px-4 text-left text-sm font-medium text-[#171717]">Professor</th>
      <th className="py-2 px-4 text-right text-sm font-medium text-[#171717]">Horas no mês</th>
      <th className="py-2 px-4 text-right text-sm font-medium text-[#171717]">Valor/hora</th>
      <th className="py-2 px-4 text-right text-sm font-medium text-[#171717]">Total a pagar</th>
    </tr>
  </thead>

  <tbody>
    <tr className="border-b border-[#e5e5e5] last:border-0 hover:bg-[#f5f5f5]">
      <td className="py-2 px-4 text-sm text-[#171717]">Ana Beatriz Ramalho</td>
      <td className="py-2 px-4 text-right text-sm text-[#171717]">25h</td>
      <td className="py-2 px-4 text-right text-sm text-[#171717]">R$ 62,50</td>
      <td className="py-2 px-4 text-right text-sm font-semibold text-[#3B5E18]">R$ 1.562,50</td>
    </tr>
  </tbody>

  <tfoot>
    <tr className="border-t-2 border-[#e5e5e5] bg-[#fafafa]">
      <td className="py-2 px-4 text-sm font-semibold text-[#171717]">Total geral</td>
      <td className="py-2 px-4 text-right text-sm font-semibold text-[#171717]">25h</td>
      <td className="py-2 px-4"></td>
      <td className="py-2 px-4 text-right text-sm font-semibold text-[#171717]">R$ 6.956,50</td>
    </tr>
  </tfoot>
</table>

      </div>
        </main>
    )
}