export type BlogText = string | (string | { text: string; href: string })[];
export type BlogBlock =
  | { type: "paragraph"; text: BlogText }
  | { type: "heading"; text: string }
  | { type: "orderedList"; items: BlogText[] }
  | { type: "image"; src: string; alt: string; caption: string; width: number; height: number };

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
  "id": "f3a8c62",
  "date": "2026-11-05",
  "title": "my engineering dilemma",
  "slug": "my-engineering-dilemma",
  "excerpt": "Finding my footing as an engineer in the age of AI, from robotics and RISC-V to the intuition behind system design.",
  "content": [
    {
      "type": "paragraph",
      "text": "One of the hottest topics in this space right now is what the software engineering landscape will look like as AI becomes more widely adopted. I want to discuss how I have been navigating this space, my own personal dilemma when it comes to learning and programming, and overall what I think it means to be a good engineer. I have a lot of thoughts on this, and they are somewhat jumbled in my head, so this is my attempt at formalizing what I am thinking."
    },
    {
      "type": "paragraph",
      "text": "To start, I want to be a good engineer. I have had a deep passion for engineering for as long as I can remember, and began getting involved in software specifically in middle school. However, I have noticed this phenomenon in myself where I feel as though I am overly dependent on AI, and I feel like I am not exercising the part of my brain that made me passionate about programming in the first place."
    },
    {
      "type": "heading",
      "text": "what i love about engineering"
    },
    {
      "type": "paragraph",
      "text": "I think the thing about engineering and programming I fell in love with is the problem solving aspect of it. When I think back to when I had the most fun coding, I think back to my high school robotics team, where I spent hours on end learning new algorithms, math, techniques, sensors, and more to try and get my robot to move as fast and accurately as possible."
    },
    {
      "type": "paragraph",
      "text": "I have a core internal log of all my major achievements in robotics:"
    },
    {
      "type": "orderedList",
      "items": [
        "When I first started using functions to organize my code better",
        "When I first started tracking robot movement based on integrated motor encoders instead of just letting the motors run for x amount of time",
        "When I first started using sensors like gyroscopes and laser distance sensors to get real world feedback about the robot's position",
        "When I first started using PIDs to have smoother velocity curves for the robot",
        "When I first started using absolute position instead of relative position, which made the accuracy of our robot's turns and straight line movement 10x better"
      ]
    },
    {
      "type": "paragraph",
      "text": [
        "Every one of these improvements came with hours of research, implementation, testing, and debugging, and the dopamine hit at the end of this process was always worth it. I became a much better programmer and problem solver through this tedious process. Much of my high school code can be found here: ",
        {
          "text": "my high school robotics code",
          "href": "https://github.com/hitaesh77/91f-VEX-Worlds-2021-2022"
        }
      ]
    },
    {
      "type": "paragraph",
      "text": [
        "Another example of when I loved engineering was last semester, when I took my computer architecture class and designed a dual-core RISC-V processor from scratch in SystemVerilog. As Claude was not as good at Verilog at the time, and it could not understand what I wanted or the flow of data between internal components of the processor very well, I spent a long time figuring it out myself with my partner ",
        {
          "text": "Sai Vura",
          "href": "https://www.linkedin.com/in/sai-vura/"
        },
        ". We spent hours in the lab designing, implementing, and testing the CPU until it performed how we wanted. Dealing with hazards, branching, atomicity, cache coherence, locks, and more really challenged my brain, and much like high school, the dopamine hit at the end of solving each of these problems was so worth the \"pain\" we went through. The code for the CPU and the RTL diagram can be found here: ",
        {
          "text": "the CPU code and RTL diagram",
          "href": "https://gitshare.me/repo/074b76e0-3e86-401f-93ad-befa37215b2a"
        },
        "."
      ]
    },
    {
      "type": "image",
      "src": "/images/risc-v-pipeline.png",
      "alt": "RISC-V RTL diagram showing the processor pipeline, hazard and forwarding units, instruction and data caches, memory controller, and RAM.",
      "caption": "the RISC-V pipeline, caches, and memory controller Sai and I designed",
      "width": 2968,
      "height": 2672
    },
    {
      "type": "heading",
      "text": "the core dilemma"
    },
    {
      "type": "paragraph",
      "text": "The dilemma I am facing right now is feeling more like an LLM prompter than a real engineer. What I liked about these past projects was the problem solving aspect of it, and feeling like I accomplished some major feat through trial and error. Nowadays, it is so easy to one shot a proper solution with an agent like Codex. For example, my LeetCode-to-portfolio syncing process seems like such an ingenious idea to me, but it was ChatGPT that offered separate solutions for me to choose from. I did not design the system myself. That bothers me a lot."
    },
    {
      "type": "paragraph",
      "text": [
        "That really started to make me question: Am I even a good engineer, and what does it mean to be a good engineer? Similar to my ",
        {
          "text": "previous post about math",
          "href": "/blog/what-does-it-mean-to-be-good-at-math"
        },
        ", I think a lot of good engineers gain a sort of engineering intuition that comes from years of experience and problem solving. But if all my solutions are coming from an LLM, isn't the LLM the true engineer? Aren't I just the vessel that phones a friend? Will I ever get that intuition to know what is good and what is bad in the world of software?"
      ]
    },
    {
      "type": "paragraph",
      "text": "I have done a lot of reflection on this, and I think being a good engineer boils down to gaining intuition in these four categories:"
    },
    {
      "type": "orderedList",
      "items": [
        "System design",
        "Logic design",
        "Code/syntax design",
        "Debugging skills"
      ]
    },
    {
      "type": "paragraph",
      "text": "I feel like these are different abstractions of software, and I want to discuss them in detail, starting from the bottom up."
    },
    {
      "type": "heading",
      "text": "code/syntax design"
    },
    {
      "type": "paragraph",
      "text": [
        "This one bothers me the most. I recently read Mitchell Hashimoto's (former CEO of HashiCorp) blog on his AI adoption journey: ",
        {
          "text": "my AI adoption journey",
          "href": "https://mitchellh.com/writing/my-ai-adoption-journey"
        },
        ". He discusses how when he first started using AI, his coding ability was so good that he was evaluating and correcting the AI and his prompts until it started coding like him. As a relative beginner in the space, I find this wild since I know that coding agents have 100x better coding skills than me."
      ]
    },
    {
      "type": "paragraph",
      "text": "At this point, I know that I cannot code as well as AI can. It has the knowledge of the entire internet at its fingertips, while I have to constantly look up how to raise exceptions in Python. The gap is significant, and at this point, I feel like my productivity would simply be stunted if I did not use agents to write code, whether it be in school or the workplace. And that is truly terrifying since it means I will never be as good a programmer as the greats of the past who built the internet we are using today. I will never be as good at coding as someone like Mitchell Hashimoto."
    },
    {
      "type": "paragraph",
      "text": "As I sit with this fact, I realize that if I can't be a good engineer at this level, that means I need to be a great engineer at other abstractions of the process."
    },
    {
      "type": "heading",
      "text": "logic design"
    },
    {
      "type": "paragraph",
      "text": "At this level, I think this is what LeetCode tests us on. It tests our ability to look at a fresh problem, understand the DSA behind an optimal solution, and design logic that will allow us to solve the problem efficiently and accurately. I do think this is more of a gray area, somewhere between the levels of syntax design and system design, but I find it equally as important."
    },
    {
      "type": "paragraph",
      "text": "When we write code, the logic of the code is what the developer should have in mind before touching a single key. When we outsource the coding to an agent, we start to lose control of the logic a little bit. Logic design definitely goes hand in hand with code/syntax, but I feel like we have more control over it."
    },
    {
      "type": "paragraph",
      "text": "For example, let's say we want to implement a caching mechanism for an API to reduce unnecessary database calls. We could just prompt an LLM to implement caching, and it would probably come up with a reasonable solution and write all the code for us. But an engineer with intuition and experience might think about the problem a little differently. They might first ask what data actually needs to be cached, when that cache should expire, how to handle stale data, and what should happen when the cache misses. They could then design the logic around these decisions, perhaps using a cache-aside pattern with a TTL, and have the agent implement that specific solution."
    },
    {
      "type": "paragraph",
      "text": "In both cases, the end result might be functionally identical, but I think there is a significant difference in how we got there. In the latter case, the design of the logic is more clearly present in the engineer's thinking process. The engineer is the one making decisions, while the agent is simply translating those decisions into code."
    },
    {
      "type": "paragraph",
      "text": "If I can't be the best coder around, I want to at least start getting better at designing the logic that the code should execute, and very explicitly prompting an agent to implement my thoughts. That way, the thinking is done by me, not the agent."
    },
    {
      "type": "paragraph",
      "text": "This abstraction is definitely a bit more convoluted and difficult to understand, but I am just putting my thoughts on paper. That leads me to the next abstraction."
    },
    {
      "type": "heading",
      "text": "system design"
    },
    {
      "type": "paragraph",
      "text": "This is my favorite abstraction of software engineering, and the one I want to become the best at. When I think back to the projects I mentioned earlier, part of the fun was definitely writing the code and debugging it, but most of it was researching new techniques and designing an optimal system. With the robot, slowly designing a closed loop system of sensor input, PID, motion algorithms, states, etc. was the most rewarding and enjoyable part of the challenge. With the RISC-V processor, designing the RTL diagram and how each component of the processor interacted with the others was the most enjoyable part of it."
    },
    {
      "type": "paragraph",
      "text": "Right now, I very much feel myself using AI to design systems. What database should be used? Do we need caching? How does security play into this? Where do we store documents? Can this be done serverless, or do we need a continuously running server? However, I also feel myself diving deeper into each design decision and asking more questions, because I genuinely enjoy learning about this and want to know more. This is where I feel the most like an engineer, and this is where I want to improve the most. If I can't be the best coder or the best logic designer, I want to be the best architect who builds elegant systems."
    },
    {
      "type": "heading",
      "text": "what now"
    },
    {
      "type": "paragraph",
      "text": "I have unfortunately made peace with the fact that I may never reach the level of coding skills that I want to have. In this age, the only way to get to that level is to do my own personal projects and force myself to not use AI, which I have been doing from time to time, but that sort of part-time experience is definitely not enough to get to where I want to be."
    },
    {
      "type": "paragraph",
      "text": "That being said, I think I found a new passion and a way to prove to myself that I am a good engineer, and that is system design. These days, I find myself asking how a lot of the apps I use are designed and architected on the backend, and I have spent a lot of time trying to learn from these. Whether it be how Jira works or how Splunk is able to search through hundreds of thousands of records in a few seconds, I find myself really interested in these kinds of topics, and I want to learn."
    },
    {
      "type": "paragraph",
      "text": "Moving forward, I think I will be trying to understand how a lot of the apps we use today work in the background, and that will be my avenue for exploring and gaining intuition. Seeing how different teams have designed solutions, conversing with AI to test my knowledge and dive deeper into details that may not be officially published, and just reading about system design fundamentals will hopefully get me to the point I want to be."
    },
    {
      "type": "paragraph",
      "text": "I hope to write often about my learnings, and I think I have somewhat of a path forward to becoming a better engineer."
    }
  ]
},
  {
    "id": "a4d9f20",
    "date": "2026-10-28",
    "title": "what does it mean to be good at math?",
    "slug": "what-does-it-mean-to-be-good-at-math",
    "excerpt": "Thoughts on pattern recognition, intuition, and what being good at math can teach us about engineering.",
    "content": [
      {
        "type": "paragraph",
        "text": [
          "I have always thought of myself as being good at math. While I haven’t done any math competitions or Olympiads or anything, I have always found math to be one of the more comfortable subjects throughout school and college. I do believe that my GPA throughout high school and college can attest to my math skills, at least at an academic level. But recently, I had a conversation with my roommate, ",
          {
            "text": "Vikash Gunalan",
            "href": "https://www.linkedin.com/in/vikash-gunalan/"
          },
          ", who I have also always considered to be naturally gifted at math, about what it actually means to be good at math. And that got me thinking…"
        ]
      },
      {
        "type": "paragraph",
        "text": "For context, Vikash and I were in the same calculus course in high school, and we were the type to show up late to class, half-ass the homework, barely study, and somehow consistently score better than most of the class. When we talked about why we were good at math, the argument Vikash brought up was pattern recognition."
      },
      {
        "type": "paragraph",
        "text": "I did not particularly like that answer. To me, pattern recognition seemed to imply a lot of hard work and practice, eventually leading to the ability to identify the underlying concept or pattern we are supposed to use. But our experience in high school seemed to directly contradict that. We barely practiced, yet still performed well. However, thinking back, the most difficult part of that class was not necessarily the calculus concepts themselves, but the algebra required to solve the problems, which we had both recently spent a lot of time reviewing for SAT prep. So maybe we had developed that pattern recognition through practice, just not in the calculus classroom. That meant pattern recognition was still on the table."
      },
      {
        "type": "paragraph",
        "text": "Vikash and I also watched a good number of videos about famous mathematicians like Gauss, Euler, Newton, Ramanujan, and more. What fascinated me about these individuals was their ability to discover, develop, or formalize entirely new mathematical concepts. These mathematicians are legendary and undoubtedly some of the best to ever do it, but what actually made them so good? Was it simply a tremendous amount of interest that led to practice, which eventually led to extraordinary pattern recognition? That argument could certainly be made, but I couldn't help feeling that there was something more to it. Some sort of intuition, or perhaps an ability to visualize and reason about mathematical ideas in ways that other people couldn't."
      },
      {
        "type": "paragraph",
        "text": "I also have friends who struggled quite a bit in that same high school calculus class. Even after hours of studying and working through practice problems, they still struggled to score highly on exams. These are intelligent individuals, so what exactly made math more difficult for them? Was it a lack of pattern recognition when approaching unfamiliar problems? Was it a lack of intuition? Or was it an inability to visualize what was actually happening mathematically, such as understanding differentiation as a measure of instantaneous change or integration as the accumulation of quantities, often represented by the area under a curve?"
      },
      {
        "type": "paragraph",
        "text": "I think there is an important distinction here between knowing how to solve a problem and understanding why the solution works. Someone might recognize a certain type of integral and immediately know which technique to apply, but does that necessarily mean they understand the mathematics behind it? And conversely, someone might understand the underlying concept perfectly but struggle to perform the calculations quickly. Which of these people is better at math?"
      },
      {
        "type": "paragraph",
        "text": "After discussing this with Vikash and thinking about it myself, I still think it is an open question, but I have a few thoughts on how it can be approached."
      },
      {
        "type": "heading",
        "text": "the role of intuition"
      },
      {
        "type": "paragraph",
        "text": "I think being good at math has a lot to do with intuition."
      },
      {
        "type": "paragraph",
        "text": "My sister, who is significantly younger than me, occasionally asks for help with her math homework. I find that even when I don't remember the formulas required to solve a problem, I can often reason my way through it. For example, she recently had a problem involving finding the area of a sector of a circle. I didn't immediately remember the formula, but I understood that a sector was simply a fraction of the full circle, and that the fraction depended on the angle. From there, I could reason my way to the formula using what I already knew about circles and angles."
      },
      {
        "type": "paragraph",
        "text": "My sister, on the other hand, was seeing much of this content for the first time. She hadn't worked much with radians and was still relatively new to algebra, so naturally, the problem was more difficult for her."
      },
      {
        "type": "paragraph",
        "text": "What interests me about this example is that I wasn't necessarily remembering a specific formula or recognizing a problem I had solved before. Instead, I was using my understanding of the underlying concepts to reconstruct something I had forgotten. I didn't need to remember the solution because I understood enough to derive it."
      },
      {
        "type": "paragraph",
        "text": "And I think that distinction is important."
      },
      {
        "type": "paragraph",
        "text": "But reducing the entire question to intuition feels like a half-assed answer, to be honest. What does intuition even mean in this context? Is it some natural ability to understand mathematical ideas, or is it something that can be developed through experience? Does intuition come from understanding, or does understanding come from intuition?"
      },
      {
        "type": "paragraph",
        "text": "Vikash's argument about pattern recognition starts to make more sense here. Maybe pattern recognition is actually one of the ways we develop intuition. The more problems we solve, the more relationships we begin to recognize, and eventually those relationships become so familiar that we no longer have to consciously think about them."
      },
      {
        "type": "paragraph",
        "text": "But I still don't think the two are exactly the same."
      },
      {
        "type": "paragraph",
        "text": "To me, pattern recognition is often about recognizing something familiar and knowing how to respond to it. Intuition feels like something deeper. It is the ability to reason about a concept, understand how its different parts relate to one another, and use that understanding even when faced with something unfamiliar."
      },
      {
        "type": "paragraph",
        "text": "Of course, this distinction isn't absolute. Recognizing patterns can help build a deeper understanding, and intuition itself might be built from patterns we have internalized over time. But I think there is a difference between memorizing how a type of problem is solved and developing an understanding strong enough that you can reason through problems you have never seen before."
      },
      {
        "type": "paragraph",
        "text": "Maybe some people are naturally better at developing that understanding. Maybe they pick up on relationships faster, connect ideas more easily, or find it easier to visualize abstract concepts. But I also think intuition can be trained, especially when we focus less on memorizing procedures and more on understanding why those procedures work."
      },
      {
        "type": "heading",
        "text": "how does this translate to engineering?"
      },
      {
        "type": "paragraph",
        "text": "I want to take this one step further and talk about how this relates to engineering."
      },
      {
        "type": "paragraph",
        "text": "Vikash is a mechanical engineering student, and I am a computer engineering student. Being good at math has certainly helped both of us throughout our respective courses. But on a broader scale, I think the more valuable skill is not necessarily being able to solve mathematical problems quickly. It is being able to reason through complicated problems, break them down, and understand the systems behind them."
      },
      {
        "type": "paragraph",
        "text": "This is where I think the distinction between intuition and pattern recognition becomes especially important."
      },
      {
        "type": "paragraph",
        "text": "In engineering, you are constantly faced with problems that don't necessarily look like anything you have seen before. You can memorize formulas, algorithms, and design patterns, but eventually you will run into something where there isn't an immediately obvious solution. At that point, simply recognizing a familiar pattern might not be enough."
      },
      {
        "type": "paragraph",
        "text": "You need to understand the underlying principles well enough to reason your way toward a solution."
      },
      {
        "type": "paragraph",
        "text": "For example, when working with computer architecture, I think there is a meaningful difference between knowing how a processor pipeline works and actually understanding why it works the way it does. You might know what forwarding and stalling are, and when they are typically used. But understanding the dependencies between instructions, how data moves through the pipeline, and why certain hazards occur allows you to reason about entirely new architectural problems."
      },
      {
        "type": "paragraph",
        "text": "That is the kind of understanding I find most valuable. The kind where you can forget the exact implementation or formula but still have enough of a foundation to figure things out yourself."
      },
      {
        "type": "paragraph",
        "text": "And perhaps that is what I really mean by intuition. Not some mysterious ability to immediately know the answer, but a sufficiently deep understanding of the fundamentals that reasoning begins to feel natural."
      },
      {
        "type": "paragraph",
        "text": "I still don't know whether intuition is fundamentally different from pattern recognition, or whether it is simply what pattern recognition becomes after enough experience and understanding. There is probably a lot more nuance to it than either of our original arguments accounted for."
      },
      {
        "type": "paragraph",
        "text": "But I do think that being good at math is about more than recognizing which method to apply. It is about understanding concepts deeply enough that you can reason beyond the problems you have already seen."
      },
      {
        "type": "paragraph",
        "text": "And I think the same idea applies to engineering."
      },
      {
        "type": "paragraph",
        "text": "That also brings up another question I have been thinking about: What actually makes someone a good engineer? I have a few thoughts on that too, which I plan to write about soon."
      }
    ]
  },
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
