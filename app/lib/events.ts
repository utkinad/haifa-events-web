import type { HaifaEvent } from "../types";

export const PLACEHOLDER_EVENTS: HaifaEvent[] = [
  {
    id: "1",
    title: "עומר אדם - הופעה חיה",
    date: "2026-04-15",
    time: "21:00",
    venue: "לייב פארק חיפה",
    category: "concert",
    price_min: 220,
    price_max: 380,
    is_free: false,
    language: "he",
    source: "tickchak",
    url: "#",
  },
  {
    id: "2",
    title: "Выставка: Марк Шагал и Хайфа",
    date: "2026-04-10",
    time: "10:00",
    venue: "Дом художников Хайфы",
    category: "exhibition",
    price_min: 0,
    is_free: true,
    language: "ru",
    source: "municipality",
    url: "#",
  },
  {
    id: "3",
    title: "הסימפוניה הישראלית חיפה",
    date: "2026-04-16",
    time: "20:00",
    venue: "אודיטוריום חיפה",
    category: "concert",
    price_min: 150,
    price_max: 280,
    is_free: false,
    language: "he",
    source: "hso_haifa",
    url: "#",
  },
  {
    id: "4",
    title: "Kids Science Festival — Madatech",
    date: "2026-04-14",
    time: "09:00",
    venue: "Madatech — Israel National Museum of Science",
    category: "kids",
    price_min: 45,
    is_free: false,
    language: "all",
    source: "madatech",
    url: "#",
  },
  {
    id: "5",
    title: "הצגה: שחף - תיאטרון חיפה",
    date: "2026-04-12",
    time: "19:30",
    venue: "תיאטרון חיפה",
    category: "theatre",
    price_min: 120,
    price_max: 160,
    is_free: false,
    language: "he",
    source: "haifa_theatre",
    url: "#",
  },
  {
    id: "6",
    title: "Праздник Песах в парке Gan HaEm",
    date: "2026-04-13",
    time: "10:00",
    venue: "גן חיות רמב\"ם",
    category: "festival",
    price_min: 0,
    is_free: true,
    language: "all",
    source: "municipality",
    url: "#",
  },
  {
    id: "7",
    title: "Haifa International Film Festival Preview",
    date: "2026-04-11",
    time: "20:30",
    venue: "Haifa Cinematheque",
    category: "cinema",
    price_min: 45,
    is_free: false,
    language: "en",
    source: "cinehaifa",
    url: "#",
  },
  {
    id: "8",
    title: "יריד ספרים - מוזיאון חיפה",
    date: "2026-04-18",
    time: "11:00",
    venue: "מוזיאון חיפה לאמנות",
    category: "exhibition",
    price_min: 0,
    is_free: true,
    language: "he",
    source: "hms_museums",
    url: "#",
  },
  {
    id: "9",
    title: "Концерт джаза у моря",
    date: "2026-04-19",
    time: "19:00",
    venue: "Набережная Бат-Галим",
    category: "concert",
    price_min: 0,
    is_free: true,
    language: "ru",
    source: "municipality",
    url: "#",
  },
];

export function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export function getTomorrow(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export function getWeekendDates(): string[] {
  const d = new Date();
  const day = d.getDay();
  const daysToFriday = (5 - day + 7) % 7;
  const friday = new Date(d);
  friday.setDate(d.getDate() + daysToFriday);
  const saturday = new Date(friday);
  saturday.setDate(friday.getDate() + 1);
  return [
    friday.toISOString().split("T")[0],
    saturday.toISOString().split("T")[0],
  ];
}
