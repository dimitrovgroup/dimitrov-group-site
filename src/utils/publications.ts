import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

export type Publication = {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  pmid?: string;
  doi?: string;
  members: string[];
  seniorAuthor: boolean;
  abstract?: string;
};

// Resolve relative to project root. import.meta.url -> /src/utils/publications.ts
const DATA_PATH = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  '../data/publications.yml',
);

let cached: Publication[] | null = null;

function load(): Publication[] {
  if (cached) return cached;
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  const parsed = yaml.load(raw) as Publication[] | null;
  const list = Array.isArray(parsed) ? parsed : [];
  // Normalise + sort desc by year, then by title for stable order.
  cached = [...list].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return a.title.localeCompare(b.title);
  });
  return cached;
}

export function getPublications(): Publication[] {
  return load();
}

export function getPublicationYears(): number[] {
  const years = new Set<number>();
  for (const p of load()) years.add(p.year);
  return [...years].sort((a, b) => b - a);
}

export function getPublicationMemberIds(): string[] {
  const ids = new Set<string>();
  for (const p of load()) for (const m of p.members) ids.add(m);
  return [...ids].sort();
}
