'use client';
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import type { Folha } from "@/types/folha";
import { API, mensagemDeErro } from "@/lib/api";
import { MESES, formatarHoras, formatarMoeda } from "@/lib/formatar";
import { buscarFolha, fecharFolha as fecharFolhaService, reabrirFolha as reabrirFolhaService } from "@/services/folha";

function mesAtual() {
  const hoje = new Date();
  return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}`;
}

export default function FolhaPage() {
  const [mes, setMes] = useState(mesAtual());
  const [folha, setFolha] = useState<Folha | null>(null);
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState<string | null>(null);

  const [ano, numeroMes] = mes.split("-");
  const nomeDoMes = `${MESES[Number(numeroMes) - 1]} de ${ano}`;

  useEffect(() => {
    async function carregarFolha() {
      try {
        const dados = await buscarFolha(mes);
        setFolha(dados);
        setErro("");
      } catch (e) {
        setErro(mensagemDeErro(e));
      }
    }

    carregarFolha();
  }, [mes]);

  async function recarregar() {
    try {
      const dados = await buscarFolha(mes);
      setFolha(dados);
    } catch (e) {
      setErro(mensagemDeErro(e));
    }
  }

  async function fecharFolha() {
    setErro("");
    try {
      const avisoDaApi = await fecharFolhaService(mes, false);
      // Se ainda tem pagamento pendente, a API não fecha e pede confirmação
      if (avisoDaApi) {
        setAviso(avisoDaApi);
        return;
      }
      recarregar();
    } catch (e) {
      setErro(mensagemDeErro(e));
    }
  }

  async function confirmarFechar() {
    setErro("");
    try {
      await fecharFolhaService(mes, true);
      recarregar();
    } catch (e) {
      setErro(mensagemDeErro(e));
    }
    setAviso(null);
  }

  async function reabrirFolha() {
    setErro("");
    try {
      await reabrirFolhaService(mes);
      recarregar();
    } catch (e) {
      setErro(mensagemDeErro(e));
    }
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Folha</h1>
          <p className="mt-1 text-sm text-neutral-500">
            {folha ? `${folha.coaches.length} coaches tiveram aulas em ${nomeDoMes}.` : "Carregando..."}
          </p>
        </div>
        <div className="flex gap-4">
          <a
            href={`${API}/Folha/ExportarPdf/${mes}`}
            className="border border-gray-400 py-1 px-3 rounded-lg text-gray-700 font-semibold hover:bg-neutral-50"
          >
            Exportar PDF
          </a>
          <a
            href={`${API}/Folha/ExportarExcel/${mes}`}
            className="border border-gray-400 py-1 px-3 rounded-lg text-gray-700 font-semibold hover:bg-neutral-50"
          >
            Exportar Excel
          </a>
          {folha?.statusPeriodo === "fechado" ? (
            <button type="button" onClick={reabrirFolha} className="cursor-pointer py-1 px-3 rounded-lg border border-gray-400 text-gray-700 font-semibold hover:bg-neutral-50">
              Reabrir folha
            </button>
          ) : (
            <button type="button" onClick={fecharFolha} className="cursor-pointer py-1 px-3 rounded-lg bg-green-logo text-black font-semibold hover:bg-green-logo/90">
              Fechar folha
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 mb-2 flex items-center gap-4">
        <input
          type="month"
          aria-label="Mês da folha"
          value={mes}
          onChange={(e) => e.target.value && setMes(e.target.value)}
          className="w-56 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
        />
        {folha?.statusPeriodo === "fechado" ? (
          <span className="inline-flex items-center rounded-full bg-neutral-200 px-2.5 py-0.5 text-xs font-medium text-neutral-600">Folha fechada</span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-brand/25 px-2.5 py-0.5 text-xs font-medium text-brand-text">Folha aberta</span>
        )}
      </div>

      {erro && <p className="mt-4 text-sm text-red-600">{erro}</p>}

      {folha && folha.pendencias.length > 0 && (
        <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-800">Pendências</p>
          <ul className="mt-1 list-disc pl-5 text-sm text-amber-800">
            {folha.pendencias.map((p, i) => (
              <li key={i}>{p.mensagem}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50">
              <th className="py-2 px-4 text-left text-sm font-medium text-neutral-900">Professor</th>
              <th className="py-2 px-4 text-right text-sm font-medium text-neutral-900">Aulas</th>
              <th className="py-2 px-4 text-right text-sm font-medium text-neutral-900">Horas no mês</th>
              <th className="py-2 px-4 text-right text-sm font-medium text-neutral-900">Total a pagar</th>
            </tr>
          </thead>

          <tbody>
            {folha && folha.coaches.length === 0 && (
              <tr><td colSpan={4} className="py-6 text-center text-sm text-neutral-500">Nenhuma aula realizada nesse mês.</td></tr>
            )}
            {folha?.coaches.map((coach) => (
              <tr key={coach.cpfCoach} className="border-b border-neutral-200 last:border-0 hover:bg-neutral-100">
                <td className="py-2 px-4 text-sm text-neutral-900">{coach.nomeCoach}</td>
                <td className="py-2 px-4 text-right text-sm text-neutral-900">{coach.quantidadeAulas}</td>
                <td className="py-2 px-4 text-right text-sm text-neutral-900">{formatarHoras(coach.horas)}</td>
                <td className="py-2 px-4 text-right text-sm font-semibold text-brand-text">{formatarMoeda(coach.valor)}</td>
              </tr>
            ))}
          </tbody>

          {folha && (
            <tfoot>
              <tr className="border-t-2 border-neutral-200 bg-neutral-50">
                <td className="py-2 px-4 text-sm font-semibold text-neutral-900">Total geral</td>
                <td className="py-2 px-4"></td>
                <td className="py-2 px-4 text-right text-sm font-semibold text-neutral-900">{formatarHoras(folha.totalHoras)}</td>
                <td className="py-2 px-4 text-right text-sm font-semibold text-neutral-900">{formatarMoeda(folha.valorTotal)}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      <Modal isOpen={aviso !== null} onClose={() => setAviso(null)}>
        <div className="w-sm p-6">
          <h2 className="text-lg font-semibold">Fechar folha</h2>
          <p className="mt-2 text-sm text-neutral-500">{aviso}</p>

          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={() => setAviso(null)} className="cursor-pointer rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
              Cancelar
            </button>
            <button type="button" onClick={confirmarFechar} className="cursor-pointer rounded-md bg-green-logo px-4 py-2 text-sm font-semibold text-black hover:bg-green-logo/90">
              Fechar mesmo assim
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
