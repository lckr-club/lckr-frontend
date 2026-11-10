'use client';
import { useState } from "react";
import ModalNovoProfessor from "../components/ModalNovoCoach";
import Modal from "../components/Modal";
import { useCoaches } from "../context/CoachesContext";
import type { Coach } from "@/types/coach";
import { formatarMoeda } from "@/lib/formatar";
import { mensagemDeErro } from "@/lib/api";

export default function CoachesPage() {
  const { coaches, carregando, erro, inativarCoach, reativarCoach } = useCoaches();
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [coachEditando, setCoachEditando] = useState<Coach | undefined>();
  const [aviso, setAviso] = useState("");
  const [coachInativando, setCoachInativando] = useState<Coach | null>(null);

  const filtrados = coaches.filter((c) =>
    `${c.nome} ${c.cpf}`.toLowerCase().includes(busca.toLowerCase()),
  );

  function abrirNovo() {
    setCoachEditando(undefined);
    setModalAberto(true);
  }

  function abrirEdicao(coach: Coach) {
    setCoachEditando(coach);
    setModalAberto(true);
  }

  async function alternarStatus(coach: Coach) {
    // Para inativar, primeiro abre o modal de confirmação
    if (coach.status === "ativo") {
      setCoachInativando(coach);
      return;
    }

    setAviso("");
    try {
      await reativarCoach(coach.cpf);
    } catch (e) {
      setAviso(mensagemDeErro(e));
    }
  }

  async function confirmarInativar() {
    if (!coachInativando) return;
    setAviso("");
    try {
      await inativarCoach(coachInativando.cpf);
    } catch (e) {
      setAviso(mensagemDeErro(e));
    }
    setCoachInativando(null);
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Professores</h1>
          <p className="mt-1 text-sm text-neutral-500">{filtrados.length} de {coaches.length} cadastrados.</p>
        </div>

        <button
          type="button"
          className="cursor-pointer rounded-md bg-brand px-4 py-2 text-sm font-semibold text-black transition-colors duration-200 hover:bg-brand-dark"
          onClick={abrirNovo}
        >
          Novo professor
        </button>
      </div>

      <input
        type="search"
        aria-label="Buscar professor"
        placeholder="Buscar por nome ou CPF"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="mt-6 w-full max-w-sm rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
      />

      {aviso && <p className="mt-4 text-sm text-red-600">{aviso}</p>}

      <div className="mt-6 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50">
              <th className="py-2 px-4 text-left text-sm font-medium text-neutral-900">Nome</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-neutral-900">CPF</th>
              <th className="py-2 px-4 text-right text-sm font-medium text-neutral-900">Valor/hora</th>
              <th className="py-2 px-4 text-right text-sm font-medium text-neutral-900">Status</th>
              <th className="py-2 px-4 text-right text-sm font-medium text-neutral-900">Ações</th>
            </tr>
          </thead>

          <tbody>
            {carregando && (
              <tr><td colSpan={5} className="py-6 text-center text-sm text-neutral-500">Carregando...</td></tr>
            )}
            {erro && (
              <tr><td colSpan={5} className="py-6 text-center text-sm text-red-600">{erro}</td></tr>
            )}
            {!carregando && !erro && filtrados.length === 0 && (
              <tr><td colSpan={5} className="py-6 text-center text-sm text-neutral-500">Nenhum professor encontrado.</td></tr>
            )}

            {filtrados.map((coach) => (
              <tr key={coach.cpf} className="border-b border-neutral-200 last:border-0 hover:bg-neutral-100">
                <td className="py-2 px-4 text-sm text-neutral-900">{coach.nome}</td>
                <td className="py-2 px-4 text-sm text-neutral-900">{coach.cpf}</td>
                <td className="py-2 px-4 text-right text-sm text-neutral-900">{formatarMoeda(coach.valorHora)}</td>
                <td className="py-2 px-4 text-right">
                  {coach.status === "ativo" ? (
                    <span className="rounded-full bg-brand/25 px-2.5 py-0.5 text-xs font-medium text-brand-text">Ativo</span>
                  ) : (
                    <span className="rounded-full bg-neutral-200 px-2.5 py-0.5 text-xs font-medium text-neutral-600">Inativo</span>
                  )}
                </td>
                <td className="py-2 px-4 text-right">
                  <button type="button" onClick={() => abrirEdicao(coach)} className="cursor-pointer text-sm font-medium text-brand-text hover:underline">Editar</button>
                  <button type="button" onClick={() => alternarStatus(coach)} className="ml-4 cursor-pointer text-sm font-medium text-neutral-500 hover:underline">
                    {coach.status === "ativo" ? "Inativar" : "Reativar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalAberto && <ModalNovoProfessor coach={coachEditando} onClose={() => setModalAberto(false)} />}

      <Modal isOpen={coachInativando !== null} onClose={() => setCoachInativando(null)}>
        <div className="w-sm p-6">
          <h2 className="text-lg font-semibold">Inativar professor</h2>
          <p className="mt-2 text-sm text-neutral-500">
            {coachInativando?.nome} não vai poder receber novas aulas. Dá pra reativar depois.
          </p>

          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={() => setCoachInativando(null)} className="cursor-pointer rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
              Cancelar
            </button>
            <button type="button" onClick={confirmarInativar} className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">
              Inativar
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
