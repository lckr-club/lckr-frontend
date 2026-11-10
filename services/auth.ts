import { API } from "@/lib/api";

export async function login(email: string, senha: string) {
  const res = await fetch(`${API}/Auth/Login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });
  if (!res.ok) {
    const corpo = await res.json();
    throw new Error(corpo.mensagem);
  }
  return res.json();
}
