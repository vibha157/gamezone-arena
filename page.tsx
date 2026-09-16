import { GameCard } from "../components/game-card";
import { BookingForm } from "../components/booking-form";
import { Trophy, ShieldCheck, Sparkles, Clock3 } from "lucide-react";

const games = [
  { id: "bowling", name: "Neon Bowling", price: 399, unit: "person / session", icon: "🎳", description: "Modern lanes, scoring screens and a neon arcade atmosphere." },
  { id: "pool", name: "Pro Pool", price: 299, unit: "table / hour", icon: "🎱", description: "Premium pool tables for casual matches and friendly competition." },
  { id: "racing", name: "Sim Racing", price: 499, unit: "person / 30 min", icon: "🏎️", description: "High-speed racing simulators with competitive lap timing." },
  { id: "target", name: "Target Challenge", price: 349, unit: "person / session", icon: "🎯", description: "A supervised digital target game focused on score, timing and accuracy." },
  { id: "vr", name: "VR Adventure", price: 449, unit: "person / 30 min", icon: "🥽", description: "Immersive virtual-reality experiences for small groups." },
  { id: "air-hockey", name: "Air Hockey", price: 249, unit: "table / 30 min", icon: "🏒", description: "Fast arcade matches with score tracking and rematch energy." }
];

export default function Home() {
  return (
    <main>
      <header className="nav">
        <a className="brand" href="#home"><span className="brand-mark">G</span> GameZone <span>Arena</span></a>
        <nav>
          <a href="#games">Games</a>
          <a href="#booking">Book</a>
          <a href="#about">Why us</a>
        </nav>
        <a className="nav-cta" href="#booking">Book a session</a>
      </header>

      <section id="home" className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={16}/> THE NEXT-GEN PLAY ZONE</p>
          <h1>Play hard.<br/><em>Make memories.</em></h1>
          <p className="hero-text">Bowling, pool, racing, VR and competitive arcade experiences — all in one place.</p>
          <div className="hero-actions">
            <a className="button primary" href="#games">Explore games</a>
            <a className="button ghost" href="#booking">Check a slot</a>
          </div>
          <div className="hero-stats">
            <div><strong>6+</strong><span>experiences</span></div>
            <div><strong>7 days</strong><span>open weekly</span></div>
            <div><strong>AI</strong><span>smart assistant</span></div>
          </div>
        </div>
        <div className="hero-art" aria-label="GameZone visual">
          <div className="orb orb-one"/><div className="orb orb-two"/>
          <div className="arcade-card">
            <span>LIVE</span>
            <strong>PLAY<br/>ZONE</strong>
            <small>BOOK • PLAY • WIN</small>
          </div>
        </div>
      </section>

      <section id="games" className="section">
        <div className="section-heading">
          <div><p className="eyebrow">OUR EXPERIENCES</p><h2>Pick your <em>game.</em></h2></div>
          <p>Transparent pricing, simple booking and a smooth experience from checkout to play.</p>
        </div>
        <div className="game-grid">
          {games.map(game => <GameCard key={game.id} game={game} />)}
        </div>
      </section>

      <section id="about" className="feature-strip">
        <div><ShieldCheck/><h3>Safe by design</h3><p>Clear policies, controlled sessions and privacy-conscious booking.</p></div>
        <div><Clock3/><h3>Slot-based</h3><p>Choose your game, date and available time before confirming.</p></div>
        <div><Trophy/><h3>Competitive</h3><p>Track scores, challenge friends and make every visit count.</p></div>
      </section>

      <section id="booking" className="booking-section">
        <div className="booking-copy">
          <p className="eyebrow">RESERVE YOUR SESSION</p>
          <h2>Your next <em>game</em> starts here.</h2>
          <p>Submit your details and our booking system records the reservation in the venue's Google Sheet for staff management.</p>
          <div className="mini-note">No payment is collected by this demo. Staff can confirm payment separately.</div>
        </div>
        <BookingForm games={games.map(({id,name,price,unit}) => ({id,name,price,unit}))}/>
      </section>

      <footer>
        <div className="brand"><span className="brand-mark">G</span> GameZone Arena</div>
        <p>Capstone project • Built for a modern recreation venue</p>
      </footer>
    </main>
  );
}