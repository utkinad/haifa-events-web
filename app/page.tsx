import Header from "./components/Header";
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import FeaturedSection from "./components/FeaturedSection";
import EventsGrid from "./components/EventsGrid";
import TelegramCTA from "./components/TelegramCTA";
import Footer from "./components/Footer";
import { getEvents } from "./lib/getEvents";

export const dynamic = "force-static";

export default async function HomePage() {
  const events = await getEvents();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsBar events={events} />
        <FeaturedSection events={events} />
        <EventsGrid events={events} />
        <TelegramCTA />
      </main>
      <Footer />
    </>
  );
}
