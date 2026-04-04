import type { HaifaEvent, EventCategory } from "../types";

const CAT_LABEL: Record<EventCategory, string> = {
  concert:    "КОНЦЕРТ",
  theatre:    "ТЕАТР",
  exhibition: "ВЫСТАВКА",
  kids:       "ДЕТЯМ",
  cinema:     "КИНО",
  festival:   "СОБЫТИЕ",
  free:       "БЕСПЛАТНО",
  other:      "СОБЫТИЕ",
};

const CAT_COLOR: Record<EventCategory, string> = {
  concert:    "#99CCFF",
  theatre:    "#FFC200",
  exhibition: "#31CDCF",
  kids:       "#4CAF82",
  cinema:     "#FF6B6B",
  festival:   "#FFC200",
  free:       "#4CAF82",
  other:      "#99CCFF",
};

const FALLBACK_GRADIENT: Record<EventCategory, string> = {
  concert:    "linear-gradient(160deg, #1a2a4a 0%, #0f3460 100%)",
  theatre:    "linear-gradient(160deg, #2d1b00 0%, #6b4400 100%)",
  exhibition: "linear-gradient(160deg, #003333 0%, #009999 100%)",
  kids:       "linear-gradient(160deg, #1a3a1a 0%, #3d8b3d 100%)",
  cinema:     "linear-gradient(160deg, #3a1a1a 0%, #9a3535 100%)",
  festival:   "linear-gradient(160deg, #2d1b00 0%, #6b4400 100%)",
  free:       "linear-gradient(160deg, #1a3a1a 0%, #3d8b3d 100%)",
  other:      "linear-gradient(160deg, #1a1a2e 0%, #0f3460 100%)",
};

function formatDate(dateStr: string): { day: string; month: string } {
  const d = new Date(dateStr + "T00:00:00");
  const months = ["ЯНВ","ФЕВ","МАР","АПР","МАЙ","ИЮН","ИЮЛ","АВГ","СЕН","ОКТ","НОЯ","ДЕК"];
  return { day: String(d.getDate()), month: months[d.getMonth()] };
}

function FeaturedCard({
  event,
  large = false,
}: {
  event: HaifaEvent;
  large?: boolean;
}) {
  const color = CAT_COLOR[event.category];
  const label = CAT_LABEL[event.category];
  const fallback = FALLBACK_GRADIENT[event.category];
  const { day, month } = formatDate(event.date);

  const inner = (
    <article
      className={`relative rounded-2xl overflow-hidden cursor-pointer group ${large ? "h-[420px]" : "h-[200px]"}`}
      style={{ background: fallback }}
    >
      {/* Background image */}
      {event.image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={event.image_url}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      )}

      {/* Dark gradient overlay from bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(10,12,28,0.95) 0%, rgba(10,12,28,0.5) 45%, rgba(10,12,28,0.1) 100%)",
        }}
      />

      {/* Date badge */}
      <div
        className="absolute top-3 right-3 flex flex-col items-center justify-center rounded-xl px-2 py-1 z-10"
        style={{ backgroundColor: "rgba(20,20,35,0.82)", minWidth: 36 }}
      >
        <span className="text-white font-extrabold text-sm leading-none">{day}</span>
        <span className="text-white/70 font-medium text-[9px] leading-none mt-0.5 tracking-wide">{month}</span>
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        {/* Category badge */}
        <span
          className="inline-block text-[10px] font-bold tracking-widest px-2 py-1 rounded-md mb-2"
          style={{ backgroundColor: color + "25", color: color, border: `1px solid ${color}40` }}
        >
          {label}
        </span>

        {/* Title */}
        <h3
          className={`font-extrabold text-white leading-tight line-clamp-2 mb-2 ${large ? "text-xl sm:text-2xl" : "text-sm"}`}
        >
          {event.title}
        </h3>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-gray-300 flex-wrap">
          {event.venue && (
            <span className="flex items-center gap-1">
              <span>📍</span>
              <span className="truncate max-w-[150px]">{event.venue}</span>
            </span>
          )}
          {event.time && (
            <span className="flex items-center gap-1">
              <span>🕐</span>
              {event.time}
            </span>
          )}
          {(event.price_min || event.is_free) && (
            <span
              className="font-semibold"
              style={{ color: event.is_free ? "#4CAF82" : "#fff" }}
            >
              {event.is_free ? "Бесплатно" : `от ${event.price_min} ₪`}
            </span>
          )}
        </div>
      </div>
    </article>
  );

  if (event.url) {
    return (
      <a href={event.url} target="_blank" rel="noopener noreferrer" className="block">
        {inner}
      </a>
    );
  }
  return inner;
}

export default function FeaturedSection({ events }: { events: HaifaEvent[] }) {
  // Pick featured events: prefer non-cinema events with upcoming dates
  const priority = ["concert", "theatre", "exhibition", "festival", "kids"];
  const featured = [
    ...events.filter(e => priority.includes(e.category)),
    ...events.filter(e => !priority.includes(e.category)),
  ].slice(0, 3);

  if (featured.length < 2) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 pt-10 pb-4">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-extrabold text-[#1A1A2E]">Не пропустите</h2>
        <a href="#" className="text-sm text-[#31CDCF] hover:underline font-medium">
          Все события →
        </a>
      </div>

      {/* 2-column layout: 1 big left + 1-2 stacked right */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FeaturedCard event={featured[0]} large />
        <div className="flex flex-col gap-4">
          <FeaturedCard event={featured[1]} />
          {featured[2] && <FeaturedCard event={featured[2]} />}
        </div>
      </div>
    </section>
  );
}
