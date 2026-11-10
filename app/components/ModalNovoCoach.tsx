'use client';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import { useCoaches } from "../context/CoachesContext";
import type { Coach } from "@/types/coach";
import { mensagemDeErro } from "@/lib/api";

// Comportamento sem coach é cadastrar um novo
// Com coach vai ser editar ele
export default function ModalNovoProfessor({ coach, onClose }: { coach?: Coach; onClose: () => void }) {
  const { criarCoach, atualizarCoach } = useCoaches();

  const [nome, setNome] = useState(coach?.nome ?? "");
  const [cpf, setCpf] = useState(coach?.cpf ?? "");
  const [telefone, setTelefone] = useState(coach?.telefone ?? "");
  const [email, setEmail] = useState(coach?.email ?? "");
  const [valor, setValor] = useState(coach ? coach.valorHora.toFixed(2).replace(".", ",") : "");
  const [erro, setErro] = useState("");

  async function salvar(evento: React.FormEvent) {
    evento.preventDefault();
    setErro("");
    // A API exige especialidade, mas por enquanto nao temos necessidade de preencher, por isso preencheremos com geral
    const especialidade = coach?.especialidade ?? "Geral";
    const dados = { nome, cpf, telefone, email, especialidade, valorHora: Number(valor.replace(",", ".")) };
    try {
      if (coach) {
        await atualizarCoach(coach.cpf, dados);
      } else {
        await criarCoach(dados);
      }
      onClose();
    } catch (e) {
      setErro(mensagemDeErro(e));
    }
  }

  return (
    <Modal isOpen onClose={onClose}>
      <form onSubmit={salvar} className="w-lg">
        <div className="flex justify-between border-b border-neutral-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold">{coach ? "Editar professor" : "Novo professor"}</h2>
            <p className="mt-1 text-sm text-neutral-500">Preencha os dados do professor.</p>
          </div>
          <button type="button" onClick={onClose} className="cursor-pointer p-2 text-neutral-500 hover:text-black">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 px-6 py-5">
          <div className="col-span-2">
            <label htmlFor="nome" className="mb-1 block text-sm font-medium text-neutral-700">Nome completo</label>
            <input id="nome" required value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex.: Ana Beatriz Ramalho" className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-brand focus:outline-none" />
          </div>

          <div>
            <label htmlFor="cpf" className="mb-1 block text-sm font-medium text-neutral-700">CPF</label>
            <input id="cpf" required disabled={!!coach} value={cpf} onChange={(e) => setCpf(e.target.value)} minLength={11} maxLength={11} placeholder="Somente números" className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-brand focus:outline-none disabled:bg-neutral-100" />
          </div>

          <div>
            <label htmlFor="telefone" className="mb-1 block text-sm font-medium text-neutral-700">Telefone</label>
            <input id="telefone" required value={telefone} onChange={(e) => setTelefone(e.target.value)} maxLength={11} placeholder="Somente números" className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-brand focus:outline-none" />
          </div>

          <div className="col-span-2">
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-neutral-700">E-mail</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nome@lckrclub.com" className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-brand focus:outline-none" />
          </div>

          <div>
            <label htmlFor="valor" className="mb-1 block text-sm font-medium text-neutral-700">Valor por hora</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-sm text-neutral-500">R$</span>
              <input id="valor" required value={valor} onChange={(e) => setValor(e.target.value)} placeholder="0,00" className="w-full rounded-md border border-neutral-300 py-2 pl-9 pr-3 text-sm focus:border-brand focus:outline-none" />
            </div>
          </div>

          {erro && <p className="col-span-2 text-sm text-red-600">{erro}</p>}
        </div>

        <div className="flex justify-end gap-3 border-t border-neutral-200 px-6 py-4">
          <button type="button" onClick={onClose} className="cursor-pointer rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
            Cancelar
          </button>
          <button type="submit" className="cursor-pointer rounded-md bg-brand px-4 py-2 text-sm font-semibold text-black hover:bg-brand-dark">
            Salvar professor
          </button>
        </div>
      </form>
    </Modal>
  );
}
