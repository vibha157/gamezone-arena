export const GAMES = [
  { id: "bowling", name: "Neon Bowling", price: 399, unit: "person / session" },
  { id: "pool", name: "Pro Pool", price: 299, unit: "table / hour" },
  { id: "racing", name: "Sim Racing", price: 499, unit: "person / 30 min" },
  { id: "target", name: "Target Challenge", price: 349, unit: "person / session" },
  { id: "vr", name: "VR Adventure", price: 449, unit: "person / 30 min" },
  { id: "air-hockey", name: "Air Hockey", price: 249, unit: "table / 30 min" }
] as const;

export const PUBLIC_KNOWLEDGE = `
GameZone Arena is a recreational gaming venue.
Games and advertised demo prices:
- Neon Bowling: ₹399 per person/session.
- Pro Pool: ₹299 per table/hour.
- Sim Racing: ₹499 per person/30 minutes.
- Target Challenge: ₹349 per person/session. It is a digital/supervised target game.
- VR Adventure: ₹449 per person/30 minutes.
- Air Hockey: ₹249 per table/30 minutes.
The website accepts booking requests for a selected game, date, time and number of players.
A booking request is not a final confirmation until venue staff confirm availability.
The demo website does not collect online payment.
Never invent opening hours, discounts, availability, refund rules, addresses, phone numbers or policies that are not provided in this knowledge.
`;
