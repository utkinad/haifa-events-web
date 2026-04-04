import type { HaifaEvent } from "../types";

function getWeekEnd(): string {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().split("T")[0];
}

export default function StatsBar({ events }: { events: HaifaEvent[] }) {
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const weekEnd = getWeekEnd();

  const todayCount    = events.filter(e => e.date === today).length;
  const tomorrowCount = events.filter(e => e.date === tomorrow).length;
  const weekCount     = events.filter(e => e.date >= today && e.date <= weekEnd).length;
  const freeCount     = events.filter(e => e.is_free).length;

  const catCounts = {
    concert:    events.filter(e => e.category === "concert").length,
    theatre:    events.filter(e => e.category === "theatre").length,
    exhibition: events.filter(e => e.category === "exhibition").length,
    kids:       events.filter(e => e.category === "kids").length,
    cinema:     events.filter(e => e.category === "cinema").length,
    festival:   events.filter(e => e.category === "festival").length,
  };

  const STATS = [
    { label: "Сегодня",   value: todayCount,    color: "#31CDCF" },
    { label: "Завтра",    value: tomorrowCount,  color: "#99CCFF" },
    { label: "На неделе", value: weekCount,      color: "#FFC200" },
    { label: "Бесплатно", value: freeCount,      color: "#4CAF82" },
  ];

  const CAT_STATS = [
    { label: "Концерты", value: catCounts.concert,    color: "#99CCFF" },
    { label: "Театр",    value: catCounts.theatre,    color: "#FFC200" },
    { label: "Выставки", value: catCounts.exhibition, color: "#31CDCF" },
    { label: "Детям",    value: catCounts.kids,        color: "#4CAF82" },
    { label: "Кино",     value: catCounts.cinema,      color: "#FF6B6B" },
    { label: "Другое",   value: catCounts.festival,    color: "#FF6B6B" },
  ];

  return (
    <section className="border-b border-gray-100 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-5">
        {/* Date stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {STATS.map(s => (
            <div
              key={s.label}
              className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center justify-between"
            >
              <span className="text-sm text-gray-500">{s.label}</span>
              <span className="text-2xl font-extrabold" style={{ color: s.color }}>
                {s.value}
              </span>
            </div>
          ))}
        </div>

        {/* Category stats */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {CAT_STATS.filter(c => c.value > 0).map(c => (
            <button
              key={c.label}
              className="bg-white rounded-lg border border-gray-100 px-3 py-2 text-center hover:border-gray-300 transition-colors group cursor-pointer"
            >
              <div className="text-lg font-bold" style={{ color: c.color }}>{c.value}</div>
              <div className="text-xs text-gray-500 group-hover:text-gray-700">{c.label}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
