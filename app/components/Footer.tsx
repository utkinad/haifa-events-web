export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-gray-400 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">קטגוריות</h3>
            <ul className="space-y-2 text-xs">
              {["הופעות","תיאטרון","תערוכות","ילדים","קולנוע","חינם"].map(c => (
                <li key={c}><a href="#" className="hover:text-white transition-colors">{c}</a></li>
              ))}
            </ul>
          </div>
          {/* Venues */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">מקומות</h3>
            <ul className="space-y-2 text-xs">
              {["אודיטוריום חיפה","לייב פארק","תיאטרון חיפה","סינמטק חיפה","מדעטק","בית הגפן"].map(v => (
                <li key={v}><a href="#" className="hover:text-white transition-colors">{v}</a></li>
              ))}
            </ul>
          </div>
          {/* Channels */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">ערוצי טלגרם</h3>
            <ul className="space-y-2 text-xs">
              {[
                { label: "🇮🇱 עברית", href: "https://t.me/haifaevents_he" },
                { label: "🇷🇺 Русский", href: "https://t.me/haifaevents_ru" },
                { label: "🇺🇸 English", href: "https://t.me/haifaevents_en" },
                { label: "👶 Kids", href: "https://t.me/haifaevents_kids" },
              ].map(ch => (
                <li key={ch.href}>
                  <a href={ch.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{ch.label}</a>
                </li>
              ))}
            </ul>
          </div>
          {/* About */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">אודות</h3>
            <ul className="space-y-2 text-xs">
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="mailto:hello@haifa.events" className="hover:text-white transition-colors">hello@haifa.events</a></li>
              <li><a href="https://t.me/HaifaEvents" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@HaifaEvents</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6">
          {/* Disclaimer */}
          <div className="text-xs text-center space-y-1 mb-4">
            <p>אינו קשור לעיריית חיפה · Не связан с муниципалитетом Хайфы · Not affiliated with Haifa Municipality</p>
            <p className="opacity-60">Movie data provided by <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">TMDB</a>. This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
          </div>
          <p className="text-xs text-center opacity-40">© 2026 Haifa Events. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
