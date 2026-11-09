---
title: What is a world model?
description: "Watching GPT play a city builder on YouTube got me thinking about two kinds of knowing: know-how from simulation and knowledge from reading. A look at world models, with a few real numbers."
draft: false
image: hero.jpg
size: 2x1.5
version: 1
published: 2026-11-09
updated: 2026-11-09
changelog:
  - "2026-11-09: first publish."
modified: 2026-11-09T11:53:26+01:00
---

![An orange tabby cat on a wooden table calmly pushes a glass of water over the edge, with a dashed line showing where it will land and splash on the floor](./hero.jpg)

Recently I fell into a [YouTube playlist](https://www.youtube.com/watch?v=du99Jm-G1UA&list=PLPPJ8AwImC7o) where a creator lets GPT-6 run a city in Cities: Skylines 2, with roads, houses, schools, everything.

The more I watched those videos, the more I caught myself reflecting on know-how learned from simulation versus knowledge from reading thousands of sources.

Turns out the first one has a name in AI research. It's called a **world model**.

## So what is a world model?

In short, a world model is something that takes **the current state of the world** and **an action you're thinking about**, and predicts **what happens next**. An LLM, by contrast, predicts the next token, mostly of text.

![Two hand-drawn workflow graphs side by side. Left: two word boxes go into a gear box, which outputs a highlighted next word that loops back to the start. Right: a state grid with an orange circle and a blue square, plus an action arrow, go into a gear box that fans out to three possible next states; two are faint, one is highlighted as the next state and loops back](./next-word-vs-next-state.jpg)

Yann LeCun (one of the great minds behind Meta's AI research, until he left at the end of 2025) put it this way at a lecture in April 2026: "A world model is a predictive system that, given the current state of the world... and given an action that you imagine taking," predicts the result, and "you can use that for planning."

The point is planning, which means trying things in your head first. Will this district fit the style? Will the glass fall if the cat pushes it? Run the movie, look at the ending, then act.

![Close-up of the cat's paw tipping a glass of water over the edge of the table, with a dashed line showing where it will fall](./paw-and-glass.jpg)

## How is that different from an LLM?

A language model like GPT or Claude also predicts what comes next. It predicts the next word, or more exactly the next token. That's a kind of world model too, but of a very specific world, mostly text. Today's big LLMs also learn from images, audio and video; Google trained Gemini "jointly across image, audio, video, and text data". What they still don't do is predict what happens when they act.

In one line:

**An LLM knows the world by reading about it. A world model knows it by simulating it.**

Asked what happens when a cat pushes a glass of water off a table, an LLM answers correctly: the glass falls, maybe breaks, the floor gets wet. It knows because it has read thousands of descriptions of exactly that, plus a few hundred tired posts from cat owners. A world model gets there another way. It starts from the scene, applies the push, and runs it forward until the glass hits the floor. Same answer, very different route.

The route matters in a new situation. If nobody ever wrote about it, there's nothing to read. It can still be simulated.

| | Large language model | World model |
| --- | --- | --- |
| Knows by | Reading | Simulating |
| Learns from | Text, plus images, audio and video for the big ones | Observations of the world: video, sensors, game states |
| Predicts | The next token | The next state of the world, given an action |
| Good at | Explaining, summarising, writing, code | Planning, physical tasks, "what if I do this?" |
| Struggles with | Situations it hasn't read about, long chains of actions | Language, and so far most things outside the lab |

An LLM can describe what happens when you place a prison next to a school. (GPT actually built one there in one episode.) It has read about zoning, about angry parents, probably about Cities: Skylines forums. Whether it can *simulate* the city, step by step, before choosing, is the open question.

Meanwhile, in a [2025 review](https://gizmodo.com/roborock-saros-z70-review-this-robovacs-robotic-arm-is-a-swing-and-a-miss-2000607909), a robot vacuum with an arm had a zero-percent success rate with slippers. Somehow I find that comforting.

## How do they learn? How do world models get trained?

Both start the same way. Hide part of the data, let the model guess it, correct the guess, and repeat that over and over. Nobody has to label anything, which is why it's called *self-supervised* learning. What gets hidden is where they part ways.

An LLM guesses the next word. The biggest version of Meta's Llama-3.1 did that on 15.6 trillion *tokens* (pieces of words) of text. It has 405 billion *parameters*, the "dials and levers" that training slowly turns until the guesses get good. After that, LLMs usually get a second round, where people rank their answers and the model is tuned towards the ones they prefer. People call this step RLHF, reinforcement learning from human feedback. And when an LLM needs something it never learned, it can look it up while answering. This trick is RAG, retrieval-augmented generation, a bit like a judge sending a clerk to the library.

A world model guesses what happens in a video. The tricky part is the action. Video shows what happened, but not which button was pressed or which motor moved.

- **Watching video.** Meta's V-JEPA-2 watched over a million hours of internet video, guessing patches that had been cut out of it. Then it saw about 62 hours of robot arms at work, with the arm's position recorded, enough to connect a move with its result.
- **Watching games.** DeepMind's first Genie (2024) watched 30,000 hours of 2D platform games without knowing which buttons the players pressed. It worked out eight possible "actions" on its own. Dreamer-4 learned Minecraft from 2,541 hours of recorded play, but only 100 of those hours came with the keyboard and mouse inputs. Its authors conclude that world models "absorb the majority of their knowledge from unlabeled videos, and require only a small amount of actions."
- **Practising in imagination.** Once Dreamer-4 had its model of Minecraft, it trained inside it, with no real game running. The authors call this "imagination training". That's how it learned to mine diamonds.
- **Simulation, the other way round.** Some world models are themselves used to train other AI. Waymo and Wayve use theirs to generate rare traffic situations for their driving software. More on that below.

The world models with published sizes are also much smaller. V-JEPA-2 has 1.2 billion parameters, Dreamer-4 has 2 billion, and the first Genie has 11 billion. Google's Gemma-4 LLM has up to 31 billion, Meta's Llama-3.1 has 405 billion, and Alibaba's Qwen3.8 has 2.4 trillion in total. Image and video generators sit in between. Qwen-Image-2.1, one of the most liked image models on Hugging Face, uses 7 billion to draw. The video model Wan-2.2, one of the most downloaded, has 27 billion. Those have to produce every pixel, which V-JEPA-2 doesn't.

The big difference is the amount of data. Text is everywhere. Robotics researcher Ken Goldberg (UC Berkeley) estimated that reading all the text on the internet would take a human about 100,000 years. Robots have nothing like it, which he calls the "100,000-year data gap". Robot data has to be made by hand, mostly by people remote-controlling robots: "every eight hours of work gives you just eight more hours of data." Figure trained its Helix model on about 500 hours of that. Physical Intelligence used over 10,000 hours and called it "by far the largest robot learning experiment". Fifteen trillion tokens on one side, a few hundred to ten thousand hours of robot data on the other.

## Pixels or ideas?

Not every world model tries to predict the future in full detail.

A video of leaves blowing in the wind is a good example. Predicting every pixel of every leaf one second from now is close to impossible. It's also pointless. What matters is something like "the tree is still there, the leaves keep moving, nothing big changes."

LeCun's approach, called **JEPA** (Joint Embedding Predictive Architecture), works at that level. It doesn't predict the image. It predicts a compressed summary of the image, where "irrelevant details have been eliminated," as his 2022 paper puts it. As he told MIT Technology Review: "If you try to build a generative model that predicts every detail of the future, it will fail."

The name sounds harder than the idea. An *embedding* is that compressed summary, a list of numbers that stands for what's in the picture. *Joint* means the present and the future both get turned into such summaries. *Predictive* means the model learns to guess the summary of the future from the summary of the present. To plan, a robot imagines a few possible moves, checks which one lands closest to the goal, and makes that one.

Same with the glass. A world model doesn't need every droplet. It needs to know which of these three it gets.

![Three glasses side by side on a wooden table: one still full, one shattered in a puddle, one standing but empty with water spilled around it](./three-glasses.jpg)

Others disagree and do generate the full picture. So "world model" now covers quite different things:

- **Meta V-JEPA-2** is LeCun's idea in practice. It predicts summaries and never draws a picture. Meta uses it to plan robot arm moves.
- **DeepMind Genie-3** turns a sentence into a world you can move around in, drawn frame by frame as you go: 720p, 24 frames per second, consistent for a few minutes. Typing more text changes the world while you're inside it, say rain or a new character. **Genie-4** (October 2026, trusted testers first) adds matching sound and more free-form live edits, such as changing the camera angle.
- **NVIDIA Cosmos** generates video of physical scenes, meant for training robots and self-driving cars. It came out in January 2025 as open models anyone can download.
- **World Labs Marble** turns text, images, video or a rough 3D layout into a 3D world. The result can be exported as a 3D scene and opened in other tools.
- **Dreamer-4** practises inside its own world model, as described above. Mining diamonds takes over 20,000 mouse and keyboard actions, and it got there without ever touching the real game.

So "we build world models" can mean very different things.

## Do they work?

In June 2025 Meta released **V-JEPA-2**, the model trained on all that video. Its robot version was put on robot arms in two labs it had never seen, with no extra training for those labs.

- Picking up a cup and placing it somewhere: **80%** success. An earlier robot model (Octo) managed 15%.
- Planning each move took about **16 seconds**. NVIDIA's Cosmos, used the same way, took **4 minutes**.

That's a big improvement.

And the honest counterpoint, from Meta's own announcement: on three new physics tests, IntPhys-2 among them, humans score 85 to 95%. On IntPhys-2, current video models are "at or close to chance." So a machine with a solid feel for physics doesn't exist yet, whether it's built on an LLM or on a world model.

### What machines do today

Today's machines mostly do something simpler. They recognise things. A robot vacuum maps the flat with a laser and spots objects it was trained on. Roborock advertises that its vacuums recognise "up to 301 types of objects". iRobot taught the Roomba to avoid pet poop with a database built partly from "many, many thousands" of fake clay poos. That works until something new shows up. A 2025 review of a Roborock with a robotic arm found it "pretty hit and miss when it came to avoiding power cords". It knows what a cable looks like. It doesn't predict what happens if it drives over one.

Military drones went further, for grim reasons. In Ukraine, jamming cuts the link between pilot and drone, so AI flies "the last 100 to 1,000 meters" on its own. In 2024 that was still rare: of nearly 2 million drones contracted, only 10,000 "definitely used AI guidance", and a human picked the target ([Breaking Defense](https://breakingdefense.com/2025/03/trained-on-classified-battlefield-data-ai-multiplies-effectiveness-of-ukraines-drones-report/), summarising a [CSIS](https://www.csis.org/analysis/ukraines-future-vision-and-current-capabilities-waging-ai-enabled-autonomous-warfare) report). In July 2026, according to the [New York Times](https://www.bostonglobe.com/2026/08/24/world/drone-killed-three-ukrainians-it-was-guided-entirely-by-ai/), a Russian drone killed three civilians in Zaporizhzhia after choosing "its exact target" itself. That's still recognition and steering. The drone spots the target and flies at it, and nothing in the reports says it simulates what happens next.

World models show up in this world mostly as training grounds. Waymo built one on top of Genie-3 to simulate rare events, "from a tornado to a casual encounter with an elephant". Wayve's GAIA-2 generates near-collisions and emergency braking that nobody wants to film for real. 1X released one in January 2026 to teach its home robot Neo new tasks, so far things like putting toast in a toaster.

So is any of this in the shops yet? Mostly not, and where it is, the claim is hard to check. NIO says its "NIO World Model" runs in over 460,000 cars in China and "can simulate 216 potential scenarios within 100 milliseconds to identify optimal decisions". That's exactly the planning idea from the start of this article. XPeng says the same about its 2026 driver assistance. Neither has shown independently what actually runs in the car, so for now these are only claims. Tesla and Waymo describe theirs as simulators. They train and test the driving software, and the car doesn't run them.

![A liquid-metal silver cat flows through the bars of a security gate, while the orange tabby cat with half a robot face, safe in a closing elevator, raises a rude paw at it](./t800-vs-t1000.jpg)

*Do you remember Terminator 2, when a new class of Terminator shows up? That's how this feels to me: LLMs are the T-800, world models the T-1000.*

## Red pill or blue pill?

One more video from the same playlist. In October, the creator let Anthropic's Opus-5.5 play the same game. The title: "I Let Opus 5.5 Play City Skylines 2 and it's a GOD".

So a month later, if the title is honest, a newer language model does much better at the same task. That's where my questions start:

- Did the model get a better world model inside it? Or just better at trial and error?
- Does it matter, as long as the city works? It matters a lot once the "game" is a warehouse robot or a car, where you can't reload.
- Is "world model" a real technical shift, or the next buzzword? Probably both, for a while.
- When a coding agent changes ten files at once, is it simulating what will happen, or guessing and waiting for the tests? My guess is the second, and that's part of why I argued in [foundations of AI-assisted development](/articles/foundations-of-ai-assisted-software-development/) that tests and specs matter so much.

My own bet is that world models will matter first where things move. Drones, self-driving cars, delivery vehicles, robots. Anything that moves through the real world, where there's no reload button.

LLMs feel at home in software, with text, code, documents and other things that live on a screen. World models point the other way, out of the screen and into devices, sensors, IoT and machines. I think that's where they could do better than LLMs, in automation that has to apply some logic to a situation nobody wrote down, with uncertain information and no time to look it up.

Or maybe not. By the time world models are mature enough, LLMs may have moved so far that they already do some of what world models promise. The Opus video above is a small hint in that direction.

In The Matrix, Morpheus offers Neo two pills. Blue: wake up in your bed and believe whatever you want. Red: see how deep the rabbit hole goes. Language models took the blue pill. They believe what they've read. World models go for the red one. They build the simulation, run it, and see what actually happens.

![Two orange tabby cat paws reach towards the reader, palms up: the left one holds a blue pill, the right one a red pill. Reading or simulating?](./two-pills.jpg)

LeCun took the red pill a long time ago. He says language models will never get there on their own, and he raised over a billion dollars on that bet. Is he right? I guess we'll see in the near future.

## Sources

- [Future Tech Pilot: "GPT Plays" playlist](https://www.youtube.com/watch?v=du99Jm-G1UA&list=PLPPJ8AwImC7o) (YouTube, mostly GPT-6 in Cities: Skylines 2, from September 2026)
- [Brown University: LeCun lecture](https://www.brown.edu/news/2026-04-01/yann-lecun-artificial-intelligence-pioneer) (April 2026)
- [MIT Technology Review: Yann LeCun's new venture](https://www.technologyreview.com/2026/01/22/1131661/yann-lecuns-new-venture-ami-labs/) (January 2026) · [AMI Labs raises $1.03bn](https://tech.eu/2026/03/10/yann-lecun-s-paris-based-ai-world-model-startup-raises-more-than-1bn/) (Tech.eu, March 2026)
- [A Path Towards Autonomous Machine Intelligence](https://openreview.net/forum?id=BZ5a1r-kVsf) (LeCun, 2022)
- [V-JEPA-2 and IntPhys-2](https://ai.meta.com/blog/v-jepa-2-world-model-benchmarks/) (Meta, June 2025) · [V-JEPA-2 paper](https://arxiv.org/abs/2506.09985)
- [Gemini technical report](https://arxiv.org/abs/2312.11805) (Google, December 2023)
- [Llama-3.1 paper](https://arxiv.org/abs/2407.21783) (Meta, July 2024) · [What is a parameter?](https://www.technologyreview.com/2026/01/07/1130795/what-even-is-a-parameter/) (MIT Technology Review, January 2026) · [InstructGPT, the RLHF paper](https://arxiv.org/abs/2203.02155) (OpenAI, 2022) · [What is RAG?](https://blogs.nvidia.com/blog/what-is-retrieval-augmented-generation/) (NVIDIA)
- [Gemma releases](https://ai.google.dev/gemma/docs/releases) (Google) · [Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) (Alibaba Qwen on Hugging Face, August 2026) · [Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) (September 2026) · [Wan-2.2](https://huggingface.co/Wan-AI/Wan2.2-T2V-A14B) (July 2025)
- [Genie, the 2024 paper](https://arxiv.org/abs/2402.15391) (DeepMind) · [Dreamer-4 paper](https://arxiv.org/abs/2509.24527) (2025)
- [The 100,000-year data gap](https://news.berkeley.edu/?p=134910) (UC Berkeley, August 2025) · [Figure Helix](https://www.figure.ai/news/helix) (February 2025) · [Physical Intelligence π0](https://www.pi.website/blog/pi0) (October 2024)
- [Genie-3](https://deepmind.google/discover/blog/genie-3-a-new-frontier-for-world-models/) (DeepMind, 2025) · [Genie-4 coverage](https://techcrunch.com/2026/10/27/googles-genie-4-world-model-adds-audio-more-realistic-worlds-and-real-time-steering/) (TechCrunch, October 2026)
- [NVIDIA Cosmos](https://nvidianews.nvidia.com/news/nvidia-launches-cosmos-world-foundation-model-platform-to-accelerate-physical-ai-development) · [World Labs Marble](https://www.worldlabs.ai/blog/marble-world-model) · [Dreamer-4](https://danijar.com/project/dreamer4/)
- [Roborock StarSight](https://global.roborock.com/pages/roborock-starsight-autonomous-system) (Roborock) · [Roomba pet-waste detection](https://www.popsci.com/technology/irobot-roomba-new-pet-poop-feature/) (Popular Science, 2021) · [Roborock Saros Z70 review](https://gizmodo.com/roborock-saros-z70-review-this-robovacs-robotic-arm-is-a-swing-and-a-miss-2000607909) (Gizmodo, May 2025)
- [CSIS: AI-enabled autonomous warfare in Ukraine](https://www.csis.org/analysis/ukraines-future-vision-and-current-capabilities-waging-ai-enabled-autonomous-warfare) (March 2025) · [Breaking Defense summary](https://breakingdefense.com/2025/03/trained-on-classified-battlefield-data-ai-multiplies-effectiveness-of-ukraines-drones-report/) · [New York Times, via Boston Globe](https://www.bostonglobe.com/2026/08/24/world/drone-killed-three-ukrainians-it-was-guided-entirely-by-ai/) (August 2026)
- [Waymo World Model](https://waymo.com/blog/2026/02/the-waymo-world-model-a-new-frontier-for-autonomous-driving-simulation) (February 2026) · [Wayve GAIA-2](https://wayve.ai/thinking/gaia-2/) (March 2025) · [1X world model](https://techcrunch.com/2026/01/13/neo-humanoid-maker-1x-releases-world-model-to-help-bots-learn-what-they-see) (TechCrunch, January 2026)
- [NIO World Model update](https://cnevpost.com/2026/01/28/nio-rolls-out-major-update-to-nwm-driver-assist-china/) (CnEVPost, January 2026) · [XPeng VLA 2.0 and X-Foresight](https://www.xpeng.com/news/019e95aed2899e8226228a028d650112) (XPeng, June 2026) · [Tesla's neural world simulator](https://x.com/aelluswamy/status/1981644831790379245) (Ashok Elluswamy, October 2025)

*World models move fast. Details reflect November 2026.*
