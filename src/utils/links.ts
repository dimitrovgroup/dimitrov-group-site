/**
 * URL helpers for external scholarly identifiers.
 * Both functions return '' if the input is malformed,
 * so callers can do `if (url) ...` to decide whether to render the link.
 */

const PMID_RE = /^\d{1,9}$/;
// A DOI starts with "10." followed by a 4-9 digit registrant, a slash, and a suffix.
// Suffix may contain unreserved characters; we keep this permissive.
const DOI_RE = /^10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i;

export function pubmedUrl(pmid: string): string {
  if (!pmid) return '';
  const clean = pmid.trim();
  if (!PMID_RE.test(clean)) return '';
  return `https://pubmed.ncbi.nlm.nih.gov/${clean}/`;
}

export function doiUrl(doi: string): string {
  if (!doi) return '';
  const clean = doi.trim().toLowerCase();
  if (!DOI_RE.test(clean)) return '';
  return `https://doi.org/${clean}`;
}
