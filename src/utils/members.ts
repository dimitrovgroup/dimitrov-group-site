import { getCollection } from 'astro:content';

/**
 * Builds a map of `memberSlug → pubmedName` for all non-draft members that
 * declare a `pubmedName` in their frontmatter. Used by PublicationItem to
 * bold group-member authors in citation lines.
 */
export async function getMemberPubmedNames(): Promise<Record<string, string>> {
  const members = await getCollection('members', ({ data }) => !data.draft);
  const map: Record<string, string> = {};
  for (const m of members) {
    if (m.data.pubmedName) map[m.slug] = m.data.pubmedName;
  }
  return map;
}
