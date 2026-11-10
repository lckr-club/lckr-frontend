import type { Coach, DadosCoach, StatusCoach } from "@/types/coach";
import { API } from "@/lib/api";
import { dataDeHoje } from "@/lib/formatar";

const CNPJ_LCKR = process.env.NEXT_PUBLIC_CNPJ_LCKR;

export async function buscarCoaches() {
  const res = await fetch(`${API}/Coach/ListarCoaches`);
  if (!res.ok) {
    const corpo = await res.json();
    throw new Error(corpo.mensagem);
  }
  const coaches: Coach[] = await res.json();
  return coaches;
}

export async function criarCoach(dados: DadosCoach) {
  const res = await fetch(`${API}/Coach/CriarCoach`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...dados, status: "ativo", organizationCnpj: CNPJ_LCKR }),
  });
  if (!res.ok) {
    const corpo = await res.json();
    throw new Error(corpo.mensagem);
  }
}

export async function atualizarCoach(cpf: string, dados: DadosCoach, status: StatusCoach) {
  const res = await fetch(`${API}/Coach/AtualizarCoach/${cpf}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...dados, status, organizationCnpj: CNPJ_LCKR }),
  });
  if (!res.ok) {
    const corpo = await res.json();
    throw new Error(corpo.mensagem);
  }
}

export async function registrarReajuste(cpf: string, valorHora: number) {
  const res = await fetch(`${API}/HistoricoValor/RegistrarReajuste/${cpf}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ valorHora, dataInicio: dataDeHoje() }),
  });
  if (!res.ok) {
    const corpo = await res.json();
    throw new Error(corpo.mensagem);
  }
}

export async function inativarCoach(cpf: string) {
  const res = await fetch(`${API}/Coach/InativarCoach?cpf=${cpf}`, { method: "PUT" });
  if (!res.ok) {
    const corpo = await res.json();
    throw new Error(corpo.mensagem);
  }
}

export async function reativarCoach(cpf: string) {
  const res = await fetch(`${API}/Coach/ReativarCoach?cpf=${cpf}`, { method: "PUT" });
  if (!res.ok) {
    const corpo = await res.json();
    throw new Error(corpo.mensagem);
  }
}
