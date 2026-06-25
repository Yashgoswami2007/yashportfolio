import projFusionnet from "@/assets/proj-fusionnet.jpg";
import projAegis from "@/assets/proj-aegis.png";
import projRaven from "@/assets/proj-raven.png";
import projXenutron from "@/assets/proj-xenutron.png";
import projMoodDoctor from "@/assets/proj-mooddoctor.jpg";
import projVaibhav from "@/assets/vaibhav.png";
import projYashPort from "@/assets/yash-port.png";
import projSecondSoul from "@/assets/secondsoul.png";
import projSchool from "@/assets/school.png";
import projThisPortfolio from "@/assets/this-portfolio.png";

export type Project = {
  code: string;
  title: string;
  tag: string;
  blurb: string;
  detailedDescription: string;
  stack: string[];
  category: "ai" | "web";
  image?: string;
  link?: string;
};

export const PROJECTS: Project[] = [
  {
    code: "P-01",
    title: "FUSIONNET",
    tag: "Federated · Distributed",
    blurb:
      "Privacy-preserving federated training mesh. Compact LLMs trained across nodes without leaking a byte of raw data.",
    detailedDescription:
      "FUSIONNET is a robust, privacy-preserving federated training mesh designed to train compact Large Language Models across multiple decentralized nodes. By leveraging differential privacy and advanced cryptographic techniques, FUSIONNET ensures that not a single byte of raw user data ever leaves its origin. It aggregates model weights globally while maintaining strict security perimeters, making it ideal for highly regulated environments like healthcare and finance.",
    stack: ["PyTorch", "Flower", "Differential Privacy"],
    category: "ai",
    image: projFusionnet,
  },
  {
    code: "P-02",
    title: "A.E.G.I.S.",
    tag: "Defense · Agents",
    blurb:
      "Autonomous multi-agent AI operating system featuring orchestration, memory, self-healing, governance, and intelligence.",
    detailedDescription:
      "A.E.G.I.S. (Autonomous Execution & Governance Intelligence System) serves as a multi-agent threat-response operating system. Built with LangGraph, it features persistent memory, autonomous self-healing, and complex orchestration protocols. Agents scan network perimeters 24/7, evaluate anomalies, and execute defensive actions governed by strict security policies, ensuring a highly responsive and resilient defense mechanism against novel attack vectors.",
    stack: ["LangGraph", "FastAPI", "PPO"],
    category: "ai",
    image: projAegis,
  },
  {
    code: "P-03",
    title: "R.A.V.E.N.",
    tag: "Recon · Intelligence",
    blurb:
      "Reinforcement-learning vehicle AI project for autonomous driving, navigation, exploration, and Forza experimentation.",
    detailedDescription:
      "Project R.A.V.E.N. is an advanced reinforcement-learning vehicle AI optimized for autonomous driving, exploration, and complex navigation scenarios. Trained heavily in simulated environments, including Forza experimentation, it utilizes spatial awareness and dynamic pathfinding. R.A.V.E.N. leverages lightweight vector databases and LoRA-tuned models for on-the-fly decision making and adaptive behavior when faced with unfamiliar terrain or adversarial track conditions.",
    stack: ["LLMs", "Vector DB", "LoRA"],
    category: "ai",
    image: projRaven,
  },
  {
    code: "P-04",
    title: "XENUTRON",
    tag: "Swarm · Simulation",
    blurb:
      "Your AI/LLM-themed futuristic project and branding concept with retro sci-fi visual identity.",
    detailedDescription:
      "XENUTRON is a conceptual branding and interactive experience that merges AI/LLM integration with a deeply retro sci-fi aesthetic. It serves as a testbed for multi-agent swarm simulations and coordinated drone behavior visualizations. Driven by reinforcement learning in custom Gymnasium environments, XENUTRON highlights the intersection between futuristic aesthetics and robust, real-time AI orchestration, offering users a deeply immersive sci-fi command-line experience.",
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
    detailedDescription:
      "MOOD DOCTOR is an edge-deployed, empathy-tuned companion built to support daily mood tracking and CBT-style reflection. By utilizing Retrieval-Augmented Generation (RAG) directly on local user data, the system provides contextual, empathetic feedback without transmitting sensitive psychological data to the cloud. It acts as a supportive digital entity, prioritizing user privacy while dynamically adjusting its conversation style to user state.",
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
    detailedDescription:
      "This project represents a modern, highly responsive personal portfolio website crafted for high performance and clean aesthetics. Developed using raw HTML, CSS, and vanilla JavaScript, the portfolio prioritizes loading speed and accessibility. It features smooth scrolling, tailored layouts across devices, and a minimalist design approach that puts the user's content front and center.",
    stack: ["HTML", "CSS", "JavaScript"],
    category: "web",
    image: projVaibhav,
    link: "https://vaibhav-portfolio.saturn2007km-676.workers.dev/",
  },
  {
    code: "W-02",
    title: "THIS PORTFOLIO",
    tag: "Dossier · Interactive",
    blurb:
      "This retro-futurist AI engineer dossier portfolio. Built with modern framework architectures, visual micro-animations, and Cloudflare deployment.",
    detailedDescription:
      "The Atomic Labs Dossier is a highly interactive, retro-futuristic portfolio built to showcase an AI engineer's capabilities. Utilizing React, TypeScript, Vite, and TanStack Router, the site achieves seamless SPA navigation. Framer Motion drives the fluid micro-animations and parallax effects, while the custom 'paper grain' and 'ink' styling evoke a stark, brutalist intelligence interface. Deployed securely on Cloudflare.",
    stack: ["React", "TypeScript", "Vite", "TanStack Router", "Framer Motion"],
    category: "web",
    image: projThisPortfolio,
    link: "#hero",
  },
  {
    code: "W-03",
    title: "YASH PORTFOLIO",
    tag: "Portfolio · Showcase",
    blurb:
      "Personal portfolio website showcasing projects, skills, and technical experience.",
    detailedDescription:
      "An earlier iteration of my personal portfolio, built to highlight foundational skills, diverse projects, and early technical experiences. Engineered with React and TypeScript, it uses Tailwind CSS to deliver a clean, responsive layout. This project served as an initial staging ground for learning component-based architecture and state management before scaling up to more complex frameworks.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    category: "web",
    image: projYashPort,
    link: "https://yash-goswami-portfolio.netlify.app/",
  },
  {
    code: "W-04",
    title: "E-COMMERCE PLATFORM",
    tag: "Commerce · Storefront",
    blurb:
      "Modern e-commerce website featuring product browsing, responsive design, and a polished shopping experience.",
    detailedDescription:
      "A fully-featured e-commerce storefront designed to offer a frictionless shopping experience. Built heavily with React and modern UI/UX principles, the platform supports real-time product browsing, intuitive cart management, and seamless layout scaling across mobile and desktop environments. It emphasizes fast load times and a visually polished interface to maximize user retention and conversion.",
    stack: ["React", "E-Commerce", "UI/UX"],
    category: "web",
    image: projSecondSoul,
    link: "https://www.linkedin.com/posts/yash-goswami-551590374_delivered-another-modern-ecommerce-website-activity-7452282291181199360-sLdI",
  },
  {
    code: "W-05",
    title: "SCHOOL WEBSITE",
    tag: "Full-Stack · Realtime",
    blurb:
      "Full-stack web application with authentication, database integration, and real-time backend services.",
    detailedDescription:
      "A comprehensive full-stack solution built for educational institutions. Integrating React on the frontend and Supabase on the backend, the application provides secure authentication, dynamic database integration, and real-time updates for school announcements and resources. The architecture guarantees a reliable, easily updatable platform tailored for both administrators and students.",
    stack: ["React", "Supabase", "Authentication"],
    category: "web",
    image: projSchool,
    link: "https://www.linkedin.com/posts/yash-goswami-551590374_webdevelopment-reactjs-supabase-activity-7457095295819063296-mIpt",
  },
];
