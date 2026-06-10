import yaml from 'js-yaml';
// Inline the YAML at build time via Vite's `?raw` query. This avoids any
// runtime filesystem access; the contents are bundled into the JS.
import publicationsYaml from '~/data/publications.yml?raw';

export type Publication = {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  pmid?: string;
  pubdate?: string;
  doi?: string;
  members: string[];
  seniorAuthor: boolean;
  abstract?: string;
};

let cached: Publication[] | null = null;

function load(): Publication[] {
  if (cached) return cached;
  const parsed = yaml.load(publicationsYaml) as Publication[] | null;
  const list = Array.isArray(parsed) ? parsed : [];
  // Sort desc by pubdate (year + month/day). Fall back to year then title.
  cached = [...list].sort((a, b) => {
    if (a.pubdate && b.pubdate && a.pubdate !== b.pubdate) {
      return b.pubdate.localeCompare(a.pubdate);
    }
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
