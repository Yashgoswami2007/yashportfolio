import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence, LayoutGroup } from "motion/react";
import { useRef, useState, useEffect } from "react";
import robotImg from "@/assets/robot.png";
import heroImg from "@/assets/hero.jpg";
import projFusionnet from "@/assets/proj-fusionnet.jpg";
import projAegis from "@/assets/proj-aegis.jpg";
import projRaven from "@/assets/proj-raven.jpg";
import projXenutron from "@/assets/proj-xenutron.jpg";
import projMoodDoctor from "@/assets/proj-mooddoctor.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yash Goswami — AI Engineer · Atomic Labs Dossier" },
      {
        name: "description",
        content:
          "Yash Goswami — AI engineer building LLMs, federated learning systems, and autonomous multi-agent architectures. A retro-futurist dossier from the Atomic Labs archive.",
      },
      { property: "og:title", content: "Yash Goswami — AI Engineer" },
      {
        property: "og:description",
        content:
          "AI engineer specializing in LLMs, federated learning, and autonomous agents.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAME = "YASH GOSWAMI".split("");

type Project = {
  code: string;
  title: string;
  tag: string;
  blurb: string;
  stack: string[];
  category: "ai" | "web";
  image?: string;
  link?: string;
};

const PROJECTS: Project[] = [
  {
    code: "P-01",
    title: "FUSIONNET",
    tag: "Federated · Distributed",
    blurb:
      "Privacy-preserving federated training mesh. Compact LLMs trained across nodes without leaking a byte of raw data.",
    stack: ["PyTorch", "Flower", "Differential Privacy"],
    category: "ai",
    image: projFusionnet,
  },
  {
    code: "P-02",
    title: "A.E.G.I.S.",
    tag: "Defense · Agents",
    blurb:
      "Autonomous threat-response operating system. Multi-agent perimeter scanning the wire 24/7, escalating on anomalies.",
    stack: ["LangGraph", "FastAPI", "PPO"],
    category: "ai",
    image: projAegis,
  },
  {
    code: "P-03",
    title: "R.A.V.E.N.",
    tag: "Recon · Intelligence",
    blurb:
      "Long-range OSINT bird. Crawls signals, distills intent, and reports back as structured intelligence dossiers.",
    stack: ["LLMs", "Vector DB", "LoRA"],
    category: "ai",
    image: projRaven,
  },
  {
    code: "P-04",
    title: "XENUTRON",
    tag: "Swarm · Simulation",
    blurb:
      "Multi-agent swarm simulator for coordinated drone behavior, trained with reinforcement learning in custom envs.",
    stack: ["RL", "Gymnasium", "JAX"],
    category: "ai",
    image: projXenutron,
  },
  {
    code: "P-05",
    title: "MOOD DOCTOR",
    tag: "Health · Conversational",
    blurb:
      "Empathy-tuned LLM companion for mood tracking and CBT-style reflection. Soft on the user, strict on privacy.",
    stack: ["LLM", "RAG", "Edge"],
    category: "ai",
    image: projMoodDoctor,
  },
  {
    code: "W-01",
    title: "VAIBHAV PORTFOLIO",
    tag: "Portfolio · Frontend",
    blurb:
      "Modern personal portfolio website with responsive layouts, clean UI, and optimized performance.",
    stack: ["HTML", "CSS", "JavaScript"],
    category: "web",
    link: "https://vaibhav-portfolio.saturn2007km-676.workers.dev/",
  },
  {
    code: "W-02",
    title: "CLIENT DELIVERY",
    tag: "Client · Delivery",
    blurb:
      "Custom website built and delivered for a client with a focus on usability, responsiveness, and modern design.",
    stack: ["React", "Responsive Design", "Frontend Development"],
    category: "web",
    link: "https://1drv.ms/v/c/142c49342bccb667/IQAE1Qbo65guSK6aRWFnoYgUAV2mxpJzxrf1OrrBbkVKv0w",
  },
  {
    code: "W-03",
    title: "YASH PORTFOLIO",
    tag: "Portfolio · Showcase",
    blurb:
      "Personal portfolio website showcasing projects, skills, and technical experience.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    category: "web",
    link: "https://yash-goswami-portfolio.netlify.app/",
  },
  {
    code: "W-04",
    title: "E-COMMERCE PLATFORM",
    tag: "Commerce · Storefront",
    blurb:
      "Modern e-commerce website featuring product browsing, responsive design, and a polished shopping experience.",
    stack: ["React", "E-Commerce", "UI/UX"],
    category: "web",
    link: "https://www.linkedin.com/posts/yash-goswami-551590374_delivered-another-modern-ecommerce-website-activity-7452282291181199360-sLdI",
  },
  {
    code: "W-05",
    title: "REACT + SUPABASE",
    tag: "Full-Stack · Realtime",
    blurb:
      "Full-stack web application with authentication, database integration, and real-time backend services.",
    stack: ["React", "Supabase", "Authentication"],
    category: "web",
    link: "https://www.linkedin.com/posts/yash-goswami-551590374_webdevelopment-reactjs-supabase-activity-7457095295819063296-mIpt",
  },
];

const SKILLS_AI = [
  { group: "Models", items: ["LLMs", "LoRA / QLoRA", "Diffusion", "Compact LMs"] },
  { group: "Systems", items: ["Federated Learning", "Multi-Agent", "RL / PPO", "RAG"] },
  { group: "Stack", items: ["PyTorch", "LangGraph", "FastAPI", "Hugging Face"] },
  { group: "Ops", items: ["Docker", "Postgres", "Vector DBs", "Edge Runtimes"] },
] as const;

const SKILLS_WEB = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "UI/UX"] },
  { group: "Full Stack", items: ["Supabase", "REST APIs", "Authentication", "Server Actions", "Real-Time Apps"] },
  { group: "Data", items: ["PostgreSQL", "Database Design", "Caching", "Data Modeling", "Storage"] },
  { group: "Production", items: ["Docker", "Vercel", "Cloudflare", "CI/CD", "Analytics"] },
] as const;

const MARQUEE_AI = [
  "LLMs", "Federated Learning", "Multi-Agent", "PPO", "PyTorch", "LangGraph", "FastAPI",
  "LoRA", "RAG", "Diffusion", "Vector DBs", "Edge", "JAX", "Hugging Face",
];

const MARQUEE_WEB = [
  "React", "TypeScript", "Next.js", "MongoDB", "Supabase", "Tailwind CSS",
  "Node.js", "Vercel", "REST APIs", "PostgreSQL", "Cloudflare", "Framer Motion",
];

const CERTIFICATIONS = [
  { issuer: "JPMorgan Chase", title: "Software Engineering Job Simulation", meta: "Forage" },
  { issuer: "Forge", title: "Job Simulation Certificate", meta: "Industry Sim" },
  { issuer: "Harvard University", title: "CS50 — Artificial Intelligence", meta: "11 Projects Completed" },
  { issuer: "Anthropic", title: "AI Fluency · Claude Code in Action · Claude 101", meta: "Framework" },
  { issuer: "Google", title: "Data Analytics Professional Certificate & AI Essentials", meta: "Professional" },
  { issuer: "Machine Learning A-Z", title: "AI, Python & ChatGPT (2026)", meta: "Specialization" },
  { issuer: "HP", title: "Introduction to Artificial Intelligence", meta: "Foundations" },
];

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

/* ---------- TOP BAR with live clock ---------- */
function TopBar() {
  const [t, setT] = useState<string>("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, "0");
      const mm = String(d.getUTCMinutes()).padStart(2, "0");
      const ss = String(d.getUTCSeconds()).padStart(2, "0");
      setT(`${hh}:${mm}:${ss} UTC`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/90 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] sm:flex sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="inline-block h-2 w-2 shrink-0 bg-rust animate-pulse-dot" />
          <span className="truncate">Atomic Labs · Unit YG-2007</span>
        </div>
        <nav className="hidden items-center gap-5 md:flex">
          <a href="#dossier" className="hover:text-rust">Dossier</a>
          <a href="#projects" className="hover:text-rust">Projects</a>
          <a href="#skills" className="hover:text-rust">Skills</a>
          <a href="#certifications" className="hover:text-rust">Certs</a>
          <a href="#contact" className="hover:text-rust">Contact</a>
        </nav>
        <span className="shrink-0 text-muted-foreground">{t || "––:––:–– UTC"}</span>
      </div>
    </header>
  );
}

/* ---------- HERO: big cinematic image with parallax + name overlay ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[92vh] min-h-[640px] w-full overflow-hidden border-b-2 border-ink">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Astronaut beneath a giant orange planet"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/10 to-transparent" />
        <div className="absolute inset-0 mix-blend-multiply opacity-30 [background:repeating-linear-gradient(0deg,rgba(26,24,20,0.25)_0_1px,transparent_1px_3px)]" />
      </motion.div>

      <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-5 py-10 sm:px-8">
        <div className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-paper mix-blend-difference">
          <div>
            <p>Transmission № 001</p>
            <p className="mt-1 text-rust">// Personnel File</p>
          </div>
          <div className="text-right">
            <p>Sector 04</p>
            <p className="mt-1">Moradabad · IN</p>
          </div>
        </div>

        <div className="pb-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-rust">
            ◢ Now broadcasting
          </p>
          <h1
            className="font-display text-[clamp(3rem,13vw,11rem)] leading-[0.82] font-black uppercase tracking-tight text-ink mix-blend-difference [text-shadow:0_2px_0_rgba(0,0,0,0.1)]"
            aria-label="Yash Goswami"
          >
            <span className="flex flex-wrap text-paper">
              {NAME.map((ch, i) =>
                ch === " " ? (
                  <span key={i} className="w-4 sm:w-8" />
                ) : (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 60, rotateX: -40 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.2 + i * 0.04, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                    className="inline-block"
                  >
                    {ch}
                  </motion.span>
                )
              )}
            </span>
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-6 grid gap-6 sm:grid-cols-[1.4fr_1fr] sm:items-end"
          >
            <p className="max-w-xl font-serif text-base leading-relaxed text-paper sm:text-xl">
              <span className="font-mono text-xs uppercase tracking-widest text-rust">
                Classification —{" "}
              </span>
              AI engineer building <em className="not-italic font-semibold text-rust">large language models</em>,
              federated learning systems, and <em className="not-italic font-semibold text-rust">autonomous multi-agent</em> architectures.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 border-2 border-paper bg-paper px-5 py-3 font-mono text-xs uppercase tracking-[0.25em] text-ink transition-colors hover:bg-rust hover:text-paper hover:border-rust"
              >
                Open dossier
                <span className="transition-transform group-hover:translate-x-1">▸</span>
              </a>
              <a
                href="https://github.com/Yashgoswami2007"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-paper px-5 py-3 font-mono text-xs uppercase tracking-[0.25em] text-paper hover:bg-paper hover:text-ink"
              >
                Github ↗
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-paper"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span>scroll</span>
          <span className="h-6 w-px bg-paper" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- DOSSIER (about) with mascot tilt ---------- */
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 14);
    rx.set(-py * 14);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}

function Dossier() {
  return (
    <section id="dossier" className="paper-grain border-b-2 border-ink py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 flex items-baseline gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-rust">§ 02</span>
          <h2 className="font-display text-4xl font-black uppercase tracking-wider sm:text-6xl">
            The Operator
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <TiltCard>
            <div className="relative double-rule bg-card p-4 animate-flicker">
              <Rivet className="top-2 left-2" />
              <Rivet className="top-2 right-2" />
              <Rivet className="bottom-2 left-2" />
              <Rivet className="bottom-2 right-2" />
              <div className="flex items-center justify-between border-b-2 border-ink pb-2 font-mono text-[10px] uppercase tracking-[0.2em]">
                <span>Model — YG-07 Mk.II</span>
                <span className="text-rust">● LIVE</span>
              </div>
              <img
                src={robotImg}
                alt="Retro-futurist robot mascot"
                width={1024}
                height={1024}
                loading="lazy"
                className="mx-auto block w-full"
              />
              <div className="grid grid-cols-3 gap-2 border-t-2 border-ink pt-3 font-mono text-[10px] uppercase tracking-[0.15em]">
                <div><div className="text-muted-foreground">Power</div><div>100%</div></div>
                <div><div className="text-muted-foreground">Mode</div><div className="text-rust">Build</div></div>
                <div><div className="text-muted-foreground">Year</div><div>2026</div></div>
              </div>
            </div>
          </TiltCard>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-serif text-xl leading-relaxed sm:text-2xl">
              Computer Science undergraduate and independent AI developer based in Moradabad, India.
              I build <span className="bg-rust/15 px-1">distributed AI infrastructure</span>,
              privacy-preserving training pipelines, and{" "}
              <span className="bg-steel/15 px-1">production-ready agent systems</span> using PyTorch,
              Hugging Face, FastAPI and LangGraph.
            </p>
            <p className="mt-6 font-serif text-base leading-relaxed text-muted-foreground sm:text-lg">
              Current obsessions — compact LLMs, federated learning attack surfaces, and self-healing
              multi-agent operating systems. Researching how small models, aggregated privately, can
              punch above their weight.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden border-2 border-ink bg-ink font-mono text-xs uppercase tracking-[0.2em] sm:grid-cols-4">
              {[
                ["Status", "Online", true],
                ["Base", "Moradabad"],
                ["Degree", "B.Tech CSE"],
                ["Class", "'25–'29"],
              ].map(([k, v, accent]) => (
                <div key={k as string} className="bg-card p-4">
                  <div className="text-muted-foreground">{k}</div>
                  <div className={`mt-1 text-sm ${accent ? "text-rust" : "text-ink"}`}>
                    {accent && <span className="mr-1 inline-block h-1.5 w-1.5 bg-rust animate-pulse-dot align-middle" />}
                    {v as string}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- PROJECTS: big alternating plates ---------- */
function ProjectPlate({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const reverse = i % 2 === 1;

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className="grid gap-6 border-b-2 border-ink py-16 last:border-b-0 lg:grid-cols-12 lg:gap-10 lg:py-24"
    >
      <div className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
        <div className="group relative overflow-hidden border-2 border-ink bg-ink">
          {p.image ? (
            <motion.img
              style={{ y }}
              src={p.image}
              alt={p.title}
              width={1280}
              height={960}
              loading="lazy"
              className="aspect-[4/3] w-full scale-110 object-cover transition-transform duration-700 group-hover:scale-100"
            />
          ) : (
            <motion.div
              style={{ y }}
              className="relative flex aspect-[4/3] w-full scale-110 items-center justify-center overflow-hidden bg-ink transition-transform duration-700 group-hover:scale-100"
            >
              <div className="absolute inset-0 [background:repeating-linear-gradient(135deg,rgba(200,80,30,0.18)_0_2px,transparent_2px_18px)]" />
              <div className="absolute inset-0 bg-gradient-to-br from-rust/30 via-transparent to-steel/40" />
              <span className="relative font-display text-[clamp(3rem,10vw,7rem)] font-black uppercase tracking-tight text-paper/90 mix-blend-difference">
                {p.title.split(" ")[0]}
              </span>
            </motion.div>
          )}
          <div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-20 [background:repeating-linear-gradient(0deg,rgba(26,24,20,0.4)_0_1px,transparent_1px_3px)]" />
          <div className="absolute top-3 left-3 border border-paper/70 bg-ink/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-paper">
            {p.code} · {p.tag}
          </div>
          <div className="absolute right-3 bottom-3 border border-paper/70 bg-ink/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-paper">
            ● REC
          </div>
        </div>
      </div>

      <div className={`flex flex-col justify-center lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-rust">{p.code}</p>
        <h3 className="mt-3 font-display text-5xl font-black uppercase leading-[0.9] sm:text-7xl">
          {p.title}
        </h3>
        <p className="mt-5 max-w-md font-serif text-lg leading-relaxed text-ink/80">{p.blurb}</p>
        <div className="mt-6 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-widest">
          {p.stack.map((s) => (
            <span key={s} className="border border-ink bg-paper px-2 py-1">{s}</span>
          ))}
        </div>
        {p.link && (
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex w-fit items-center gap-2 border-2 border-ink bg-ink px-4 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-paper transition-colors hover:bg-rust hover:border-rust"
          >
            Visit project
            <span className="transition-transform group-hover:translate-x-1">↗</span>
          </a>
        )}
      </div>
    </motion.article>
  );
}

function CategoryToggle({
  value,
  onChange,
}: {
  value: "ai" | "web";
  onChange: (v: "ai" | "web") => void;
}) {
  const options: { id: "ai" | "web"; label: string }[] = [
    { id: "ai", label: "AI" },
    { id: "web", label: "Web" },
  ];
  return (
    <LayoutGroup id="cat-toggle">
      <div
        role="tablist"
        aria-label="Project category"
        className="relative inline-flex items-center gap-1 border-2 border-ink bg-paper p-1 font-mono text-xs uppercase tracking-[0.25em]"
      >
        {options.map((o) => {
          const active = value === o.id;
          return (
            <button
              key={o.id}
              role="tab"
              aria-selected={active}
              onClick={() => onChange(o.id)}
              className={`relative px-5 py-2 transition-colors ${
                active ? "text-paper" : "text-ink hover:text-rust"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="cat-toggle-pill"
                  className="absolute inset-0 bg-ink"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{o.label}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

function Projects({ cat, setCat }: { cat: "ai" | "web"; setCat: (v: "ai" | "web") => void }) {
  const filtered = PROJECTS.filter((p) => p.category === cat);
  return (
    <section id="projects" className="border-b-2 border-ink bg-paper">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-ink py-10">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-rust">§ 03</span>
            <h2 className="font-display text-4xl font-black uppercase tracking-wider sm:text-6xl">
              Field Archive
            </h2>
          </div>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground sm:block">
            {filtered.length.toString().padStart(2, "0")} files · declassified
          </span>
        </div>
        <div className="flex items-center justify-between gap-4 py-6">
          <CategoryToggle value={cat} onChange={setCat} />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Filter · {cat === "ai" ? "Artificial Intelligence" : "Web Development"}
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            {filtered.map((p, i) => (
              <ProjectPlate key={p.code} p={p} i={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------- SKILLS: marquee + grid ---------- */
function Marquee({ cat }: { cat: "ai" | "web" }) {
  const items = cat === "ai" ? MARQUEE_AI : MARQUEE_WEB;
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden border-y-2 border-ink bg-ink py-4">
      <motion.div
        key={cat}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex gap-10 whitespace-nowrap font-display text-5xl font-black uppercase tracking-tight text-paper sm:text-7xl"
      >
        {loop.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            {w}
            <span className="inline-block h-3 w-3 rotate-45 bg-rust" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Skills({ cat }: { cat: "ai" | "web" }) {
  const data = cat === "ai" ? SKILLS_AI : SKILLS_WEB;
  return (
    <section id="skills" className="paper-grain border-b-2 border-ink">
      <Marquee cat={cat} />
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mb-10 flex items-baseline gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-rust">§ 04</span>
          <h2 className="font-display text-4xl font-black uppercase tracking-wider sm:text-6xl">
            Instrumentation
          </h2>
          <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            / {cat === "ai" ? "AI Bays" : "Web Bays"}
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid gap-px overflow-hidden border-2 border-ink bg-ink sm:grid-cols-2 lg:grid-cols-4"
          >
            {data.map((s, idx) => (
              <motion.div
                key={s.group}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-card p-6"
              >
                <div className="flex items-center justify-between border-b-2 border-ink pb-2 font-mono text-[10px] uppercase tracking-[0.25em]">
                  <span>Bay {String(idx + 1).padStart(2, "0")}</span>
                  <span className="text-rust">{s.group}</span>
                </div>
                <ul className="mt-4 space-y-2 font-display text-2xl font-black uppercase leading-tight">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-center gap-2">
                      <span className="inline-block h-2 w-2 bg-rust" />
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------- CERTIFICATIONS ---------- */
function Certifications() {
  return (
    <section id="certifications" className="paper-grain border-b-2 border-ink py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 flex items-baseline gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-rust">§ 05</span>
          <h2 className="font-display text-4xl font-black uppercase tracking-wider sm:text-6xl">
            Certifications
          </h2>
          <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            / Stamped & Sealed
          </span>
        </div>
        <div className="grid gap-px overflow-hidden border-2 border-ink bg-ink md:grid-cols-2">
          {CERTIFICATIONS.map((c, i) => (
            <motion.div
              key={c.issuer + i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
              className="relative bg-card p-6 sm:p-8"
            >
              <Rivet className="top-2 left-2" />
              <Rivet className="top-2 right-2" />
              <Rivet className="bottom-2 left-2" />
              <Rivet className="bottom-2 right-2" />
              <div className="flex items-center justify-between border-b-2 border-ink pb-2 font-mono text-[10px] uppercase tracking-[0.25em]">
                <span>Cert № {String(i + 1).padStart(3, "0")}</span>
                <span className="text-rust">● Verified</span>
              </div>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em] text-rust">
                {c.issuer}
              </p>
              <h3 className="mt-2 font-display text-2xl font-black uppercase leading-tight sm:text-3xl">
                {c.title}
              </h3>
              <div className="mt-4 inline-block border border-ink bg-paper px-2 py-1 font-mono text-[10px] uppercase tracking-[0.25em]">
                {c.meta}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CONTACT slab ---------- */
function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0 opacity-10 [background:repeating-linear-gradient(45deg,var(--paper)_0_1px,transparent_1px_14px)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-rust">§ 05 — Establish Comms</p>
          <h2 className="mt-6 font-display text-6xl font-black uppercase leading-[0.85] sm:text-8xl lg:text-9xl">
            Let's build <br />
            something <span className="text-rust">radioactive.</span>
          </h2>
        </div>
        <div className="space-y-4 font-mono text-sm uppercase tracking-[0.2em]">
          <a
            href="https://github.com/Yashgoswami2007"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between border-2 border-paper bg-paper px-5 py-4 text-ink transition-all hover:bg-rust hover:text-paper hover:border-rust"
          >
            <span>▸ Github / Yashgoswami2007</span>
            <span className="transition-transform group-hover:translate-x-1">↗</span>
          </a>
          <a
            href="#"
            className="group flex items-center justify-between border-2 border-paper px-5 py-4 transition-all hover:bg-paper hover:text-ink"
          >
            <span>▸ Transmit signal</span>
            <span>SOON</span>
          </a>
          <div className="border-2 border-paper/30 p-5 font-mono text-[11px] tracking-[0.25em]">
            <div className="flex justify-between"><span>Frequency</span><span className="text-rust">108.5 MHz</span></div>
            <div className="mt-2 flex justify-between"><span>Channel</span><span>YG-2007</span></div>
            <div className="mt-2 flex justify-between"><span>Status</span><span className="text-rust">● Listening</span></div>
          </div>
        </div>
      </div>
      <div className="border-t border-paper/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-5 py-6 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/60 sm:flex-row sm:justify-between sm:px-8">
          <span>© MMXXVI · Atomic Labs Archive</span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 bg-rust animate-pulse-dot" />
            Transmission stable
          </span>
        </div>
      </div>
    </section>
  );
}

function Index() {
  const [cat, setCat] = useState<"ai" | "web">("ai");
  return (
    <main className="text-ink">
      <TopBar />
      <Hero />
      <Dossier />
      <Projects cat={cat} setCat={setCat} />
      <Skills cat={cat} />
      <Certifications />
      <Contact />
    </main>
  );
}
