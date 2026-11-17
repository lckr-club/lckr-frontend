'use client';
import { useEffect, useState } from "react";
import { useCoaches } from "./context/CoachesContext";
import type { Aula } from "@/types/aula";
import type { ResumoMes } from "@/types/folha";
import { mensagemDeErro } from "@/lib/api";
import { DIAS_DA_SEMANA, MESES, formatarHoras, formatarMoeda } from "@/lib/formatar";
import { buscarAulas } from "@/services/aula";
import { buscarResumo } from "@/services/folha";

function buscarAulasDaSemana() {
  // domingo e sábado da semana de hoje
  const hoje = new Date();
  const domingo = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - hoje.getDay());
  const sabado = new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate() + 6);
  const inicio = `${domingo.getFullYear()}-${String(domingo.getMonth() + 1).padStart(2, "0")}-${String(domingo.getDate()).padStart(2, "0")}`;
  const fim = `${sabado.getFullYear()}-${String(sabado.getMonth() + 1).padStart(2, "0")}-${String(sabado.getDate()).padStart(2, "0")}`;
  return buscarAulas(inicio, fim);
}

function mesAtual() {
  const hoje = new Date();
  return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}`;
}

export default function Home() {
  const hoje = new Date();
  const { coaches } = useCoaches();
  const [resumo, setResumo] = useState<ResumoMes | null>(null);
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarInicio() {
      try {
        const dadosResumo = await buscarResumo(mesAtual());
        setResumo(dadosResumo);
        const aulasDaSemana = await buscarAulasDaSemana();
        setAulas(aulasDaSemana);
      } catch (e) {
        setErro(mensagemDeErro(e));
      }
    }

    carregarInicio();
  }, []);

  // separa as aulas da semana por dia
  const dias: string[] = [];
  for (const aula of aulas) {
    if (!dias.includes(aula.dataAula)) dias.push(aula.dataAula);
  }
  dias.sort();

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-8">
      <div>
        <h1 className="text-2xl font-semibold">Olá, secretária.</h1>
        <p className="mt-1 text-sm text-neutral-500">Resumo da operação de {MESES[hoje.getMonth()]} de {hoje.getFullYear()}.</p>
      </div>

      {erro && <p className="mt-4 text-sm text-red-600">{erro}</p>}

      <hr className="my-8 border-t border-neutral-200"></hr>
      <p className="uppercase text-sm font-semibold text-neutral-500">Resumo do mês</p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-4">
          <p className="text-sm text-neutral-500">Total de horas</p>
          <p className="mt-1 text-2xl font-semibold text-neutral-900">{resumo ? formatarHoras(resumo.totalHoras) : "-"}</p>
          <p className="text-sm text-neutral-500">{resumo ? `${formatarHoras(resumo.horasAgendadas)} ainda agendadas` : ""}</p>
        </div>
        <div className="rounded-lg bg-white p-4">
          <p className="text-sm text-neutral-500">Coaches ativos</p>
          <p className="mt-1 text-2xl font-semibold text-neutral-900">{coaches.filter((c) => c.status === "ativo").length}</p>
          <p className="text-sm text-neutral-500">{coaches.length} cadastrados</p>
        </div>
        <div className="rounded-lg bg-white p-4">
          <p className="text-sm text-neutral-500">Folha atual prevista</p>
          <p className="mt-1 text-2xl font-semibold text-green-logo">{resumo ? formatarMoeda(resumo.folhaPrevista) : "-"}</p>
          <p className="text-sm text-neutral-500">Baseado nas horas lançadas</p>
        </div>
      </div>

      <hr className="my-8 border-t border-neutral-200"></hr>

      <div className="flex items-end justify-between">
        <h1 className="text-neutral-500 font-semibold uppercase">Escala da semana</h1>
        <p className="text-sm text-neutral-500">{formatarHoras(aulas.length)} na semana</p>
      </div>

      {dias.length === 0 && (
        <p className="mt-4 text-sm text-neutral-500">Nenhuma aula lançada nesta semana.</p>
      )}

      {dias.map((dia) => {
        const doDia = aulas.filter((a) => a.dataAula === dia);
        const [ano, mes, numeroDia] = dia.split("-");
        const diaDaSemana = DIAS_DA_SEMANA[new Date(Number(ano), Number(mes) - 1, Number(numeroDia)).getDay()];
        const nomes: string[] = [];
        for (const aula of doDia) {
          if (!nomes.includes(aula.nomeCoach)) nomes.push(aula.nomeCoach);
        }

        return (
          <div key={dia} className="border border-neutral-200 rounded-lg mt-4">
            <div className="flex items-end justify-between bg-neutral-100 p-2 rounded-t-lg">
              <p className="font-semibold">{diaDaSemana}, {numeroDia}/{mes}/{ano}</p>
              <p className="text-neutral-500">
                {nomes.length} {nomes.length === 1 ? "coach" : "coaches"}, {doDia.length} {doDia.length === 1 ? "aula" : "aulas"}
              </p>
            </div>

            {nomes.map((nome) => {
              const quantidade = doDia.filter((a) => a.nomeCoach === nome).length;
              return (
                <div key={nome} className="flex items-center justify-between p-2 border-b border-neutral-200 last:border-0">
                  <p className="text-neutral-500">{nome}</p>
                  <p className="font-semibold">{quantidade} {quantidade === 1 ? "aula" : "aulas"}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </main>
  );
}
