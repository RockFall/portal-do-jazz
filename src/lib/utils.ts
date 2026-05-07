import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isToday, isTomorrow, isThisWeek } from "date-fns";
import { ptBR } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (isToday(d)) return "Hoje";
  if (isTomorrow(d)) return "Amanhã";
  return format(d, "EEE, d MMM", { locale: ptBR });
}

export function formatDateFull(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR });
}

export function formatTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "HH:mm", { locale: ptBR });
}

export function formatPrice(min?: number | null, max?: number | null): string {
  if (!min && !max) return "Entrada gratuita";
  if (min === 0) return "Entrada gratuita";
  if (min && max && min !== max)
    return `R$ ${min.toFixed(0)} – R$ ${max.toFixed(0)}`;
  if (min) return `R$ ${min.toFixed(0)}`;
  return "Consultar";
}

export function getDayLabel(
  date: Date | string
): "hoje" | "amanhã" | "semana" | "futuro" {
  const d = typeof date === "string" ? new Date(date) : date;
  if (isToday(d)) return "hoje";
  if (isTomorrow(d)) return "amanhã";
  if (isThisWeek(d, { locale: ptBR })) return "semana";
  return "futuro";
}
