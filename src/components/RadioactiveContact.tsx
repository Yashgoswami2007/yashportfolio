import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import rocketImg from "@/assets/rocket.webp";

const DETERMINISTIC_RANDOM = [
  0.1, 0.8, 0.3, 0.6, 0.9, 0.2, 0.7, 0.4, 0.5, 0.85, 0.15, 0.95
];

function ExplodingLetter({ char, i, total, scrollYProgress }: { char: string, i: number, total: number, scrollYProgress: any }) {
  const rand = DETERMINISTIC_RANDOM[i % DETERMINISTIC_RANDOM.length];

  // Spread letters outward in an arc above the text.
  // i=0 is left, i=total is right.
  const angle = (i / (total - 1)) * Math.PI - Math.PI / 2;
  const angleUp = angle * 0.9; // Narrow the arc slightly

  const velocity = 30 + rand * 50; // Between 30 and 80 vw/vh
  const x_vw = Math.sin(angleUp) * velocity;
  const y_vh = -Math.cos(angleUp) * velocity; // negative is UP

  // Timeline:
  // 0.0 - 0.2: Stationary (waiting for impact)
  // 0.2: Explosion happens, letters fly out
  // 0.4: Letters hit their arc peak
  // 0.8: Gravity pulls them down
  // 1.0: Settled at the bottom of the screen
  const lx = useTransform(scrollYProgress, [0.2, 0.4, 0.8, 1.0], ["0vw", `${x_vw}vw`, `${x_vw * 1.5}vw`, `${x_vw * 1.2}vw`]);
  const ly = useTransform(scrollYProgress, [0.2, 0.4, 0.8, 1.0], ["0vh", `${y_vh}vh`, "20vh", "80vh"]);

  // Tumble effect
  const lrot = useTransform(scrollYProgress, [0.2, 1.0], ["0deg", `${(rand > 0.5 ? 1 : -1) * (360 + rand * 1440)}deg`]);

  // Fade out eventually
  const lopacity = useTransform(scrollYProgress, [0.8, 1.0], [1, 0]);

  return (
    <motion.span
      style={{
        x: lx,
        y: ly,
        rotate: lrot,
        opacity: lopacity,
        display: "inline-block",
        transformOrigin: "center center",
      }}
      className="text-rust"
    >
      {char}
    </motion.span>
  );
}

export function RadioactiveContact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Top level screen shake
  const shakeX = useTransform(scrollYProgress,
    [0.2, 0.21, 0.22, 0.23, 0.24, 0.25, 0.26, 0.27, 0.28, 0.29, 0.3],
    ["0px", "30px", "-30px", "20px", "-20px", "15px", "-15px", "10px", "-10px", "5px", "0px"]
  );
  const shakeY = useTransform(scrollYProgress,
    [0.2, 0.21, 0.22, 0.23, 0.24, 0.25, 0.26, 0.27, 0.28, 0.29, 0.3],
    ["0px", "-25px", "25px", "-15px", "15px", "-10px", "10px", "-5px", "5px", "-2px", "0px"]
  );

  // Background ambient darkening on impact
  const bgOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.4, 1.0], [0.1, 0.4, 0.1, 0.05]);

  // Clean vs Charred Text crossfade
  const cleanOpacity = useTransform(scrollYProgress, [0.18, 0.2], [1, 0]);
  const charredOpacity = useTransform(scrollYProgress, [0.18, 0.2], [0, 1]);

  // Incoming Missile
  // Starts far top-left, hits the word
  const missileX = useTransform(scrollYProgress, [0, 0.2], ["-80vw", "0vw"]);
  const missileY = useTransform(scrollYProgress, [0, 0.2], ["-80vh", "0vh"]);
  const missileOpacity = useTransform(scrollYProgress, [0, 0.19, 0.2, 0.21], [1, 1, 1, 0]);

  // Explosion Flash
  const flashOpacity = useTransform(scrollYProgress, [0.19, 0.2, 0.25, 0.4], [0, 1, 1, 0]);
  const flashScale = useTransform(scrollYProgress, [0.19, 0.2, 0.4], [0.1, 20, 35]);

  // Shockwave Ring
  const shockOpacity = useTransform(scrollYProgress, [0.2, 0.25, 0.4], [0, 1, 0]);
  const shockScale = useTransform(scrollYProgress, [0.2, 0.4], [0.1, 15]);
  const shockBorderWidth = useTransform(scrollYProgress, [0.2, 0.4], ["60px", "0px"]);

  // Volumetric Mushroom Cloud
  const mushroomOpacity = useTransform(scrollYProgress, [0.2, 0.25, 0.5, 0.8], [0, 0.9, 0.7, 0]);
  const mushroomScaleX = useTransform(scrollYProgress, [0.2, 0.6], [0.1, 4]);
  const mushroomScaleY = useTransform(scrollYProgress, [0.2, 0.6], [0.1, 6]);
  const mushroomY = useTransform(scrollYProgress, [0.2, 0.6], ["0vh", "-40vh"]);

  // Heat Distortion (Chromatic Aberration via scale/blur on text)
  const aberrationOpacity = useTransform(scrollYProgress, [0.2, 0.25, 0.4], [0, 1, 0]);
  const aberrationScale = useTransform(scrollYProgress, [0.2, 0.25, 0.4], [1, 1.05, 1]);

  return (
    <section ref={containerRef} id="contact" className="relative h-[400vh] bg-ink text-paper">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Animated Background Grid */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 [background:repeating-linear-gradient(45deg,var(--paper)_0_1px,transparent_1px_14px)]"
        />

        <motion.div style={{ x: shakeX, y: shakeY }} className="relative mx-auto grid max-w-7xl h-full gap-10 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1.4fr_1fr] lg:items-end">

          <div className="relative z-10 flex flex-col justify-center h-full">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-rust mb-6">§ 05 — Establish Comms</p>

            <div className="relative w-full">
              {/* CLEAN TEXT */}
              <motion.div style={{ opacity: cleanOpacity }} className="absolute top-0 left-0 w-full">
                <h2 className="font-display text-6xl font-black uppercase leading-[0.85] sm:text-8xl lg:text-9xl">
                  Let's build <br />
                  something <br />
                  <span className="text-rust">radioactive.</span>
                </h2>
              </motion.div>

              {/* CHARRED TEXT */}
              <motion.div style={{ opacity: charredOpacity }} className="w-full">
                <h2 className="font-display text-6xl font-black uppercase leading-[0.85] sm:text-8xl lg:text-9xl text-neutral-800 [text-shadow:0_0_20px_rgba(200,80,30,0.4)]">
                  Let's build <br />
                  something <br />
                  <span className="opacity-0">radioactive.</span>
                </h2>

                {/* Floating Ash particles - only visible after impact */}
                <motion.div style={{ opacity: charredOpacity }} className="absolute inset-0 pointer-events-none">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -100 - Math.random() * 200],
                        x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
                        opacity: [0, 0.8, 0],
                        rotate: [0, Math.random() * 360]
                      }}
                      transition={{
                        duration: 4 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 5
                      }}
                      className="absolute w-2 h-2 bg-stone-500 rounded-sm opacity-0 blur-[1px]"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        bottom: `${Math.random() * 20}%`
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>

              {/* CHROMATIC ABERRATION GHOST (for the "something" text during impact) */}
              <motion.div
                style={{ opacity: aberrationOpacity, scale: aberrationScale }}
                className="absolute top-0 left-0 w-full pointer-events-none mix-blend-screen text-[#0ff] [text-shadow:-4px_0_10px_#f00]"
              >
                <h2 className="font-display text-6xl font-black uppercase leading-[0.85] sm:text-8xl lg:text-9xl opacity-50 blur-[2px]">
                  Let's build <br />
                  something <br />
                </h2>
              </motion.div>

              {/* EXPLODING WORD & IMPACT ZERO POINT */}
              <h2 className="absolute top-0 left-0 w-full font-display text-6xl font-black uppercase leading-[0.85] sm:text-8xl lg:text-9xl z-50 pointer-events-none">
                <span className="opacity-0">Let's build <br />something <br /></span>

                <span className="relative inline-block">
                  {/* Explosion Origin (Center of "radioactive") */}
                  <div className="absolute top-1/2 left-1/2">

                    {/* The Incoming Missile */}
                    <motion.div
                      style={{
                        x: missileX,
                        y: missileY,
                        opacity: missileOpacity,
                        rotate: "90deg" // Pointing down-right
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-40 w-48 flex items-center justify-center"
                    >
                      <img src={rocketImg} alt="Rocket" className="w-full h-auto object-contain [filter:drop-shadow(0_0_20px_rgba(250,204,21,0.6))]" />
                    </motion.div>

                    {/* Mushroom Cloud */}
                    <motion.div
                      style={{
                        opacity: mushroomOpacity,
                        scaleX: mushroomScaleX,
                        scaleY: mushroomScaleY,
                        y: mushroomY,
                      }}
                      className="absolute z-10 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-gradient-to-t from-[#c8501e] via-[#facc15] to-[#c8501e] blur-[40px] mix-blend-screen"
                    />

                    {/* Shockwave Ring */}
                    <motion.div
                      style={{
                        opacity: shockOpacity,
                        scale: shockScale,
                        borderWidth: shockBorderWidth,
                        borderColor: "var(--rust)",
                        borderStyle: "solid"
                      }}
                      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full bg-transparent"
                    />

                    {/* Bright Flash Overlay */}
                    <motion.div
                      style={{
                        opacity: flashOpacity,
                        scale: flashScale,
                      }}
                      className="absolute z-30 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-white blur-[10px] mix-blend-overlay"
                    />
                  </div>

                  {/* The actual letters splitting apart */}
                  {Array.from("radioactive.").map((char, i, arr) => (
                    <ExplodingLetter key={i} char={char} i={i} total={arr.length} scrollYProgress={scrollYProgress} />
                  ))}
                </span>
              </h2>
            </div>
          </div>

          <div className="relative z-10 space-y-4 font-mono text-sm uppercase tracking-[0.2em] self-end mb-10 lg:mb-0">
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
              className="group flex items-center justify-between border-2 border-paper px-5 py-4 transition-all hover:bg-paper hover:text-ink pointer-events-auto"
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
        </motion.div>

        {/* Footer pinned to bottom of the viewport */}
        <div className="absolute bottom-0 left-0 w-full border-t border-paper/20 z-10 bg-ink/80 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-5 py-6 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/60 sm:flex-row sm:justify-between sm:px-8">
            <span>© MMXXVI · Atomic Labs Archive</span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 bg-rust animate-pulse-dot" />
              Transmission stable
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
