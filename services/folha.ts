import type { Folha, ResumoMes } from "@/types/folha";
import { API } from "@/lib/api";

export async function buscarFolha(mes: string) {
  const res = await fetch(`${API}/Folha/CalcularFolha/${mes}`);
  if (!res.ok) {
    const corpo = await res.json();
    throw new Error(corpo.mensagem);
  }
  const folha: Folha = await res.json();
  return folha;
}

export async function buscarResumo(mes: string) {
  const res = await fetch(`${API}/Folha/ResumoMes?mes=${mes}`);
  if (!res.ok) {
    const corpo = await res.json();
    throw new Error(corpo.mensagem);
  }
  const resumo: ResumoMes = await res.json();
  return resumo;
}

// Se ainda tiver pagamento pendente, a API não fecha e devolve um aviso pra secretária confirmar
export async function fecharFolha(mes: string, confirmar: boolean) {
  const res = await fetch(`${API}/Periodo/FecharPeriodo/${mes}?confirmar=${confirmar}`, { method: "POST" });
  if (!res.ok) {
    const corpo = await res.json();
    if (corpo.requerConfirmacao) return corpo.mensagem;
    throw new Error(corpo.mensagem);
  }
  return null;
}

export async function reabrirFolha(mes: string) {
  const res = await fetch(`${API}/Periodo/ReabrirPeriodo/${mes}`, { method: "PUT" });
  if (!res.ok) {
    const corpo = await res.json();
    throw new Error(corpo.mensagem);
  }
}
