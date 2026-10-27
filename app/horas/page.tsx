'use client';
import CalendarioHoras from "../components/CalendarioHoras";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";


export default function HorasPage() {
  function nomeMes(mes: number) {
    const meses = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    return meses[mes];
  }
  
  const [data, setData] = useState(new Date());
  const ehMesAtual = new Date().getMonth() === data.getMonth() && new Date().getFullYear() === data.getFullYear();
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Lançamento de horas</h1>
          <p className="mt-1 text-sm text-neutral-500">6 lançamentos, 25h em agosto de 2026.</p>
        </div>

        <div className="flex gap-3">
          <select
            aria-label="Filtrar por coach"
            className="w-56 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
          >
            <option value="todos">Todos os coaches</option>
            <option value="47291368805">Ana Beatriz Ramalho</option>
          </select>

          
        </div>
      </div>
      <div>
        
      </div>
      <div className="flex items-center mx-auto align-center gap-4 mt-4 w-full max-w-7xl justify-center">
        <button><FontAwesomeIcon icon={faChevronLeft} onClick={() => setData(new Date(data.getFullYear(), data.getMonth() - 1, 1))} /></button>
         <div className="flex w-44 mt-4 flex-col items-center">
  <p className="text-lg font-semibold text-neutral-900">
    {nomeMes(data.getMonth())} de {data.getFullYear()}
  </p>
  <span className={`text-xs font-medium text-brand-text ${ehMesAtual ? "" : "invisible"}`}>
    mês atual
  </span>
</div>
        <button><FontAwesomeIcon icon={faChevronRight} onClick={() => setData(new Date(data.getFullYear(), data.getMonth() + 1, 1))} /></button>
      </div>
    
      <CalendarioHoras ano={data.getFullYear()} mes={data.getMonth() + 1}></CalendarioHoras>
    </main>
  );
}