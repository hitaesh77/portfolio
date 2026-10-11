export type BlogText = string | (string | { text: string; href: string })[];
export type BlogBlock =
  | { type: "paragraph"; text: BlogText }
  | { type: "heading"; text: string }
  | { type: "orderedList"; items: BlogText[] };

export type BlogEntry = {
  id: string;
  date: string;
  title: string;
  slug: string;
  excerpt: string;
  content: BlogBlock[];
};

export const blogAuthor = "hitaesh77";
export const sampleContent = false;

export const blogEntries: BlogEntry[] = [
  {
    "id": "7c4a9e2",
    "date": "2026-10-11",
    "title": "how I built this site",
    "slug": "how-i-built-this-site",
    "excerpt": "How I added a live LeetCode tracker to my portfolio without a backend or database.",
    "content": [
      {
        "type": "paragraph",
        "text": "I added a blog to my portfolio because I wanted to talk about my engineering thought process and share some of the experiences and failures that I have had. Partly for my own documentation purposes, but also in case someone is bored enough to stalk my portfolio and read some entries."
      },
      {
        "type": "paragraph",
        "text": "The first thing I want to talk about is how I designed this site and its features."
      },
      {
        "type": "paragraph",
        "text": [
          "It started as a frontend only Vercel project, since it just needed to showcase who I was. I love Vercel. It is so easy to use ",
          {
            "text": "Next.js",
            "href": "https://nextjs.org/"
          },
          " and get a webpage up and running in under 10 minutes. I especially like how easy it is to add custom domains and things like analytics and observability."
        ]
      },
      {
        "type": "paragraph",
        "text": "Anyways, I was (and still am) very much struggling with keeping up with LeetCode practice. I thought that one thing that could keep me accountable is a live progress tracker or streak that can be seen on some sort of public interface. I decided that my portfolio was the perfect place for that lol."
      },
      {
        "type": "heading",
        "text": "How I Built It"
      },
      {
        "type": "paragraph",
        "text": [
          "I did not want to pay for anything more on this site beyond the domain ",
          {
            "text": "hitaesh.com",
            "href": "https://hitaesh.com/"
          },
          ", so I really wanted to avoid things like a backend, database, and other services. At the same time, I needed a way to keep track of my progress, both past and live."
        ]
      },
      {
        "type": "paragraph",
        "text": "That is when I realized that:"
      },
      {
        "type": "orderedList",
        "items": [
          "My NeetCode submissions already automatically sync to a GitHub repository (a cool feature from NeetCode themselves, thank you very much!).",
          "GitHub information for public repositories is easily retrievable through a public API."
        ]
      },
      {
        "type": "paragraph",
        "text": "With that information, I simply added a GitHub workflow to my NeetCode submissions repository. Whenever a new commit is created by a submission sync, the workflow kicks off a script I wrote (that also lives in the same repo), which updates a JSON file that, you guessed it, lives in the NeetCode submissions repo."
      },
      {
        "type": "paragraph",
        "text": "The JSON contains all the information my portfolio needs, from which problems were completed to their difficulty and other metadata. It is all publicly accessible. The portfolio retrieves that JSON, performs calculations for things like streaks and other statistics on the frontend, and displays everything in a pretty fashion."
      },
      {
        "type": "paragraph",
        "text": "I thought that was a really cool way to solve a problem that might typically be thought to need a proper backend service, APIs, and a database or some other storage method. My use case is lightweight, so I am happy with my lightweight solution!"
      },
      {
        "type": "heading",
        "text": "Some Other Thoughts"
      },
      {
        "type": "paragraph",
        "text": "Some thoughts I had while developing this were about creating a personal AI agent that checks the website, and if I miss a streak, either berates me on WhatsApp (cuz free texting API lol) or just publicly shames me on my website."
      },
      {
        "type": "paragraph",
        "text": "However, that requires API costs and some level of upkeep that I just did not feel like implementing at the moment. But it may come in the future."
      },
      {
        "type": "paragraph",
        "text": "That being said, I do think personal AI agents that integrate with our personal lives are the future, and I have tons of ideas on how that may look. Interestingly, I think my ideas are being validated by the creation of Meta Muse and the new DoorDash text to order agent they released."
      },
      {
        "type": "paragraph",
        "text": "I have a lot of thoughts on this, and will definitely share them in future posts."
      },
      {
        "type": "paragraph",
        "text": "Thanks for reading!"
      }
    ]
  }
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
