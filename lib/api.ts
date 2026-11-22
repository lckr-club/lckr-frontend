export const API = process.env.NEXT_PUBLIC_API_URL;

export function mensagemDeErro(e: unknown) {
  return e instanceof Error ? e.message : "Algo deu errado. Tente de novo.";
}

// Faz o fetch mandando o token que a API devolveu no login
export async function fetchComToken(url: string, opcoes: RequestInit = {}) {
  const usuario = JSON.parse(localStorage.getItem("usuario") ?? "{}");

  const res = await fetch(url, {
    ...opcoes,
    headers: { ...opcoes.headers, Authorization: `Bearer ${usuario.token}` },
  });

  // 401 = token vencido ou inválido, então volta pro login
  if (res.status === 401) {
    localStorage.removeItem("usuario");
    if (window.location.pathname !== "/login") {
      window.location.replace("/login");
    }
    throw new Error("Sua sessão expirou. Entre de novo.");
  }

  return res;
}
