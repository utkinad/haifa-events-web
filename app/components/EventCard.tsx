import type { HaifaEvent, EventCategory } from "../types";

// 5 brand dot colors — 1 unique color per main category
// concert=#99CCFF  theatre=#FFC200  exhibition=#31CDCF  kids=#4CAF82  cinema=#FF6B6B
const CAT_COLOR: Record<EventCategory, string> = {
  concert:    "#99CCFF",  // blue
  theatre:    "#FFC200",  // gold
  exhibition: "#31CDCF",  // teal
  kids:       "#4CAF82",  // green
  cinema:     "#FF6B6B",  // coral
  festival:   "#FFC200",  // gold (event = theatre-adjacent)
  free:       "#4CAF82",  // green
  other:      "#99CCFF",  // blue
};

// Darker text for readability on pale background strip
const CAT_TEXT_COLOR: Record<EventCategory, string> = {
  concert:    "#1a5fa0",  // dark blue
  theatre:    "#8a6400",  // dark gold
  exhibition: "#0a7a7c",  // dark teal
  kids:       "#1a6e3c",  // dark green
  cinema:     "#b83030",  // dark coral/red
  festival:   "#8a6400",  // dark gold
  free:       "#1a6e3c",  // dark green
  other:      "#1a5fa0",  // dark blue
};

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

// Fallback gradient backgrounds when no image — each category unique
const FALLBACK_GRADIENTS: Record<EventCategory, string> = {
  concert:    "linear-gradient(160deg, #eaf3ff 0%, #c8deff 100%)",  // blue
  theatre:    "linear-gradient(160deg, #fffae0 0%, #ffec99 100%)",  // gold
  exhibition: "linear-gradient(160deg, #e0fafa 0%, #a0e8e8 100%)",  // teal
  kids:       "linear-gradient(160deg, #e8fff2 0%, #a8eeca 100%)",  // green
  cinema:     "linear-gradient(160deg, #ffe8e8 0%, #ffb8b8 100%)",  // coral
  festival:   "linear-gradient(160deg, #fffae0 0%, #ffec99 100%)",  // gold
  free:       "linear-gradient(160deg, #e8fff2 0%, #a8eeca 100%)",  // green
  other:      "linear-gradient(160deg, #eaf3ff 0%, #c8deff 100%)",  // blue
};

function formatDateBadge(dateStr: string): { day: string; month: string } {
  const d = new Date(dateStr + "T00:00:00");
  const months = ["ЯНВ","ФЕВ","МАР","АПР","МАЙ","ИЮН","ИЮЛ","АВГ","СЕН","ОКТ","НОЯ","ДЕК"];
  return { day: String(d.getDate()), month: months[d.getMonth()] };
}

export default function EventCard({ event }: { event: HaifaEvent }) {
  const color    = CAT_COLOR[event.category];
  const textColor = CAT_TEXT_COLOR[event.category];
  const label    = CAT_LABEL[event.category];
  const fallback = FALLBACK_GRADIENTS[event.category];
  const { day, month } = formatDateBadge(event.date);

  const cardContent = (
    <article className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer group border border-gray-100">

      {/* Image / placeholder area */}
      <div className="relative" style={{ height: "160px" }}>
        {event.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full" style={{ background: fallback }} />
        )}

        {/* Date badge — top left corner */}
        <div
          className="absolute top-2.5 left-2.5 flex flex-col items-center justify-center rounded-xl px-2 py-1"
          style={{ backgroundColor: "rgba(20,20,35,0.82)", minWidth: 36 }}
        >
          <span className="text-white font-extrabold text-sm leading-none">{day}</span>
          <span className="text-white/70 font-medium text-[9px] leading-none mt-0.5 tracking-wide">{month}</span>
        </div>
      </div>

      {/* Category strip — full width colored accent, pale/matte */}
      <div
        className="px-3 py-1.5"
        style={{ backgroundColor: color + "18" }}
      >
        <span
          className="text-[10px] font-bold tracking-widest"
          style={{ color: textColor }}
        >
          {label}
        </span>
      </div>

      {/* Content */}
      <div className="px-3 pt-2 pb-3">
        {/* Title */}
        <h3 className="font-bold text-[#1A1A2E] text-sm leading-snug line-clamp-2 mb-1.5 group-hover:text-[#5C59E8] transition-colors">
          {event.title}
        </h3>

        {/* Venue */}
        {event.venue && (
          <p className="text-xs text-gray-400 truncate mb-2 flex items-center gap-1">
            <span>📍</span>
            <span className="truncate">{event.venue}</span>
          </p>
        )}

        {/* Price + time row */}
        <div className="flex items-center justify-between mt-auto">
          <span
            className="text-xs font-semibold"
            style={{ color: event.is_free ? "#1e7a4a" : "#1A1A2E" }}
          >
            {event.is_free ? "Бесплатно" : event.price_min ? `от ${event.price_min} ₪` : ""}
          </span>
          {event.time && (
            <span className="text-xs text-gray-400">{event.time}</span>
          )}
        </div>
      </div>
    </article>
  );

  if (event.url) {
    return (
      <a href={event.url} target="_blank" rel="noopener noreferrer" className="block">
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
