import Image from "next/image";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-8">
      <div>
        <h1 className="text-2xl font-semibold">Olá, secretária.</h1>
        <p className="mt-1 text-sm text-neutral-500">Resumo da operação de agosto de 2026.</p>
      </div>
      <hr  className="my-8 border-t border-neutral-200"></hr>
      <p className="uppercase text-sm font-semibold text-neutral-500">Resumo do mês</p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg  bg-white p-4">
          <p className="text-sm text-neutral-500">Total de horas</p>
          <p className="mt-1 text-2xl font-semibold text-neutral-900">25h</p>
          <p className="text-sm text-neutral-500">24 lançamentos no mês</p>
        </div>
        <div className="rounded-lg  bg-white p-4">
          <p className="text-sm text-neutral-500">Coaches ativos</p>
          <p className="mt-1 text-2xl font-semibold text-neutral-900">5</p>
          <p className="text-sm text-neutral-500">6 cadastrados</p>
        </div>
        <div className="rounded-lg  bg-white p-4">
          <p className="text-sm text-neutral-500">Folha atual prevista</p>
          <p className="mt-1 text-2xl font-semibold text-green-logo ">R$ 6.956,50</p>
          <p className="text-sm text-neutral-500">Baseado nas horas lançamentos</p>
        </div>
        </div>
      <hr  className="my-8 border-t border-neutral-200"></hr>

      <div className="flex items-end justify-between">
        <h1 className=" text-neutral-500 font-semibold uppercase">Escala da semana</h1>
        <p className="text-sm text-neutral-500">30h na semana</p>
      </div>

      <div className="border border-neutral-200 rounded-lg mt-4">
        <div className="flex items-end justify-between bg-neutral-100 p-2 rounded-t-lg"><p className="font-semibold">Sexta feira, 28/08/2026</p> <p  className="text-neutral-500">1 coach, 5 aulas</p></div>
        <div className="flex items-end justify-between p-2 rounded-t-lg"><p className="text-neutral-500">Gabriela</p> <p className="font-semibold">5 aulas</p></div>
      </div>

      <div className="border border-neutral-200 rounded-lg mt-4">
  <div className="flex items-end justify-between bg-neutral-100 p-2 rounded-t-lg">
    <p className="font-semibold">Sábado, 29/08/2026</p>
    <p className="text-neutral-500">2 coaches, 6 aulas</p>
  </div>

  <div className="flex items-center justify-between p-2 border-b border-neutral-200">
    <p className="text-neutral-500">Mariana Costa</p>
    <p className="font-semibold">4 aulas</p>
  </div>

  <div className="flex items-center justify-between p-2">
    <p className="text-neutral-500">Rafael Martins</p>
    <p className="font-semibold">2 aulas</p>
  </div>
</div>

      
    </main>
  );
}
