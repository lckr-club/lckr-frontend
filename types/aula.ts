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
  // preenchido quando a aula teve substituição: quem ia dar a aula antes
  cpfCoachPrevisto: string | null;
  nomeCoachPrevisto: string | null;
};
