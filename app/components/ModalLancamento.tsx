'use client';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import { useCoaches } from "../context/CoachesContext";
import type { Aula } from "@/types/aula";
import { mensagemDeErro } from "@/lib/api";
import { DIAS_DA_SEMANA, dataDeHoje } from "@/lib/formatar";
import { criarAula, excluirAula, marcarRealizada, substituirCoach } from "@/services/aula";

const HORARIOS = [
  { inicio: "06:00", fim: "07:00" },
  { inicio: "07:00", fim: "08:00" },
  { inicio: "12:00", fim: "13:00" },
  { inicio: "16:00", fim: "17:00" },
  { inicio: "17:00", fim: "18:00" },
  { inicio: "18:00", fim: "19:00" },
  { inicio: "19:00", fim: "20:00" },
  { inicio: "20:00", fim: "21:00" },
];

type Props = {
  data: string;
  aulas: Aula[];
  onClose: () => void;
  onSalvar: () => void;
};

export default function ModalLancamento({ data, aulas, onClose, onSalvar }: Props) {
  const { coaches } = useCoaches();
  const [erro, setErro] = useState("");

  const ativos = coaches.filter((c) => c.status === "ativo");
  // data vem no formato "2026-11-09"
  const [ano, mes, dia] = data.split("-");
  const dataFormatada = `${dia}/${mes}/${ano}`;
  const diaDaSemana = DIAS_DA_SEMANA[new Date(Number(ano), Number(mes) - 1, Number(dia)).getDay()];

  async function adicionar(horaInicio: string, horaFim: string, cpf: string) {
    const coach = ativos.find((c) => c.cpf === cpf);
    if (!coach) return;
    setErro("");
    try {
      const aula = await criarAula({
        dataAula: data,
        horaInicio,
        horaFim,
        modalidade: coach.especialidade,
        capacidade: 20,
        cpfCoach: coach.cpf,
      });

      // A aula nasce como agendada. Se o dia já passou, ela já aconteceu e entra na folha.
      if (data <= dataDeHoje()) {
        await marcarRealizada(aula.id);
      }
      onSalvar();
    } catch (e) {
      setErro(mensagemDeErro(e));
    }
  }

  async function remover(aula: Aula) {
    setErro("");
    try {
      await excluirAula(aula.id);
      onSalvar();
    } catch (e) {
      setErro(mensagemDeErro(e));
    }
  }

  // o coach previsto faltou e outro deu a aula no lugar dele
  async function substituir(aula: Aula, cpf: string) {
    if (!cpf) return;
    setErro("");
    try {
      await substituirCoach(aula.id, cpf);
      onSalvar();
    } catch (e) {
      setErro(mensagemDeErro(e));
    }
  }

  // aula lançada antes do dia: depois que ela acontece, marca como realizada pra entrar na folha
  async function concluir(aula: Aula) {
    setErro("");
    try {
      await marcarRealizada(aula.id);
      onSalvar();
    } catch (e) {
      setErro(mensagemDeErro(e));
    }
  }

  return (
    <Modal isOpen onClose={onClose}>
      <div className="w-[36rem] max-w-[calc(100vw-2rem)]">
        <div className="flex items-start justify-between border-b border-neutral-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">{dataFormatada}</h2>
            <p className="mt-1 text-sm text-neutral-500">{diaDaSemana}. Escolha quem deu aula em cada horário.</p>
          </div>
          <button
            type="button"
            aria-label="Fechar"
            onClick={onClose}
            className="cursor-pointer rounded-md p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-6 py-2">
          {HORARIOS.map((horario) => {
            const doHorario = aulas.filter((a) => a.horaInicio === horario.inicio);
            const livres = ativos.filter((c) => !doHorario.some((a) => a.cpfCoach === c.cpf));

            return (
              <div key={horario.inicio} className="flex items-center gap-4 border-b border-neutral-100 py-3 last:border-0">
                <span className="w-12 text-sm font-semibold text-neutral-900">{horario.inicio}</span>

                <div className="flex flex-1 flex-col gap-2">
                  {doHorario.map((aula) => (
                    <div key={aula.id} className="flex flex-wrap items-center gap-2 text-xs">
                      <span className={`flex items-center gap-2 rounded-sm px-2 py-1 font-medium ${aula.status === "realizada" ? "bg-brand/25 text-brand-text" : "bg-neutral-200 text-neutral-600"}`}>
                        {aula.nomeCoach}
                        {aula.nomeCoachPrevisto && ` (no lugar de ${aula.nomeCoachPrevisto.split(" ")[0]})`}
                        <button
                          type="button"
                          aria-label={`Remover ${aula.nomeCoach}`}
                          onClick={() => remover(aula)}
                          className="cursor-pointer hover:text-black"
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </span>

                      {aula.status === "agendada" && <span className="text-neutral-500">agendada</span>}

                      {aula.status === "agendada" && data <= dataDeHoje() && (
                        <button type="button" onClick={() => concluir(aula)} className="cursor-pointer font-medium text-brand-text hover:underline">
                          Marcar como realizada
                        </button>
                      )}

                      {livres.length > 0 && (
                        <select
                          aria-label={`Trocar ${aula.nomeCoach} por outro coach`}
                          value=""
                          onChange={(e) => substituir(aula, e.target.value)}
                          className="rounded-md border border-neutral-300 px-2 py-1 text-neutral-700 focus:border-brand focus:outline-none"
                        >
                          <option value="">Trocar por...</option>
                          {livres.map((c) => (
                            <option key={c.cpf} value={c.cpf}>{c.nome}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  ))}

                  {livres.length > 0 && (
                    <select
                      aria-label={`Adicionar coach às ${horario.inicio}`}
                      value=""
                      onChange={(e) => adicionar(horario.inicio, horario.fim, e.target.value)}
                      className="w-fit rounded-md border border-neutral-300 bg-white px-2 py-1 text-xs text-neutral-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
                    >
                      <option value="">+ coach</option>
                      {livres.map((c) => (
                        <option key={c.cpf} value={c.cpf}>{c.nome}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {erro && <p className="px-6 pb-2 text-sm text-red-600">{erro}</p>}

        <div className="flex justify-end border-t border-neutral-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-md bg-brand px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-brand-dark"
          >
            Pronto
          </button>
        </div>
      </div>
    </Modal>
  );
}
