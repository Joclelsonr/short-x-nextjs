/**
 * Formata uma sequência de datas no formato português brasileiro
 * @param date A sequência de data a ser formatada
 * @param format O tipo de formato, 'longo' ou 'curto'
 * @returns A sequência de data formatada no formato português brasileiro
 */

export function formatDateBRL(date: string, format?: "long" | "short"): string {
  const newDate = new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: format === "long" ? "long" : "2-digit",
    year: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
  });
  return newDate;
}
