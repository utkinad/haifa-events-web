export type EventCategory =
  | "concert"
  | "theatre"
  | "exhibition"
  | "kids"
  | "cinema"
  | "festival"
  | "free"
  | "other";

export type EventLang = "he" | "ru" | "en" | "all";

export interface HaifaEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string;
  venue: string;
  category: EventCategory;
  price_min?: number;
  price_max?: number;
  is_free: boolean;
  language: EventLang;
  url?: string;
  source: string;
  image_url?: string;
}
