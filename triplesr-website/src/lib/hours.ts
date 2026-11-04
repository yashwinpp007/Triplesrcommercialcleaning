import { site } from "@/config/site";

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** Open/closed status in Australia/Sydney local time (handles daylight saving via Intl). */
export function sydneyStatus(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Sydney",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const wd = parts.find((p) => p.type === "weekday")!.value;
  const hh = Number(parts.find((p) => p.type === "hour")!.value) % 24;
  const mm = Number(parts.find((p) => p.type === "minute")!.value);
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(wd);
  const mins = hh * 60 + mm;
  const today = site.hours[day];
  const open = !!today && mins >= toMin(today.open) && mins < toMin(today.close);
  return { open, day, closesAt: today?.close };
}
