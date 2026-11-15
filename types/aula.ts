export type Aula = {
  id: string;
  dataAula: string;
  horaInicio: string;
  horaFim: string;
  modalidade: string;
  capacidade: number;
  status: "agendada" | "realizada";
  cpfCoach: string;
  nomeCoach: string;
};
