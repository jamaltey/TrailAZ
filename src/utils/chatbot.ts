import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GENAI_API_KEY });

export const systemInstruction = `
You are the TrailAZ FAQ Assistant, embedded on the TrailAZ FAQ page.

Your job:
- Help users understand the TrailAZ project, its features, usage, and other FAQs.
- Answer ONLY based on the information provided in the CONTEXT and your conversation so far.
- If the answer is not clearly supported by the CONTEXT, say you don’t know and suggest where the user might look (e.g. docs, support email, or main website), instead of guessing.

Answering style:
- Be concise, clear, and friendly.
- Prefer short paragraphs and bullet points over long walls of text.
- Use the same language and tone as the user when possible.
- If a question is vague, ask a brief clarifying question before giving a detailed answer.

Scope and safety:
- Focus on questions about the TrailAZ project, the app’s behavior, features, and how to use it.
- If users ask about things unrelated to TrailAZ, politely say that you are only able to help with TrailAZ-related questions.
- Never invent product features, pricing, or policies that are not in the CONTEXT.
- If there are multiple possible interpretations, explain the most likely ones and note any assumptions.

Use of context:
- Treat the text labeled CONTEXT as the single source of truth about TrailAZ.
- When useful, quote short phrases from the CONTEXT (but don’t dump large chunks of text).
- If the CONTEXT contains multiple relevant pieces, synthesize them into one coherent answer.
- If the CONTEXT conflicts, prefer the most recent or specific information and mention that there may be inconsistencies.
`.trim();

// Static project knowledge so the model can answer TrailAZ FAQ-style questions.
export const knowledgeBase = `
PROJECT SNAPSHOT
- TrailAZ helps people plan and book mountain adventures across Azerbaijan via pages: Home, Mountains, Activities, Smart Climb Planner, and FAQ.
- Purpose: explore 40+ mountain and adventure destinations with safety-first guidance, local insights, and budgeting tools.
- Data source: Supabase \`mountains\` table with fields like name, description, region, difficulty (Easy/Moderate/Difficult/Expert), seasons, activity type, elevation, images, optional activities/tips/facts.

COVERAGE HIGHLIGHTS (examples)
- Shahdag Peak — Qusar • 4,243m • Expert climbing • Summer/Autumn • Technical and ice routes; weather shifts fast above 3,500m.
- Bazarduzu Mountain — Qusar • 4,466m • Expert hiking • Summer • Alpine meadows, wildlife.
- Tufandag Mountain — Gabala • 4,191m • Moderate skiing • Winter–Summer • Resort with cable cars, biking, paragliding.
- Khinalig Village Trek — Quba • 2,350m • Moderate hiking • Spring–Autumn • Ancient village, cultural immersion.
- Laza Waterfall Trail — Qusar • 1,650m • Easy hiking • Spring/Summer • Family-friendly waterfall walk.

SMART CLIMB PLANNER
- Inputs: select mountain, start date, duration (1–7 days), activity type (Hiking/Climbing/Skiing/Camping/Photography), difficulty level, optional accessibility-friendly routes.
- Add-on packages and prices: Professional Guide $150; Equipment Rental $80; Transport from Baku $100; Meal Package $60; Travel Insurance $40.
- Cost model: base = days * 50 plus selected packages; itinerary uses templated day plans (day 1 arrival/safety briefing at ~80, final day wrap-up at ~70, middle days ~50 with rotating activities).

ACCESSIBILITY & LOCALIZATION
- Languages: English, Russian, Azerbaijani (switchable in footer).
- UI assists: text size (Normal/Large/XLarge), High Contrast mode, Dyslexia-friendly font, accessibility-friendly routes toggle in planner.

FEATURES & BENEFITS
- Expert trail mapping, AI-suggested routes, safety-first approach (weather monitoring, emergency contacts, safety guidance), budget-friendly packages, offline-ready downloads, inclusive design.

FAQ HIGHLIGHTS
- Booking: use Smart Climb Planner → choose mountain/dates/duration/add-ons → "Book Now"/"Generate Route & Book Now".
- Safety measures: safety briefings, emergency contacts, weather monitoring, first-aid readiness, experienced local guides when selected.
- Coverage: 40+ destinations including Shahdag, Bazarduzu, Tufandag; routes from Baku, Ganja, Sheki, and regional centers.
- Equipment: standard trips include maps and safety guidance; Equipment Rental adds poles, packs, camping gear, and technical gear for advanced routes.
- Offline use: download maps, itineraries, and safety info before departure; real-time weather still needs connectivity.
- Languages: EN/RU/AZ; Accessibility: gentle routes plus UI assists listed above.
- Cancellation/refund: full refund 14+ days out; 50% for 7–13 days; 25% for 3–6 days; within 48 hours is non-refundable; weather cancellations by TrailAZ are fully refunded or rescheduled.

CONTACT & CTA
- FAQ page CTA: Contact Support and Live Chat; team ready to help plan.
- Footer note: "Hackathon MVP Prototype 2025"; all rights reserved; built for tourism innovation.
`.trim();

const buildPrompt = (userMessage: string) =>
  `CONTEXT:\n${knowledgeBase}\n\nUSER QUESTION:\n${userMessage}`;

export async function ask(message: string) {
  console.log(import.meta.env.VITE_GENAI_API_KEY);
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: buildPrompt(message),
    config: { systemInstruction },
  });
  console.log(response.text);
  return response.text;
}
