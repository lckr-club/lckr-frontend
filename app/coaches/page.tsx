'use client';
import { useState } from "react";
import ModalNovoProfessor from "../components/ModalNovoCoach";
export default function CoachesPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Professores</h1>
          <p className="mt-1 text-sm text-neutral-500">1 de 1 cadastrado.</p>
        </div>

        <button
          type="button"
          className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-black transition-colors duration-200 hover:bg-brand-dark"
          onClick={() => setIsOpen(true)}
       >
          Novo professor
        </button>
      </div>

      <input
        type="search"
        aria-label="Buscar professor"
        placeholder="Buscar por nome, CPF ou modalidade"
        className="mt-6 w-full max-w-sm rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
      />

      <div className="mt-6 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50">
              <th className="py-2 px-4 text-left text-sm font-medium text-neutral-900">Nome</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-neutral-900">CPF</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-neutral-900">Modalidade</th>
              <th className="py-2 px-4 text-right text-sm font-medium text-neutral-900">Valor/hora</th>
              <th className="py-2 px-4 text-right text-sm font-medium text-neutral-900">Status</th>
              <th className="py-2 px-4 text-right text-sm font-medium text-neutral-900">Ações</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-neutral-200 last:border-0 hover:bg-neutral-100">
              <td className="py-2 px-4 text-sm text-neutral-900">Ana Beatriz Ramalho</td>
              <td className="py-2 px-4 text-sm text-neutral-900">472.913.688-05</td>
              <td className="py-2 px-4 text-sm text-neutral-900">CrossFit</td>
              <td className="py-2 px-4 text-right text-sm text-neutral-900">R$ 62,50</td>
              <td className="py-2 px-4 text-right"><span className="inline-flex items-center rounded-full bg-brand/25 px-2.5 py-0.5 text-xs font-medium text-brand-text">Ativo</span></td>
              <td className="py-2 px-4 text-right"><button type="button" className="cursor-pointer text-sm font-medium text-brand-text hover:underline">Editar</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <ModalNovoProfessor isOpen={isOpen} onClose={() => setIsOpen(false)}></ModalNovoProfessor>
    </main>
  );
}