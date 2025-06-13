# LI-Note-to-self 🧠📩  
*A prototype exploring how to make LinkedIn connections more intentional by letting you leave yourself a note.*

Preview here (https://9000-firebase-studio-1749650334813.cluster-aj77uug3sjd4iut4ev6a4jbtf2.cloudworkstations.dev)

---

## Why I Built This  

I’ve been curious about learning to **vibe code**, exploring no-code and low-code tools to prototype real ideas. I’ve played around with [bolt.new](https://bolt.new) and wanted to try other platforms to compare and contrast.

This prototype was a great excuse to learn by doing. I picked something I wish existed, a way to remember **why** I connected with someone on LinkedIn, and built a simple proof of concept using **Firebase Studio**.

Here's what I did.
LinkedIn has become the default system of record for professional relationships, yet it provides no way to capture **why** a connection exists.

Over time, we all accumulate hundreds (or thousands) of connections. But later, when we try to reach out or remember someone, it often sounds like:

> “Wait… did I meet this person at a conference?”  
> “Was this a recruiter I meant to follow up with?”  
> “Did we work together somewhere?”  

That missing context creates friction, especially when you want to personalize outreach or build trust.

---

## The Idea 💡  

What if, at the moment of connection, you could leave a private note to yourself?

Whether you're sending a request or receiving one, you could jot a quick reminder like:

> “Met at WIP Conf, follow up re: partnerships.”  
> “Referred by Sara, hiring PMs this fall.”

These notes stay private, visible only to you, and viewable later when you revisit that connection’s profile.

This prototype explores that idea using Firebase Studio, simulating what it might feel like to leave yourself a note while sending a LinkedIn request, when accepting an incoming one, or anytime afterward to preserve context for the future.

---
## My Process  

### 🔹 Step 1: Initial Prompts (ChatGPT + Gemini)  

I started by dictating the problem statement, pain points, and my initial idea to ChatGPT, asking it to turn these into a formal Product Requirements Document (PRD). You can see the resulting PRD here: [[PRD.md](https://github.com/estherspo/LI-Note-to-self/docs/PRD.md)](https://github.com/estherspo/LI-Note-to-self/blob/master/docs/PRD.md).

Next, I fed this PRD into Gemini with the following prompt:

> **Problem Statement**  
> LinkedIn has become the default system of record for professional relationships, yet it provides no way to capture *why* a connection exists. Over time, users accumulate hundreds—even thousands—of connections without context:  
>   
> - Was this someone I met at a conference?  
> - Did we work together at a past job?  
> - Did I connect because I wanted to follow up later—and forgot?  
>   
> This lack of memory creates friction when trying to re-engage with connections, personalize outreach, or build trust. People often resort to external spreadsheets, personal CRMs, or mental notes— all of which are disjointed, fragile, and easily forgotten.  
>   
> By enabling users to add private notes at the moment of connection, LinkedIn can evolve from a static contact list into a dynamic relationship tool that supports intentional, meaningful networking over time.

### 🔹 Step 2: Recreate LinkedIn’s “Connect” Flow  
Since my goal was to prototype a feature within an existing product, I wanted the experience to feel authentic and realistic. To do this, I recreated a simplified version of LinkedIn’s Send Connection Invitation modal. My prompt explicitly instructed the model to match LinkedIn’s connect flow, and I supplemented that with screenshots of the specific UI elements I wanted to mimic.

The initial output captured about 60% of the flow correctly. From there, I iterated with targeted instructions to improve accuracy. 

To keep the process fun and creative, I also asked the model to swap the users for cats—updating all profile details like About, Job Titles, and Experience to be cat-themed.

### 🔹 Step 3: Add “Note to self” Entry Points  
I inserted a small private note field into two moments:  
- When sending a connection request  
- When deciding to accept a request  

The idea is that notes can be added as part of the flow, rather than needing to remember to follow-up later.

Additionally, users can view these notes later directly from the contact’s profile card, making it easy to recall the context behind each connection at any time.

### 🔹 Step 4: Prototype State Navigator
I didn’t want to recreate every LinkedIn interaction but needed to test how the feature functions across multiple perspectives — sending a request, receiving a request, and viewing a connection. To facilitate this, I added a prototype state navigator that allows jumping between these different views seamlessly, enabling quick validation of the feature’s behavior from various angles.

---

## View the demo 

I built this to solve a personal pain point, and to learn a new skill. You can watch the demo 📎 here (https://www.linkedin.com/posts/esportello_something-that-really-grinds-my-gears-about-activity-7338796385535709185-O47A?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAUfGMIBoErlaNAFFpYSglFVr5QltjoIrK4)

---

## Next Steps (Maybe 🤔)  
- Build a browser extension version that works live on LinkedIn  
- Store notes linked to user profile URLs  
- Support exporting to Notion, Airtable, or CRM  
- Explore auto-tagging or categories (e.g. "Met at Event", "Follow up Q3")  
