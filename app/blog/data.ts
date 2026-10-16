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
    "id": "e8b6c31",
    "date": "2026-10-16",
    "title": "how i took down a client's ai receptionist",
    "slug": "learning-from-failures-1-how-i-took-down-a-clients-ai-receptionist",
    "excerpt": "How an appointment-fetching enhancement hit an EHR rate limit, took down a client's AI receptionist, and taught me about concurrency, load testing, and communication.",
    "content": [
      {
        "type": "paragraph",
        "text": "I think it is very important as an engineer to fail. I believe it is one of the best ways to get down and dirty and really exercise your problem solving skills. In the age of AI, getting a reasonably good outcome without much problem solving is becoming increasingly common. I believe the engineers who will stand out are the ones who have failed enough times to know how to make good decisions and reason their way through difficult problems."
      },
      {
        "type": "paragraph",
        "text": "That is why I am going to be sharing one of my biggest failures today."
      },
      {
        "type": "heading",
        "text": "the failure"
      },
      {
        "type": "paragraph",
        "text": [
          "Earlier this year, I worked at ",
          {
            "text": "Kyron Medical",
            "href": "https://www.kyronmedical.com/"
          },
          ", a health tech startup bringing AI voice agents to medical practices. I joined the team tasked with leading our EHR (electronic health record) integrations. My job was to connect our app and its various services to new EHR systems, allowing us to do things like retrieve patient records, book appointments, and more."
        ]
      },
      {
        "type": "paragraph",
        "text": "Later on, I was put in charge of one of our newest and most promising products, our AI voice receptionist. This involved building voice agents capable of doing things like booking appointments for patients and providing requested information. I was working across the entire tech stack for this project, including the EHR integrations."
      },
      {
        "type": "paragraph",
        "text": "One of the enhancements I shipped was designed to retrieve as many available appointment slots as possible in a single session. This way, when presenting availability to a patient, our agent could list dates and times back to back without having to wait for another API call in the middle of the conversation."
      },
      {
        "type": "paragraph",
        "text": "Essentially, while the agent was speaking to a patient about something like their name or insurance information, the backend would rapidly make multiple API calls to build an internal list of available appointment dates and times."
      },
      {
        "type": "paragraph",
        "text": "When I tested this solution, it worked great. The overall call experience was much smoother and more human-like than before. Satisfied with my work, I pushed it to prod (at like 2 AM lol) and went to bed."
      },
      {
        "type": "paragraph",
        "text": "The next day, I had a big midterm for my computer architecture class (shoutout Purdue ECE 437), so I turned off my notifications for the whole day."
      },
      {
        "type": "paragraph",
        "text": "I would later learn that this was a big mistake."
      },
      {
        "type": "paragraph",
        "text": "When I finally logged back in after my exam, I was flooded with messages and missed Slack calls. Upon reading them, I learned that our biggest client had turned off our voice receptionist for the day."
      },
      {
        "type": "paragraph",
        "text": "Here's what happened."
      },
      {
        "type": "paragraph",
        "text": "When I pushed the rapid API calling enhancement, I had tested it on both my local machine and the production servers. However, in both cases, I was the only person \"calling\" the agent."
      },
      {
        "type": "paragraph",
        "text": "When patients started calling our client the next morning, around 8 AM, we suddenly had multiple people trying to book appointments at the same time. With 10+ patients calling simultaneously, and each conversation triggering multiple rapid API requests, we hit the EHR's rate limit for its appointment fetching endpoint."
      },
      {
        "type": "paragraph",
        "text": "As a result, none of our client's patients could book appointments through our receptionist, and the service was eventually turned off for the day."
      },
      {
        "type": "paragraph",
        "text": "This was a huge oversight on my part, and my mistake had a much more far-reaching impact than I could have imagined."
      },
      {
        "type": "paragraph",
        "text": "Safe to say, my CEO was not happy with me."
      },
      {
        "type": "paragraph",
        "text": "I quickly went back in to limit the number of API requests allowed per call and added other guardrails to prevent the same issue from happening again. I also wrote a script to simulate multiple patients calling our receptionist simultaneously, so I could see how the fixes held up under load."
      },
      {
        "type": "paragraph",
        "text": "After testing everything, I pushed the fixes, and our client put the agent back up. It worked perfectly from that day onward."
      },
      {
        "type": "paragraph",
        "text": "However, one full day of outage is a big deal, and we had to work hard to regain the trust of the medical practice we were serving."
      },
      {
        "type": "heading",
        "text": "what i learned"
      },
      {
        "type": "paragraph",
        "text": "I learned a lot from this experience, the first and foremost being to think through as many edge cases as possible and test extensively before pushing code."
      },
      {
        "type": "paragraph",
        "text": "While this was a lesson constantly emphasized in school, I somehow failed to consider what would happen when too many people tried to use the service at once. This is one of the most fundamental problems engineers have to think about when designing systems, yet I completely overlooked it."
      },
      {
        "type": "paragraph",
        "text": "In trying to ship code fast and fail fast, which I believe is a trait startups often strive for, I should have been much more careful in my execution. Moving quickly is important, but that doesn't mean skipping the work needed to make sure something is actually ready for production."
      },
      {
        "type": "paragraph",
        "text": "I also learned about the far-reaching effects that a seemingly simple bug can have, and how with more access comes way more responsibility."
      },
      {
        "type": "paragraph",
        "text": "One of my biggest gripes with working in corporate environments is the number of hoops you have to jump through to make even simple changes to prod. However, this experience showed me exactly why those checks exist. Having systems in place to review, test, and validate changes before deployment can prevent mistakes that end up affecting real people."
      },
      {
        "type": "paragraph",
        "text": "Lastly, I learned an important lesson about communication."
      },
      {
        "type": "paragraph",
        "text": "Had I kept my notifications on, I could have handled the problem much sooner, or at least delegated it to someone else if I was busy with my exam. I think one of the most overlooked aspects of engineering is the importance of soft skills and communication. This experience was a real eye-opener for me to be more aware and accountable, especially when I have committed myself to something."
      },
      {
        "type": "paragraph",
        "text": "At the end of the day, I think this is exactly why failure is so important. I could have learned about rate limits, concurrency, load testing, and production safeguards in a classroom, but actually experiencing the consequences of overlooking them taught me something that I won't forget anytime soon."
      },
      {
        "type": "paragraph",
        "text": "I hope whoever reads this had fun hearing about my failure, and hopefully learned something from it too!"
      }
    ]
  },
  {
    "id": "7c4a9e2",
    "date": "2026-10-11",
    "title": "how i built this site",
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
        "text": "how i built it"
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
        "text": "some other thoughts"
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
