import { afterEach, describe, expect, test, vi } from "vitest";
import { MESES, dataDeHoje, formatarHoras, formatarMoeda } from "./formatar";

// o toLocaleString coloca um espaço especial ( ) entre o R$ e o número
describe("formatarMoeda", () => {
  test("formata o valor em reais", () => {
    expect(formatarMoeda(62.5)).toBe("R$ 62,50");
  });

  test("coloca ponto no milhar", () => {
    expect(formatarMoeda(1562.5)).toBe("R$ 1.562,50");
  });
});

describe("formatarHoras", () => {
  test("mostra horas inteiras com h no final", () => {
    expect(formatarHoras(25)).toBe("25h");
  });

  test("usa vírgula nas horas quebradas", () => {
    expect(formatarHoras(2.5)).toBe("2,5h");
  });
});

describe("dataDeHoje", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test("devolve a data no formato da API, com zero na frente", () => {
    // finge que hoje é 9 de novembro de 2026 (no JavaScript o mês começa em 0)
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 10, 9));

    expect(dataDeHoje()).toBe("2026-11-09");
  });
});

describe("MESES", () => {
  test("tem os 12 meses começando em janeiro", () => {
    expect(MESES).toHaveLength(12);
    expect(MESES[0]).toBe("janeiro");
    expect(MESES[11]).toBe("dezembro");
  });
});
