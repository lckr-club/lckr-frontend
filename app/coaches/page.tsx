export default function CoachesPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Professores</h1>
          <p className="mt-1 text-sm text-[#737373]">1 de 1 cadastrado.</p>
        </div>

        <button
          type="button"
          className="rounded-md bg-[#90C156] px-4 py-2 text-sm font-semibold text-black transition-colors duration-200 hover:bg-[#74A43C]"
        >
          Novo professor
        </button>
      </div>

      <input
        type="search"
        aria-label="Buscar professor"
        placeholder="Buscar por nome, CPF ou modalidade"
        className="mt-6 w-full max-w-sm rounded-md border border-[#d4d4d4] px-3 py-2 text-sm text-[#171717] placeholder:text-[#a3a3a3] focus:border-[#90C156] focus:outline-none focus:ring-2 focus:ring-[#90C156]/40"
      />

      <div className="mt-6 overflow-x-auto rounded-lg border border-[#e5e5e5] bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
              <th className="py-2 px-4 text-left text-sm font-medium text-[#171717]">Nome</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-[#171717]">CPF</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-[#171717]">Modalidade</th>
              <th className="py-2 px-4 text-right text-sm font-medium text-[#171717]">Valor/hora</th>
              <th className="py-2 px-4 text-right text-sm font-medium text-[#171717]">Status</th>
              <th className="py-2 px-4 text-right text-sm font-medium text-[#171717]">Ações</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-[#e5e5e5] last:border-0 hover:bg-[#f5f5f5]">
              <td className="py-2 px-4 text-sm text-[#171717]">Ana Beatriz Ramalho</td>
              <td className="py-2 px-4 text-sm text-[#171717]">472.913.688-05</td>
              <td className="py-2 px-4 text-sm text-[#171717]">CrossFit</td>
              <td className="py-2 px-4 text-right text-sm text-[#171717]">R$ 62,50</td>
              <td className="py-2 px-4 text-right"><span className="inline-flex items-center rounded-full bg-[#90C156]/25 px-2.5 py-0.5 text-xs font-medium text-[#3B5E18]">Ativo</span></td>
              <td className="py-2 px-4 text-right"><button type="button" className="cursor-pointer text-sm font-medium text-[#3B5E18] hover:underline">Editar</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}