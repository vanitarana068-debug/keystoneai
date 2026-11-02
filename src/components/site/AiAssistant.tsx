import { useEffect, useRef, useState } from "react";
import { Bot, X, Send } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { DemoBadge, scrollToSection } from "./primitives";

type Msg = { from: "ai" | "me"; text: string };
const QUICK = ["What can the AI receptionist do?", "Does it work for lettings?", "How much does it cost?", "Book a strategy call"];

function reply(q: string): string {
  const s = q.toLowerCase();
  if (s.includes("book") || s.includes("call")) return "Great — I'll take you to our booking form now.";
  if (s.includes("cost") || s.includes("price")) return "The strategy call is free. Audits start from £1,500 and implementation is scoped per agency.";
  if (s.includes("letting") || s.includes("tenant") || s.includes("landlord")) return "Yes — it can pre-qualify tenants, book viewings and nurture landlord leads around the clock.";
  if (s.includes("receptionist") || s.includes("phone")) return "It answers calls 24/7, captures caller details, books viewings and valuations, and logs everything to your CRM.";
  if (s.includes("gdpr") || s.includes("data")) return "Every solution is designed with UK GDPR in mind, including call recording notices and data processing agreements.";
  return "Good question! A specialist can answer that on a free 45-minute strategy call. Type 'book' to arrange one.";
}

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "ai", text: "Hi! I'm a demo of the kind of assistant we build for agencies. Ask me anything." }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const nav = useNavigate();
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => end.current?.scrollIntoView({ behavior: "smooth" }), [msgs, typing]);

  const send = (text: string) => {
    const t = text.trim().slice(0, 300);
    if (!t) return;
    setMsgs((m) => [...m, { from: "me", text: t }]);
    setInput(""); setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const r = reply(t);
      setMsgs((m) => [...m, { from: "ai", text: r }]);
      if (r.startsWith("Great")) setTimeout(() => { setOpen(false); if (!scrollToSection("book-demo")) nav({ to: "/", hash: "book-demo" }); }, 900);
    }, 700);
  };

  return (
    <>
      {open && (
        <div role="dialog" aria-label="AI assistant demonstration" className="glass fixed right-4 bottom-24 z-50 flex h-[480px] w-[calc(100vw-2rem)] max-w-sm flex-col rounded-3xl animate-slide-in"
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
          <div className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-full bg-brand"><Bot className="h-4 w-4" /></span><span className="font-semibold">Keystone Assistant</span></div>
            <div className="flex items-center gap-2"><DemoBadge label="Demo" /><button aria-label="Close assistant" onClick={() => setOpen(false)}><X className="h-4 w-4" /></button></div>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${m.from === "ai" ? "bg-secondary" : "ml-auto bg-brand"}`}>{m.text}</div>
            ))}
            {typing && <div className="w-16 rounded-2xl bg-secondary px-3.5 py-2.5 text-sm">…</div>}
            {msgs.length < 3 && (
              <div className="flex flex-wrap gap-2 pt-2">{QUICK.map((q) => <button key={q} onClick={() => send(q)} className="rounded-full border border-border px-3 py-1.5 text-xs hover:border-cyan">{q}</button>)}</div>
            )}
            <div ref={end} />
          </div>
          <form className="flex gap-2 border-t border-border p-3" onSubmit={(e) => { e.preventDefault(); send(input); }}>
            <label htmlFor="ai-input" className="sr-only">Message</label>
            <input id="ai-input" value={input} maxLength={300} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question…" className="flex-1 rounded-full border border-input bg-background/60 px-4 py-2 text-sm" />
            <button type="submit" aria-label="Send" className="grid h-10 w-10 place-items-center rounded-full bg-brand"><Send className="h-4 w-4" /></button>
          </form>
        </div>
      )}
      <button onClick={() => setOpen(!open)} aria-label={open ? "Close AI assistant" : "Open AI assistant demo"} aria-expanded={open}
        className="fixed right-4 bottom-4 z-50 grid h-16 w-16 place-items-center rounded-full bg-brand shadow-glow animate-pulse-ring transition hover:scale-105">
        {open ? <X /> : <Bot className="h-7 w-7" />}
      </button>
    </>
  );
}
