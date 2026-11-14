type Movement = "king" | "queen";

type Pillar = {
  symbol?: string;
  title: string;
  description: string;
};

const pillars: Record<Movement, Pillar[]> = {
  king: [
    { symbol: "♔", title: "Identity & Mindset", description: "Rewrite limiting narratives, challenge fixed beliefs, and build a self-definition rooted in purpose." },
    { symbol: "♙", title: "Brotherhood & Respect", description: "Replace degrading language and isolation with dignity, trust, accountability, and mutual elevation." },
    { symbol: "♗", title: "Healing & Mental Wellness", description: "Build emotional awareness, healthier coping tools, and the courage to address pain without shame." },
    { symbol: "♖", title: "Self-Love & Self-Care", description: "Practice the habits, boundaries, and care that protect physical, emotional, and spiritual well-being." },
    { symbol: "♘", title: "Confidence & Communication", description: "Develop a clear voice, regulate emotion, navigate conflict, and communicate with strength and respect." },
    { symbol: "♕", title: "Goals & Discipline", description: "Turn vision into a plan through consistent habits, deliberate choices, and personal accountability." },
    { symbol: "♟", title: "Business & Entrepreneurship", description: "Learn financial thinking, business fundamentals, ownership, and how to build lasting value." },
    { symbol: "♚", title: "Leadership & Service", description: "Lead at home, at work, and in community by modeling integrity, contribution, and responsibility." },
  ],
  queen: [
    { title: "Know your worth", description: "Stand rooted in who you are—before a title, a role, or anyone else’s expectations." },
    { title: "Adjust with grace", description: "Realignment is not defeat. Pause, reset, and return to yourself without apology." },
    { title: "Own your voice", description: "Speak your truth with clarity. Your perspective belongs in every room you enter." },
    { title: "Protect your peace", description: "Set boundaries that honor your healing, your energy, and the life you are building." },
    { title: "Move with purpose", description: "Choose with intention and let your values guide the way you show up and lead." },
    { title: "Build your power", description: "Strengthen your knowledge, resources, and independence so your choices remain your own." },
    { title: "Crown another Queen", description: "We rise higher when we create room, share wisdom, and celebrate each other out loud." },
    { title: "Leave a legacy", description: "Turn healing into inheritance and create a path the next generation can walk with confidence." },
  ],
};

export function MovementPillars({ movement }: { movement: Movement }) {
  const movementName = movement === "king" ? "KingMe" : "QueenMe";

  return (
    <section
      className={`movement-pillars pillars-${movement}`}
      aria-label={`Eight ${movementName} pillars`}
    >
      <div className="movement-pillars-heading">
        <p className="chapter-overline">Identity / Purpose / Growth</p>
        <h3>The Eight {movementName} Pillars</h3>
      </div>
      <div className="movement-pillars-grid">
        {pillars[movement].map((pillar, index) => (
          <article className="movement-pillar" key={pillar.title}>
            <div className="movement-pillar-mark">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span aria-hidden="true">{pillar.symbol ?? "✦"}</span>
            </div>
            <h4>{pillar.title}</h4>
            <p>{pillar.description}</p>
          </article>
        ))}
      </div>
      {movement === "queen" && (
        <p className="movement-pillar-manifesto">
          KingMe + QueenMe <strong>Rise Together.</strong>
        </p>
      )}
    </section>
  );
}
