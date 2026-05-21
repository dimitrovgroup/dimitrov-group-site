import { defineCollection, z } from 'astro:content';

/**
 * Members of the Orthopaedic Research Group.
 * One markdown file per member at /src/content/members/<slug>.md.
 * The body of the file becomes the long bio.
 */
const members = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      // Required
      name: z.string(),
      role: z.enum([
        'Principal Investigator',
        'Senior Researcher',
        'Assistant Professor & PhD Student',
        'PhD Student',
        'Group Member',
        'Fellow',
        'Resident',
        'Research Assistant',
        'Member',
        'Alumni',
      ]),
      order: z.number().default(100), // smaller numbers appear first
      // Optional
      title: z.string().optional(), // e.g. "Prof. Dr. med."
      shortBio: z.string().max(280).optional(),
      portrait: image().optional(),
      email: z.string().email().optional(),
      orcid: z.string().regex(/^\d{4}-\d{4}-\d{4}-\d{3}[0-9X]$/).optional(),
      affiliation: z.string().optional(),
      pubmedName: z.string().optional(), // PubMed-style "Lastname I" used for author matching in citations
      initials: z.string().min(1).max(4).optional(), // override for the avatar monogram (e.g. "ND")
      interests: z.array(z.string()).default([]),
      collaborators: z.array(z.string()).default([]), // slugs of collaborators
      external: z.boolean().default(false), // true for collaborators (Georgi Enev)
      draft: z.boolean().default(false),
    }),
});

/**
 * Projects: ongoing and completed prospective studies, registries, clinical trials.
 */
const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    title_de: z.string().optional(), // optional German title
    status: z.enum(['Ongoing', 'Recruiting', 'Completed', 'Planned', 'Paused']),
    type: z.string().optional(), // e.g. "prospective observational study", "prospective registry"
    startYear: z.number().int().min(1990).max(2100),
    endYear: z.number().int().min(1990).max(2100).optional(),
    summary: z.string(),
    ethicsApproval: z.string().optional(), // e.g. "Ethics Cmte UMHAT, ref. 2024-OR-017"
    registry: z
      .object({
        name: z.string(), // e.g. "ClinicalTrials.gov"
        id: z.string(), // e.g. "NCT0XXXXXXX"
      })
      .optional(),
    principalInvestigator: z.string().optional(), // member slug
    leadMember: z.string().optional(), // member slug of project lead / owner
    members: z.array(z.string()).default([]), // member slugs
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

/**
 * Activities: team activities (TBAs) and congresses.
 */
const activities = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    title_bg: z.string().optional(), // optional Bulgarian title (not currently rendered)
    kind: z.enum(['team-activity', 'congress']),
    date: z.coerce.date(), // YYYY-MM-DD in frontmatter — used for sorting
    dateDisplay: z.string().optional(), // override rendered date string (e.g. "September 2026", "29–31 October 2026")
    status: z.enum(['upcoming', 'past']).default('upcoming'),
    location: z.string().optional(),
    url: z.string().url().optional(), // external link to the event page
    // Congress-specific
    presentation: z
      .object({
        title: z.string(),
        type: z.enum(['Oral', 'Poster', 'Invited lecture', 'Keynote', 'Symposium']),
        presenter: z.string().optional(), // member slug
      })
      .optional(),
    summary: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  members,
  projects,
  activities,
};
