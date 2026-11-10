export const API = process.env.NEXT_PUBLIC_API_URL;

export function mensagemDeErro(e: unknown) {
  return e instanceof Error ? e.message : "Algo deu errado. Tente de novo.";
}
