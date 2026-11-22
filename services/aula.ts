import type { Aula } from "@/types/aula";
import { API, fetchComToken } from "@/lib/api";

type NovaAula = {
  dataAula: string;
  horaInicio: string;
  horaFim: string;
  modalidade: string;
  capacidade: number;
  cpfCoach: string;
};

export async function buscarAulas(inicio: string, fim: string) {
  const res = await fetchComToken(`${API}/Aula/ListarAulas?inicio=${inicio}&fim=${fim}`);
  if (!res.ok) {
    const corpo = await res.json();
    throw new Error(corpo.mensagem);
  }
  const aulas: Aula[] = await res.json();
  return aulas;
}

export async function criarAula(dados: NovaAula) {
  const res = await fetchComToken(`${API}/Aula/CriarAula`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) {
    const corpo = await res.json();
    throw new Error(corpo.mensagem);
  }
  const aula: Aula = await res.json();
  return aula;
}

export async function marcarRealizada(id: string) {
  const res = await fetchComToken(`${API}/Aula/AlterarStatusAula/${id}?status=realizada`, { method: "PUT" });
  if (!res.ok) {
    const corpo = await res.json();
    throw new Error(corpo.mensagem);
  }
}

export async function excluirAula(id: string) {
  const res = await fetchComToken(`${API}/Aula/ExcluirAula/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const corpo = await res.json();
    throw new Error(corpo.mensagem);
  }
}
