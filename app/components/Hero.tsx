"use client";

export default function Hero() {
  const DOTS = ["#99CCFF", "#FFC200", "#31CDCF", "#FF6B6B", "#4CAF82"];

  return (
    <section className="bg-[#1A1A2E] px-4 pt-14 pb-14">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2">
          Все события Хайфы
        </h1>

        <div className="flex items-center gap-2 mb-8">
          <p className="text-gray-400 text-sm">כל מה שקורה בחיפה · Everything happening in Haifa</p>
          <div className="flex gap-1.5 ml-1">
            {DOTS.map((color, i) => (
              <span key={i} className="inline-block rounded-full" style={{ backgroundColor: color, width: 7, height: 7 }} />
            ))}
          </div>
        </div>

        <div className="relative max-w-2xl">
          <input
            type="text"
            placeholder="Поиск: артист, место, событие..."
            className="w-full bg-white/8 border border-white/12 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#31CDCF]/60 transition-colors"
          />
          <button className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-[#31CDCF] hover:bg-[#28b5b7] text-[#1A1A2E] font-bold text-sm px-6 py-2 rounded-lg transition-colors">
            Найти
          </button>
        </div>

      </div>
    </section>
  );
}
