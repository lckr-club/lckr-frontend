'use client';
import CalendarioHoras from "../components/CalendarioHoras";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useCoaches } from "../context/CoachesContext";
import type { Aula } from "@/types/aula";
import { mensagemDeErro } from "@/lib/api";
import { MESES, formatarHoras } from "@/lib/formatar";
import { buscarAulas } from "@/services/aula";

function buscarAulasDoMes(ano: number, mes: number) {
  const ultimoDia = new Date(ano, mes, 0).getDate();
  const mm = String(mes).padStart(2, "0");
  return buscarAulas(`${ano}-${mm}-01`, `${ano}-${mm}-${ultimoDia}`);
}

export default function HorasPage() {
  const { coaches } = useCoaches();
  const [data, setData] = useState(new Date());
  const [cpfFiltro, setCpfFiltro] = useState("");
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [erro, setErro] = useState("");

  const ano = data.getFullYear();
  const mes = data.getMonth() + 1;
  const ehMesAtual = new Date().getMonth() === data.getMonth() && new Date().getFullYear() === data.getFullYear();

  useEffect(() => {
    async function carregarAulas() {
      try {
        const lista = await buscarAulasDoMes(ano, mes);
        setAulas(lista);
        setErro("");
      } catch (e) {
        setErro(mensagemDeErro(e));
      }
    }

    carregarAulas();
  }, [ano, mes]);

  async function recarregar() {
    try {
      const lista = await buscarAulasDoMes(ano, mes);
      setAulas(lista);
    } catch (e) {
      setErro(mensagemDeErro(e));
    }
  }

  const visiveis = cpfFiltro ? aulas.filter((a) => a.cpfCoach === cpfFiltro) : aulas;
  // cada aula da grade tem 1 hora
  const totalHoras = visiveis.length;

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Lançamento de horas</h1>
          <p className="mt-1 text-sm text-neutral-500">
            {visiveis.length} {visiveis.length === 1 ? "lançamento" : "lançamentos"}, {formatarHoras(totalHoras)} em {MESES[mes - 1]} de {ano}.
          </p>
        </div>

        <div className="flex gap-3">
          <select
            aria-label="Filtrar por coach"
            value={cpfFiltro}
            onChange={(e) => setCpfFiltro(e.target.value)}
            className="w-56 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
          >
            <option value="">Todos os coaches</option>
            {coaches.map((c) => (
              <option key={c.cpf} value={c.cpf}>{c.nome}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center mx-auto align-center gap-4 mt-4 w-full max-w-7xl justify-center">
        <button
          type="button"
          aria-label="Mês anterior"
          onClick={() => setData(new Date(ano, mes - 2, 1))}
          className="cursor-pointer p-2 text-neutral-600 hover:text-neutral-900"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="flex w-44 mt-4 flex-col items-center">
          <p className="text-lg font-semibold text-neutral-900 first-letter:uppercase">
            {MESES[mes - 1]} de {ano}
          </p>
          <span className={`text-xs font-medium text-brand-text ${ehMesAtual ? "" : "invisible"}`}>
            mês atual
          </span>
        </div>
        <button
          type="button"
          aria-label="Próximo mês"
          onClick={() => setData(new Date(ano, mes, 1))}
          className="cursor-pointer p-2 text-neutral-600 hover:text-neutral-900"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      {erro && <p className="mt-4 text-sm text-red-600">{erro}</p>}

      <CalendarioHoras ano={ano} mes={mes} aulas={visiveis} onSalvar={recarregar} />
    </main>
  );
}
