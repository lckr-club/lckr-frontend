export type FolhaCoach = {
  cpfCoach: string;
  nomeCoach: string;
  quantidadeAulas: number;
  horas: number;
  valor: number;
};

export type Folha = {
  mesReferencia: string;
  statusPeriodo: "aberto" | "fechado";
  totalHoras: number;
  valorTotal: number;
  coaches: FolhaCoach[];
  pendencias: { mensagem: string }[];
};

export type ResumoMes = {
  mesReferencia: string;
  totalHoras: number;
  horasAgendadas: number;
  coachesAtivos: number;
  valorRealizado: number;
  folhaPrevista: number;
  aulasSemValor: number;
};
