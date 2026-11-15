'use client'
import { useState } from "react";
import ModalLancamento from "./ModalLancamento";
import type { Aula } from "@/types/aula";
import { dataDeHoje } from "@/lib/formatar";

function montarCelulas(ano: number, mes: number) {
  const diasNoMes = new Date(ano, mes, 0).getDate();
  // essa variavel vai nos dizer qual o dia da semana do primeiro dia do mes, para que possamos preencher as celulas
  // com nulo para os dias que antecedem o primeiro dia do mes
  // por exemplo, se primeiro dia for 3, entao o primeiro dia do mes sera uma quarta
  const primeiroDia = new Date(ano, mes - 1, 1).getDay();

  const celulas = [];
  // preenchendo as celulas com nulo para os dias que antecedem o primeiro dia do mes
  for (let i = 0; i < primeiroDia; i++) celulas.push(null);
  for (let dia = 1; dia <= diasNoMes; dia++) celulas.push(dia);
  // Precisamos preencher as celulas que restam para completar o grid em retangulo
  // Entao, enquanto o numero de celulas nao for multiplo de 7(dias da semana), adicionamos nulo se ele for multiplo
  // de 7 quer dizer que conseguimos preencher x linhas de 7 celulas, que é o que queremos
  while (celulas.length % 7 !== 0) celulas.push(null);

  return celulas;
}

type Props = {
  ano: number;
  mes: number;
  aulas: Aula[];
  onSalvar: () => void;
};

export default function CalendarioHoras({ ano, mes, aulas, onSalvar }: Props) {
  const [diaAberto, setDiaAberto] = useState<string | null>(null);
  const celulas = montarCelulas(ano, mes);
  const hoje = dataDeHoje();

  return (
    <div className="mt-6 overflow-hidden rounded-sm border border-neutral-200 bg-white">
      <div className="grid grid-cols-7 border-b border-neutral-200 bg-neutral-50 text-center text-xs font-semibold uppercase text-neutral-500">
        <div className="py-2">Dom</div>
        <div className="py-2">Seg</div>
        <div className="py-2">Ter</div>
        <div className="py-2">Qua</div>
        <div className="py-2">Qui</div>
        <div className="py-2">Sex</div>
        <div className="py-2">Sáb</div>
      </div>

      <div className="grid grid-cols-7">
        {celulas.map((dia, i) => {
          if (dia === null) {
            return <div key={i} className="min-h-28 border-b border-r border-neutral-100 bg-neutral-50" />;
          }

          const data = `${ano}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
          const doDia = aulas
            .filter((a) => a.dataAula === data)
            .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));

          return (
            <button
              key={i}
              type="button"
              onClick={() => setDiaAberto(data)}
              className="flex min-h-28 cursor-pointer flex-col items-start gap-1 border-b border-r border-neutral-100 p-2 text-left hover:bg-neutral-50"
            >
              {data === hoje ? (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-logo text-xs font-semibold text-black">{dia}</span>
              ) : (
                <span className="flex h-6 w-6 items-center justify-center text-xs font-semibold text-neutral-600">{dia}</span>
              )}

              {doDia.slice(0, 3).map((aula) => (
                <span key={aula.id} className="w-full truncate rounded-sm bg-brand/25 px-1.5 py-0.5 text-xs text-brand-text">
                  {aula.horaInicio} {aula.nomeCoach.split(" ")[0]}
                </span>
              ))}
              {doDia.length > 3 && (
                <span className="text-xs text-neutral-500">+{doDia.length - 3} mais</span>
              )}
            </button>
          );
        })}
      </div>

      {diaAberto && (
        <ModalLancamento
          data={diaAberto}
          aulas={aulas.filter((a) => a.dataAula === diaAberto)}
          onClose={() => setDiaAberto(null)}
          onSalvar={onSalvar}
        />
      )}
    </div>
  );
}
