import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import robotImg from "@/assets/robot.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yash Goswami — AI Engineer" },
      {
        name: "description",
        content:
          "Yash Goswami — AI engineer building LLMs, federated learning systems, and autonomous multi-agent architectures. Atompunk dossier from the Atomic Labs.",
      },
      { property: "og:title", content: "Yash Goswami — AI Engineer" },
      {
        property: "og:description",
        content:
          "Aspiring AI engineer specializing in LLMs, federated learning, and autonomous agent systems.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAME = "YASH GOSWAMI".split("");

function CornerBrackets() {
  return (
    <>
      <span aria-hidden className="absolute -top-1.5 -left-1.5 h-4 w-4 border-t-2 border-l-2 border-ink" />
      <span aria-hidden className="absolute -top-1.5 -right-1.5 h-4 w-4 border-t-2 border-r-2 border-ink" />
      <span aria-hidden className="absolute -bottom-1.5 -left-1.5 h-4 w-4 border-b-2 border-l-2 border-ink" />
      <span aria-hidden className="absolute -bottom-1.5 -right-1.5 h-4 w-4 border-b-2 border-r-2 border-ink" />
    </>
  );
}

function Rivet({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-2 w-2 rounded-full bg-ink shadow-[inset_0_0_0_1px_var(--paper)] ${className}`}
    />
  );
}

function Index() {
  return (
    <main className="paper-grain min-h-screen text-ink">
      {/* TOP BAR */}
      <header className="border-b-2 border-ink">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em]">
          <div className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 bg-rust animate-pulse-dot" />
            <span>Atomic Labs // Unit YG-2007</span>
          </div>
          <div className="hidden items-center gap-4 sm:flex">
            <span className="text-muted-foreground">Sector 04 · Moradabad</span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-rust animate-pulse-dot" />
              REC
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10 sm:py-16">
        {/* HERO */}
        <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-rust">
              Dossier № 001 — Personnel File
            </p>

            <h1
              className="mt-5 font-display text-[clamp(3.5rem,11vw,8.5rem)] leading-[0.85] font-black uppercase tracking-tight text-ink"
              aria-label="Yash Goswami"
            >
              <span className="flex flex-wrap">
                {NAME.map((ch, i) =>
                  ch === " " ? (
                    <span key={i} className="w-4 sm:w-6" />
                  ) : (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: i * 0.04,
                        duration: 0.5,
                        ease: [0.2, 0.8, 0.2, 1],
                      }}
                      className="inline-block"
                    >
                      {ch}
                    </motion.span>
                  )
                )}
              </span>
            </h1>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-ink" />
              <span className="h-px flex-1 bg-ink" />
            </div>

            <p className="mt-6 max-w-lg font-serif text-lg leading-relaxed sm:text-xl">
              <span className="font-mono text-sm uppercase tracking-widest text-steel">
                Classification —{" "}
              </span>
              AI Engineer working on{" "}
              <em className="text-rust not-italic font-semibold">large language models</em>,
              federated learning, reinforcement learning, and{" "}
              <em className="text-rust not-italic font-semibold">autonomous multi-agent</em>{" "}
              systems.
            </p>

            <div className="mt-8 inline-flex items-center gap-2 border-2 border-ink bg-paper px-4 py-2 font-mono text-sm">
              <span className="text-rust">&gt;</span>
              <span>boot.portfolio</span>
              <span className="animate-caret">_</span>
            </div>
          </div>

          {/* Robot panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative double-rule bg-card p-4 animate-flicker">
              <Rivet className="top-2 left-2" />
              <Rivet className="top-2 right-2" />
              <Rivet className="bottom-2 left-2" />
              <Rivet className="bottom-2 right-2" />

              <div className="flex items-center justify-between border-b-2 border-ink pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink">
                <span>Model — YG-07 Mk.II</span>
                <span className="text-rust">● LIVE</span>
              </div>

              <img
                src={robotImg}
                alt="Retro-futurist robot mascot beside an instrument panel"
                width={1024}
                height={1024}
                className="mx-auto block w-full max-w-md"
              />

              <div className="grid grid-cols-3 gap-2 border-t-2 border-ink pt-3 font-mono text-[10px] uppercase tracking-[0.15em]">
                <div>
                  <div className="text-muted-foreground">Power</div>
                  <div className="text-ink">100%</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Mode</div>
                  <div className="text-rust">Build</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Year</div>
                  <div className="text-ink">2026</div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ABOUT / DOSSIER */}
        <section className="mt-20 sm:mt-28">
          <div className="mb-6 flex items-baseline gap-4">
            <h2 className="font-display text-3xl font-black uppercase tracking-wider sm:text-5xl">
              Dossier
            </h2>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              // Section 02 — About the Operator
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative double-rule bg-card p-6 sm:p-10">
              <CornerBrackets />

              <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
                <div>
                  <p className="font-serif text-lg leading-relaxed sm:text-xl">
                    Computer Science undergraduate and independent AI developer based in
                    Moradabad, India. I build{" "}
                    <span className="bg-rust/15 px-1 text-ink">distributed AI infrastructure</span>
                    , privacy-preserving training pipelines, and{" "}
                    <span className="bg-steel/15 px-1 text-ink">
                      production-ready agent systems
                    </span>{" "}
                    using PyTorch, Hugging Face, FastAPI, and LangGraph.
                  </p>
                  <p className="mt-6 font-serif text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Current obsessions: compact LLMs, federated learning attack surfaces, and
                    self-healing multi-agent operating systems. Researching how small models,
                    aggregated privately, can punch above their weight.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-widest">
                    {[
                      "LLMs",
                      "Federated Learning",
                      "PPO / RL",
                      "Multi-Agent",
                      "PyTorch",
                      "LangGraph",
                      "FastAPI",
                      "LoRA",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="border border-ink bg-paper px-2 py-1 text-ink"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status panel */}
                <aside className="font-mono text-xs uppercase tracking-[0.18em]">
                  <div className="border-2 border-ink">
                    <Row label="Status" value="Online" accent />
                    <Row label="Location" value="Moradabad, IN" />
                    <Row label="Education" value="B.Tech CSE · MIT" />
                    <Row label="Class of" value="2025 – 2029" />
                    <Row label="Role" value="Indie AI Dev" />
                  </div>

                  <a
                    href="https://github.com/Yashgoswami2007"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-4 flex items-center justify-between border-2 border-ink bg-ink px-4 py-3 text-paper transition-colors hover:bg-rust hover:text-paper"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-rust group-hover:text-paper">▸</span>
                      Github / Yashgoswami2007
                    </span>
                    <span className="transition-transform group-hover:translate-x-1">↗</span>
                  </a>
                </aside>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="mt-20 flex flex-col items-center gap-2 border-t-2 border-ink pt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:flex-row sm:justify-between">
          <span>© MMXXVI · Atomic Labs Archive</span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 bg-rust animate-pulse-dot" />
            Transmission stable
          </span>
        </footer>
      </div>
    </main>
  );
}

function Row({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-ink px-3 py-2 last:border-b-0">
      <span className="text-muted-foreground">{label}</span>
      <span className={accent ? "text-rust" : "text-ink"}>
        {accent && <span className="mr-1 inline-block h-1.5 w-1.5 bg-rust animate-pulse-dot align-middle" />}
        {value}
      </span>
    </div>
  );
}
