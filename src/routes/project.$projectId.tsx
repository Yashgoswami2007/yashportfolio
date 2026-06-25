import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { PROJECTS } from "@/data/projects";
import { useState, useEffect, useRef } from "react";

export const Route = createFileRoute("/project/$projectId")({
  loader: ({ params }) => {
    const project = PROJECTS.find((p) => p.code === params.projectId);
    if (!project) throw notFound();
    return project;
  },
  component: ProjectDetails,
  notFoundComponent: () => (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-paper font-mono text-ink">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6 border-2 border-ink p-16"
      >
        <span className="font-mono text-xs uppercase tracking-[0.4em] text-rust">// Error 404</span>
        <h1 className="font-display text-8xl font-black uppercase tracking-tight text-ink">LOST</h1>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Project file not found or classified.
        </p>
        <Link
          to="/"
          className="group mt-4 inline-flex items-center gap-2 border-2 border-ink bg-ink px-8 py-3 font-mono text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:bg-rust hover:border-rust"
        >
          Return to Base <span className="transition-transform group-hover:translate-x-1">▸</span>
        </Link>
      </motion.div>
    </div>
  ),
});

/* ── helpers ── */
function TopBar() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setT(
        `${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}:${String(d.getUTCSeconds()).padStart(2, "0")} UTC`
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em]">
        <div className="flex items-center gap-3">
          <span className="inline-block h-2 w-2 shrink-0 bg-rust animate-pulse-dot" />
          <span>Atomic Labs · Archive Reader</span>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/" className="transition-colors hover:text-rust">
            ◂ Return to Dossier
          </Link>
        </nav>
        <span className="shrink-0 text-muted-foreground">{t || "––:––:–– UTC"}</span>
      </div>
    </header>
  );
}

/* ── scanline overlay ── */
function ScanLines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 mix-blend-multiply opacity-[0.06]"
      style={{
        backgroundImage: "repeating-linear-gradient(0deg, #1a1814 0px, #1a1814 1px, transparent 1px, transparent 3px)",
      }}
    />
  );
}

/* ── main component ── */
function ProjectDetails() {
  const project = Route.useLoaderData();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // find adjacent projects for next/prev navigation
  const allProjInCat = PROJECTS.filter((p) => p.category === project.category);
  const idx = allProjInCat.findIndex((p) => p.code === project.code);
  const prevProj = allProjInCat[idx - 1] ?? null;
  const nextProj = allProjInCat[idx + 1] ?? null;

  const stagger = (i: number) => ({ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as [number,number,number,number] });

  return (
    <div className="min-h-screen bg-paper">
      <TopBar />

      {/* ── HERO BANNER ── */}
      <section ref={heroRef} className="relative h-[55vh] min-h-[420px] overflow-hidden border-b-2 border-ink">
        <motion.div style={{ y: heroY }} className="absolute inset-0 h-full w-full bg-rust">
          <div className="absolute inset-0 [background:repeating-linear-gradient(135deg,rgba(26,24,20,0.1)_0_2px,transparent_2px_20px)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-transparent" />
        </motion.div>
        <ScanLines />

        {/* Hero text */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 flex h-full flex-col justify-end px-6 pb-10 sm:px-12 sm:pb-14"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={stagger(0)}
            className="mb-3 flex items-center gap-4"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-rust">
              {project.code}
            </span>
            <span className="h-px w-12 bg-rust/60" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/60">
              {project.tag}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={stagger(1)}
            className="font-display text-[clamp(3.5rem,10vw,9rem)] font-black uppercase leading-[0.85] tracking-tight text-paper"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={stagger(2)}
            className="mt-4 max-w-xl font-serif text-base leading-relaxed text-paper/70 sm:text-lg"
          >
            {project.blurb}
          </motion.p>
        </motion.div>
      </section>

      {/* ── BREADCRUMB ── */}
      <div className="border-b border-ink/20 bg-card">
        <div className="mx-auto max-w-7xl px-5 py-3 sm:px-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-rust"
          >
            <span>◂</span> Archive
            <span className="text-ink/30">/</span>
            <span className="text-ink">{project.code}</span>
          </Link>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-12 sm:py-24">
        <div className="grid gap-16 lg:grid-cols-[1fr_360px] lg:gap-20">

          {/* Left: Description */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="mb-8 flex items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-rust">§ Mission Brief</span>
              <span className="flex-1 border-t border-ink/20" />
            </div>

            <p className="mb-6 font-serif text-xl leading-relaxed text-ink sm:text-2xl">
              <span className="float-left mr-3 mt-1 font-display text-6xl font-black leading-none text-rust">
                {project.detailedDescription.charAt(0)}
              </span>
              {project.detailedDescription.slice(1)}
            </p>

            {/* Status readout bar */}
            <div className="mt-12 grid grid-cols-3 gap-px overflow-hidden border-2 border-ink bg-ink font-mono text-xs uppercase tracking-[0.15em]">
              {[
                { label: "Category", value: project.category === "ai" ? "Artificial Intel." : "Web Dev" },
                { label: "Status", value: "Operational", accent: true },
                { label: "File Code", value: project.code },
              ].map(({ label, value, accent }) => (
                <div key={label} className="bg-paper p-5">
                  <div className="text-muted-foreground">{label}</div>
                  <div className={`mt-2 text-sm font-bold ${accent ? "text-rust" : "text-ink"}`}>
                    {accent && <span className="mr-1.5 inline-block h-1.5 w-1.5 bg-rust animate-pulse-dot align-middle" />}
                    {value}
                  </div>
                </div>
              ))}
            </div>

            {/* External CTA */}
            <div className="mt-12">
              {project.link ? (
                <a
                  href={project.link}
                  target={project.link.startsWith("#") ? undefined : "_blank"}
                  rel={project.link.startsWith("#") ? undefined : "noopener noreferrer"}
                  className="group inline-flex items-center gap-4 border-2 border-ink bg-ink px-8 py-5 font-mono text-xs uppercase tracking-[0.25em] text-paper transition-all duration-300 hover:bg-rust hover:border-rust hover:gap-6"
                >
                  <span>Initialize Project Link</span>
                  <span className="text-base">{project.link.startsWith("#") ? "▸" : "↗"}</span>
                </a>
              ) : (
                <div className="inline-flex items-center gap-4 border-2 border-ink/30 px-8 py-5 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  <span>External Link Classified</span>
                  <span>⊗</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right: Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="flex flex-col gap-8"
          >
            {/* Image card (thumbnail) */}
            {project.image && (
              <div className="relative overflow-hidden border-2 border-ink bg-ink">
                <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between border-b border-paper/20 bg-ink/80 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-paper backdrop-blur-sm">
                  <span>Model — {project.code}</span>
                  <span className="text-rust">● LIVE</span>
                </div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="mt-0 aspect-[4/3] w-full object-cover pt-7 opacity-90 transition-opacity duration-500 hover:opacity-100"
                  style={{ filter: "sepia(0.2) contrast(1.05)" }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.07]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, #1a1814 0px, #1a1814 1px, transparent 1px, transparent 3px)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 border-t border-paper/20 bg-ink/80 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-paper">
                  FILE: {project.code} · {project.tag}
                </div>
              </div>
            )}

            {/* Tech stack */}
            <div className="border-2 border-ink">
              <div className="border-b-2 border-ink bg-ink px-4 py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper">
                  // Technical Specs
                </span>
              </div>
              <ul className="divide-y divide-ink/15 bg-paper">
                {project.stack.map((tech, i) => (
                  <motion.li
                    key={tech}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.06 }}
                    className="flex items-center justify-between px-4 py-3 font-mono text-xs uppercase tracking-widest"
                  >
                    <span className="text-muted-foreground">—</span>
                    <span className="text-ink">{tech}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Clearance badge */}
            <div className="relative overflow-hidden border-2 border-rust/40 bg-rust/5 px-5 py-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-rust text-lg">◈</span>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-rust">Clearance Level</p>
                  <p className="mt-1 font-display text-2xl font-black uppercase tracking-wide text-ink">
                    Declassified
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                    Atomic Labs Archive · YG-2007
                  </p>
                </div>
              </div>
              <div
                aria-hidden
                className="absolute -right-4 -bottom-4 font-display text-[8rem] font-black uppercase leading-none text-ink/[0.03] select-none"
              >
                OK
              </div>
            </div>
          </motion.aside>
        </div>

        {/* ── NEXT / PREV NAVIGATION ── */}
        {(prevProj || nextProj) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-24 border-t-2 border-ink pt-12"
          >
            <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
              // Continue browsing
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {prevProj ? (
                <Link
                  to={`/project/${prevProj.code}`}
                  className="group flex flex-col gap-2 border-2 border-ink p-6 transition-colors hover:border-rust hover:bg-rust/5"
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                    ◂ Previous
                  </span>
                  <span className="font-display text-3xl font-black uppercase transition-colors group-hover:text-rust">
                    {prevProj.title}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {prevProj.tag}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {nextProj ? (
                <Link
                  to={`/project/${nextProj.code}`}
                  className="group flex flex-col items-end gap-2 border-2 border-ink p-6 text-right transition-colors hover:border-rust hover:bg-rust/5"
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                    Next ▸
                  </span>
                  <span className="font-display text-3xl font-black uppercase transition-colors group-hover:text-rust">
                    {nextProj.title}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {nextProj.tag}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </motion.div>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t-2 border-ink bg-ink py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 font-mono text-[10px] uppercase tracking-[0.25em] text-paper/50 sm:px-12">
          <span>Atomic Labs · Archive Reader</span>
          <Link to="/" className="transition-colors hover:text-rust">
            Return to Dossier ▸
          </Link>
        </div>
      </footer>
    </div>
  );
}
