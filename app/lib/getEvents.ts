import { getSupabaseClient } from "./supabase";
import type { HaifaEvent, EventCategory } from "../types";
import { PLACEHOLDER_EVENTS } from "./events";

// Map DB category values → UI categories
const CAT_MAP: Record<string, EventCategory> = {
  municipal:   "festival",
  theatre:     "theatre",
  concert:     "concert",
  cinema:      "cinema",
  kids:        "kids",
  exhibition:  "exhibition",
  free:        "free",
  dance:       "concert",
  festival:    "festival",
  music:       "concert",
  opera:       "theatre",
  art:         "exhibition",
  museum:      "exhibition",
  comedy:      "other",
  sport:       "other",
  food:        "other",
};

// Source fallback if category not set
const SOURCE_CAT: Record<string, EventCategory> = {
  haifa_theatre:         "theatre",
  cinehaifa:             "cinema",
  movieland:             "cinema",
  hot_cinema:            "cinema",
  planet_cinema:         "cinema",
  madatech:              "kids",
  matnas_kiryat_motzkin: "kids",
  matnas_kiryat_ata:     "kids",
  matnas_neve_david:     "kids",
  matnas_neve_yosef:     "kids",
  matnas_ramot:          "kids",
  matnas_tirat_carmel:   "kids",
  matnas_kiryat_bialik:  "kids",
  hso_haifa:             "concert",
  haifa_symphony:        "concert",
  hms_museums:           "exhibition",
  beit_hagefen:          "exhibition",
  municipality:          "festival",
  tickchak:              "concert",
};

function extractTime(dateStr: string | null): string | undefined {
  if (!dateStr) return undefined;
  const match = dateStr.match(/(\d{1,2}:\d{2})/);
  return match ? match[1] : undefined;
}

interface RawEvent {
  id: string;
  title: string;
  title_he?: string;
  title_en?: string;
  date_raw: string;
  date_str?: string;
  location?: string;
  language?: string;
  lang?: string;
  source?: string;
  link?: string;
  image_url?: string;
  category?: string;
  is_free?: boolean;
}

export async function getEvents(): Promise<HaifaEvent[]> {
  try {
    const client = getSupabaseClient();
    if (!client) {
      console.warn("Supabase env vars not set — using placeholder events");
      return PLACEHOLDER_EVENTS;
    }

    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await client
      .from("events")
      .select("id, title, title_he, title_en, date_raw, date_str, location, language, lang, source, link, image_url, category, is_free")
      .in("status", ["approved", "posted"])
      .gte("date_raw", today)
      .order("date_raw", { ascending: true })
      .limit(200);

    if (error || !data) {
      console.error("Supabase error:", error);
      return PLACEHOLDER_EVENTS;
    }

    console.log(`✅ Loaded ${data.length} events from Supabase`);

    return (data as RawEvent[]).map((row) => {
      const source = row.source || "unknown";
      const dbCat = row.category?.toLowerCase() || "";
      const category: EventCategory =
        CAT_MAP[dbCat] || SOURCE_CAT[source] || "other";

      const lang = (row.language || row.lang || "he") as "he" | "ru" | "en" | "all";

      // Use localized title if available
      const title = row.title || "";

      return {
        id: row.id,
        title,
        date: row.date_raw,
        time: extractTime(row.date_str ?? null),
        venue: row.location || "",
        category,
        is_free: row.is_free ?? false,
        language: lang,
        url: row.link,
        image_url: row.image_url,
        source,
      };
    });
  } catch (err) {
    console.error("Failed to fetch events:", err);
    return PLACEHOLDER_EVENTS;
  }
}
