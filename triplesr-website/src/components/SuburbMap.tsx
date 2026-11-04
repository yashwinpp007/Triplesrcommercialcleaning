import { sydneyGeo } from "@/content/sydneyGeo";
import { project, type Suburb } from "@/lib/suburbs";

// Server-rendered location map: real council boundaries with this suburb pinned and its region highlighted.
export function SuburbMap({ s }: { s: Suburb }) {
  const [px, py] = project(s.lat, s.lon);
  const size = 300;
  const x = Math.min(Math.max(px - size / 2, 0), sydneyGeo.width - size);
  const y = Math.min(Math.max(py - size / 2, 0), sydneyGeo.height - size);
  return (
    <figure className="overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(120%_90%_at_30%_10%,#14407f_0%,#0b2a5b_55%,#071a3b_100%)] p-2 shadow-xl">
      <svg viewBox={`${x} ${y} ${size} ${size}`} role="img" aria-label={`Map showing ${s.name} within the ${s.region.name} region`} className="block aspect-square w-full">
        {sydneyGeo.areas.map((a) => (
          <path
            key={a.name}
            d={a.d}
            fill={a.region === s.region.slug ? "rgba(59,156,66,.55)" : a.kind === "served" ? "rgba(10,124,140,.35)" : "rgba(255,255,255,.05)"}
            stroke={a.region === s.region.slug ? "rgba(255,255,255,.8)" : "rgba(255,255,255,.22)"}
            strokeWidth={a.region === s.region.slug ? 1.4 : 0.8}
            strokeLinejoin="round"
          />
        ))}
        <circle cx={px} cy={py} r={14} className="pulse-ring" fill="rgba(95,209,138,.55)" />
        <circle cx={px} cy={py} r={7} fill="#3b9c42" stroke="#fff" strokeWidth={2.4} />
        <circle cx={px} cy={py} r={2.4} fill="#fff" />
        <text x={px} y={py - 14} textAnchor="middle" fontSize={13} fontWeight={800} fill="#fff" stroke="#0b2a5b" strokeWidth={3.6} paintOrder="stroke">{s.name}</text>
      </svg>
      <figcaption className="px-3 pb-2 pt-1 text-xs text-white/70">{s.name} within {s.region.name}. Boundaries: ABS ASGS 2021 (CC BY 4.0).</figcaption>
    </figure>
  );
}
