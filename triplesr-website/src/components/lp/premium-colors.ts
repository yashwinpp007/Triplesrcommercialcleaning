/** Colour pairs used to give each card its own accent (decorative only). */
export const palettes: [string, string][] = [
  ["#0891b2", "#22c55e"],
  ["#7c3aed", "#0ea5e9"],
  ["#ea580c", "#f5b301"],
  ["#db2777", "#7c3aed"],
  ["#16a34a", "#0891b2"],
  ["#2563eb", "#7c3aed"],
  ["#f59e0b", "#ef4444"],
  ["#0d9488", "#84cc16"],
];
export const grad = (i: number) => `linear-gradient(135deg, ${palettes[i % palettes.length][0]}, ${palettes[i % palettes.length][1]})`;
