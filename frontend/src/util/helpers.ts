import type { Job,  Match } from "./NetworkModels";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`/api${path}`, {
        ...options,
        headers: { "Content-Type": "application/json", ...options.headers },
    });

    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.detail ?? `Request failed: ${res.status}`);
    }
    return res.status === 204 ? (undefined as T) : res.json();
}

const ROMAN = ["", "I", "II", "III", "IV", "V"];

export function toRoman(n: number): string {
  return ROMAN[n] ?? String(n);
}

export function winRate(wins: number, losses: number): number | null {
  const games = wins + losses;
  if (games === 0) return null;
  return (wins / games) * 100;
}

export async function waitForJob<T>(jobId: number, intervalMs = 1500, timeoutMs = 60_000): Promise<Job<T>> {
  const started = Date.now();

  while (Date.now() - started < timeoutMs) {
    const job = await api<Job<T>>(`/jobs/${jobId}`);

    if (job.status === "done") return job;
    if (job.status === "failed") throw new Error(job.error ?? "Job failed");

    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  throw new Error("Timed out waiting for Bokutachi...")
}

export async function waitForMatch(matchId: number, intervalMs = 1500, timeoutMs = 60_000): Promise<Match> {
  console.log("HI")
  const started = Date.now();

  while (Date.now() - started < timeoutMs) {
    const match = await api<Match>(`/match/${matchId}`);

    if (match.status != "active") return match;

    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  throw new Error("Timed out waiting for match...");
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatClock(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit"
  })
}

export function calculateTimeLeftPercentage(startTime: string | undefined, cutoffTime: string | undefined, msLeft: number | undefined) {
  const start = startTime ? new Date(startTime).getTime() : null;
  const end = cutoffTime ? new Date(cutoffTime).getTime() : null;

  if (!start || !end || msLeft === undefined)
    return 0

  const total = end - start;
  const progressTotal = end - (end - msLeft)

  return Math.min((100 - (progressTotal / total) * 100), 100);
}

export function toFixedTruncated(value: number, digits = 2) {
  const factor = 10 ** digits;
  return (Math.trunc(value * factor + Number.EPSILON * factor) / factor).toFixed(digits)
}