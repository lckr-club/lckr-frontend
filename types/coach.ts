export type StatusCoach = "ativo" | "inativo";

// Formato que o o coach chega da api
export type Coach = {
  cpf: string;
  nome: string;
  email: string;
  telefone: string;
  especialidade: string;
  status: StatusCoach;
  valorHora: number;
  organizationCnpj: string;
};

// Oque o nosso formulário envia para a api
export type DadosCoach = {
  cpf: string;
  nome: string;
  email: string;
  telefone: string;
  especialidade: string;
  valorHora: number;
};
