"use client";

import { useState } from "react";
import EventCard from "./EventCard";
import type { HaifaEvent } from "../types";

const TABS = [
  { id: "all",      label: "Все события" },
  { id: "today",    label: "Сегодня" },
  { id: "tomorrow", label: "Завтра" },
  { id: "weekend",  label: "Выходные" },
];

function getDateFilters() {
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const d = new Date();
  const daysToFri = (5 - d.getDay() + 7) % 7;
  const fri = new Date(d); fri.setDate(d.getDate() + daysToFri);
  const sat = new Date(fri); sat.setDate(fri.getDate() + 1);
  return {
    today,
    tomorrow,
    weekend: [fri.toISOString().split("T")[0], sat.toISOString().split("T")[0]],
  };
}

export default function EventsGrid({ events }: { events: HaifaEvent[] }) {
  const [activeTab, setActiveTab] = useState("all");
  const dates = getDateFilters();

  const filtered = events.filter((e) => {
    if (activeTab === "today")    return e.date === dates.today;
    if (activeTab === "tomorrow") return e.date === dates.tomorrow;
    if (activeTab === "weekend")  return dates.weekend.includes(e.date);
    return true;
  });

  const counts = {
    all:      events.length,
    today:    events.filter((e) => e.date === dates.today).length,
    tomorrow: events.filter((e) => e.date === dates.tomorrow).length,
    weekend:  events.filter((e) => dates.weekend.includes(e.date)).length,
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold text-[#1A1A2E]">אירועים בחיפה</h2>
        <span className="text-sm text-gray-400">{counts.all} אירועים</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-50 p-1 rounded-xl w-fit">
        {TABS.map((tab) => {
          const count = counts[tab.id as keyof typeof counts];
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-[#1A1A2E] text-white"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}
              {count > 0 && (
                <span className={`ml-1.5 text-xs ${activeTab === tab.id ? "opacity-60" : "text-gray-400"}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🗓</p>
          <p className="font-medium">אין אירועים בתאריך זה</p>
          <p className="text-sm mt-1">Нет событий · No events</p>
        </div>
      )}
    </section>
  );
}
