export type BlogEntry = {
  id: string;
  date: string;
  title: string;
  topic: string;
  paragraphs: string[];
};

export const blogAuthor = "Hitaesh";

// Example writing for the initial layout, not a record of published personal posts.
// Replace these entries with real writing and set this flag to false when ready.
export const sampleContent = true;

export const blogEntries: BlogEntry[] = [
  {
    id: "002",
    date: "2026-10-11",
    title: "a quick project update",
    topic: "Building",
    paragraphs: [
      "This is a sample post. Somewhere to write about what I'm making, what works, and what still needs fixing.",
      "A longer update could go into how I built it or something I got stuck on. For now, this is just here to show what a post looks like when you open it.",
    ],
  },
  {
    id: "001",
    date: "2026-10-10",
    title: "something I learned",
    topic: "Notes",
    paragraphs: [
      "Another sample post. This one shows a shorter note, like a bug I figured out or a concept I finally understood. Doesn't have to be a whole article.",
    ],
  },
];

export function groupEntries(entries: BlogEntry[]) {
  const groups = new Map<string, BlogEntry[]>();
  for (const entry of [...entries].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id))) {
    const group = groups.get(entry.date) ?? [];
    group.push(entry);
    groups.set(entry.date, group);
  }
  return Array.from(groups, ([date, entries]) => ({ date, entries }));
}
