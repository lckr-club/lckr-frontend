'use client';
import { createContext, useContext, useEffect, useState } from "react";
import type { Coach, DadosCoach } from "@/types/coach";
import { mensagemDeErro } from "@/lib/api";
import {
  buscarCoaches as buscarCoachesService,
  criarCoach as criarCoachService,
  atualizarCoach as atualizarCoachService,
  registrarReajuste as registrarReajusteService,
  inativarCoach as inativarCoachService,
  reativarCoach as reativarCoachService,
} from "@/services/coach";

type CoachesContextType = {
  coaches: Coach[];
  carregando: boolean;
  erro: string | null;
  criarCoach: (dados: DadosCoach) => Promise<void>;
  atualizarCoach: (cpf: string, dados: DadosCoach) => Promise<void>;
  inativarCoach: (cpf: string) => Promise<void>;
  reativarCoach: (cpf: string) => Promise<void>;
};

const CoachesContext = createContext<CoachesContextType | null>(null);

export function CoachesProvider({ children }: { children: React.ReactNode }) {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarCoaches() {
      try {
        const lista = await buscarCoachesService();
        setCoaches(lista);
      } catch (e) {
        setErro(mensagemDeErro(e));
      } finally {
        setCarregando(false);
      }
    }

    carregarCoaches();
  }, []);

  async function criarCoach(dados: DadosCoach) {
    await criarCoachService(dados);
    setCoaches(await buscarCoachesService());
  }

  async function atualizarCoach(cpf: string, dados: DadosCoach) {
    const atual = coaches.find((c) => c.cpf === cpf);
    await atualizarCoachService(cpf, dados, atual?.status ?? "ativo");

    // o valor da hora tem historico, entao temos que registrar o reajuste
    if (atual && atual.valorHora !== dados.valorHora) {
      await registrarReajusteService(cpf, dados.valorHora);
    }

    setCoaches(await buscarCoachesService());
  }

  async function inativarCoach(cpf: string) {
    await inativarCoachService(cpf);
    setCoaches(await buscarCoachesService());
  }

  async function reativarCoach(cpf: string) {
    await reativarCoachService(cpf);
    setCoaches(await buscarCoachesService());
  }

  return (
    <CoachesContext.Provider
      value={{ coaches, carregando, erro, criarCoach, atualizarCoach, inativarCoach, reativarCoach }}
    >
      {children}
    </CoachesContext.Provider>
  );
}

export function useCoaches() {
  const contexto = useContext(CoachesContext);
  if (!contexto) {
    throw new Error("useCoaches precisa estar dentro do <CoachesProvider>.");
  }
  return contexto;
}
