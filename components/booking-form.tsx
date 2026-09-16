 "use client";

import { FormEvent, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Loader2 } from "lucide-react";

type Game = { id: string; name: string; price: number; unit: string };

export function BookingForm({ games }: { games: Game[] }) {
  const [gameId, setGameId] = useState(games[0]?.id ?? "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [players, setPlayers] = useState(1);
  const [status, setStatus] = useState<{ok: boolean; message: string} | null>(null);
  const [loading, setLoading] = useState(false);

  const selected = useMemo(() => games.find(g => g.id === gameId), [gameId, games]);
  const total = (selected?.price ?? 0) * players;

  async function submit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const formElement = e.currentTarget;
  const form = new FormData(formElement);

  setStatus(null);
  setLoading(true);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...payload, players: Number(payload.players)})
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");
      setStatus({ok: true, message: `Booking request ${data.bookingId} created successfully.`});
      formElement.reset();
      setPlayers(1);
      setTime("10:00");
    } catch (err) {
      setStatus({ok: false, message: err instanceof Error ? err.message : "Something went wrong."});
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="booking-form" onSubmit={submit}>
      <div className="form-row">
        <label>Full name<input name="name" required minLength={2} maxLength={80} autoComplete="name"/></label>
        <label>Email<input name="email" required type="email" maxLength={120} autoComplete="email"/></label>
      </div>
      <div className="form-row">
        <label>Phone<input name="phone" required inputMode="tel" pattern="[0-9+() -]{7,20}" maxLength={20} autoComplete="tel"/></label>
        <label>Players<input name="players" type="number" min={1} max={12} value={players} onChange={e => setPlayers(Number(e.target.value))}/></label>
      </div>
      <div className="form-row">
        <label>Game<select name="gameId" value={gameId} onChange={e => setGameId(e.target.value)}>{games.map(g => <option key={g.id} value={g.id}>{g.name} — ₹{g.price}</option>)}</select></label>
        <label>Date<input name="date" required type="date" min={new Date().toISOString().slice(0,10)} value={date} onChange={e => setDate(e.target.value)}/></label>
      </div>
      <div className="form-row">
        <label>Start time<select name="time" value={time} onChange={e => setTime(e.target.value)}>
          {["10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00"].map(t => <option key={t}>{t}</option>)}
        </select></label>
        <div className="price-box"><span>Estimated total</span><strong>₹{total.toLocaleString("en-IN")}</strong></div>
      </div>
      <input type="hidden" name="source" value="website"/>
      <button className="button primary wide" disabled={loading}>{loading ? <><Loader2 className="spin"/> Saving...</> : <><CalendarDays/> Request booking</>}</button>
      {status && <div className={status.ok ? "status success" : "status error"}>{status.ok && <CheckCircle2/>}{status.message}</div>}
      <p className="form-help">Booking requests are recorded for venue staff. Availability should be confirmed before the session is treated as final.</p>
    </form>
  );
}
