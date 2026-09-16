 "use client";

import { useState } from "react";
import { Bot, Send, X, Sparkles } from "lucide-react";

type Message = { role: "user" | "assistant"; text: string };

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hi! I’m the GameZone assistant. Ask me about games, prices, booking steps, timings or venue policies." }
  ]);
  const [loading, setLoading] = useState(false);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, {role: "user" as const, text}];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ message: text, history: next.slice(-8) })
      });
      const data = await res.json();
      setMessages(m => [...m, {role: "assistant", text: data.reply || "Sorry, I couldn't answer that."}]);
    } catch {
      setMessages(m => [...m, {role: "assistant", text: "The assistant is temporarily unavailable. Please use the booking form."}]);
    } finally { setLoading(false); }
  }

  return (
    <>
      <button className="chat-fab" onClick={() => setOpen(true)} aria-label="Open AI assistant"><Bot/></button>
      {open && <div className="chat-panel">
        <div className="chat-head"><div><Sparkles/><strong>GameZone AI</strong><small>Venue assistant</small></div><button onClick={() => setOpen(false)} aria-label="Close"><X/></button></div>
        <div className="chat-body">{messages.map((m,i) => <div key={i} className={`bubble ${m.role}`}>{m.text}</div>)}{loading && <div className="bubble assistant">Thinking…</div>}</div>
        <div className="chat-input"><input value={input} maxLength={800} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask about GameZone…"/><button onClick={send} disabled={loading}><Send/></button></div>
      </div>}
    </>
  );
}