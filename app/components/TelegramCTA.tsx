import Image from "next/image";

const CHANNELS = [
  {
    name: "עברית",
    handle: "@haifaevents_he",
    url: "https://t.me/haifaevents_he",
    avatar: "/assets/avatar-HE.png",
    color: "#99CCFF",
    desc: "כל האירועים בעברית",
  },
  {
    name: "Русский",
    handle: "@haifaevents_ru",
    url: "https://t.me/haifaevents_ru",
    avatar: "/assets/avatar-RU.png",
    color: "#FF6B6B",
    desc: "Все события на русском",
  },
  {
    name: "English",
    handle: "@haifaevents_en",
    url: "https://t.me/haifaevents_en",
    avatar: "/assets/avatar-EN.png",
    color: "#31CDCF",
    desc: "All events in English",
  },
  {
    name: "ילדים · Kids",
    handle: "@haifaevents_kids",
    url: "https://t.me/haifaevents_kids",
    avatar: "/assets/avatar-KIDS.png",
    color: "#4CAF82",
    desc: "אירועים לילדים ומשפחות",
  },
];

export default function TelegramCTA() {
  return (
    <section className="bg-gray-50 border-t border-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-extrabold text-[#1A1A2E] mb-2">
          קבל אירועים ישירות לטלגרם
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Получай события в Telegram · Get events in Telegram
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CHANNELS.map((ch) => (
            <a
              key={ch.handle}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 bg-white rounded-2xl border border-gray-100 p-4 hover:border-gray-300 hover:shadow-sm transition-all group"
            >
              <div
                className="w-14 h-14 rounded-full overflow-hidden border-2 group-hover:scale-105 transition-transform"
                style={{ borderColor: ch.color }}
              >
                <Image
                  src={ch.avatar}
                  alt={ch.name}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-bold text-sm text-[#1A1A2E]">{ch.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{ch.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
