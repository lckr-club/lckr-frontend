'use client'
import { useState } from "react";
import Modal from "./Modal";

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
  // Precisamos preencher as celular que restam para completar o grid em retangulo
  // Entao, enquanto o numero de celulas nao for multiplo de 7(dias da seman), adicionamos nulo se ele for multiplo
  // de 7 quer dizer que conseguimos preencher x linhas de 7 celulas, que é o que queremos
  while (celulas.length % 7 !== 0) celulas.push(null);

  return celulas;
}

export default function CalendarioHoras({ ano, mes }: { ano: number; mes: number }) {
    const [isOpen, setIsOpen] = useState(false);
  const celulas = montarCelulas(ano, mes);

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
        {celulas.map((dia, i) =>
          dia === null ? (
            <div key={i} className="min-h-28 border-b border-r border-neutral-100 bg-neutral-50" onClick={() => setIsOpen(true)} />
          ) : (
            <div key={i} className="min-h-28 border-b border-r border-neutral-100 p-2" onClick={() => setIsOpen(true)}>
              {dia === new Date().getDate() && mes === new Date().getMonth() + 1 && ano === new Date().getFullYear() ? (
                <span className="text-xs font-semibold text-black bg-green-logo p-2 rounded-full">{dia}</span>
              ) : (
                <span className="text-xs font-semibold text-neutral-600 ">{dia}</span>
              )}
            </div>
          )
        )}
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}><div>Olá</div></Modal>
    </div>
    
  );
}