import {
  BadgeVariant,
  ProjectStatus,
  type Personal,
  type Job,
  type SkillCategory,
  type Education,
  type Certification,
  type Language,
  type ContactItem,
  type Stat,
  type PersonalProject,
  type ArchLayer,
} from "@/shared/types";
import { CV_PDF_FILENAME } from "./cv-pdf";

export const PERSONAL: Personal = {
  name: "Pavel Piatrovich",
  firstName: "Pavel",
  lastName: "Piatrovich",
  title: "Frontend Engineer",
  subtitle:
    "Building web and mobile products with React, React Native, and TypeScript",
  location: "Warsaw, Poland",
  email: "pasha.petrovich98@gmail.com",
  github: "pavel-labs",
  githubUrl: "https://github.com/pavel-labs",
  linkedin: "pavel-software-anywhere",
  linkedinUrl: "https://linkedin.com/in/pavel-software-anywhere",
  phone: "+48 516 532 323",
  currentCompany: "Solbeg_",
  cvPath: "/api/cv-view",
  cvFileName: CV_PDF_FILENAME,
  summary: `Frontend Engineer with 7+ years of commercial experience building scalable web and
    mobile applications with React, React Native, and TypeScript. Strong background in
    component-driven development, modern state management (Redux Toolkit, MobX, Zustand),
    and reusable UI systems with Storybook. Experience as SDET with Playwright. Node.js / Express.js
    background from personal projects, with interest in expanding into backend (NestJS, GraphQL).
    Delivers features end to end in cross-functional Agile teams.`,
  yearsOfExperience: 7,
};

export const HERO_STATS: Stat[] = [
  { value: "7+", label: "Years XP" },
  { value: "B2", label: "English" },
];

export const ABOUT_TAGS: readonly string[] = [
  "Component-Driven Dev",
  "TypeScript-first",
  "Agile / Scrum",
  "SOLID · DRY · KISS",
  "Micro-frontends",
  "Feature-Sliced Design",
  "Responsive Design",
];

export const JOBS: Job[] = [
  {
    id: "solbeg",
    title: "Software Developer - React / React Native",
    company: "Solbeg_",
    location: "Warsaw, Poland",
    period: "Jun 2021 - Present",
    current: true,
    summary:
      "React and React Native applications across multiple client projects; also SDET work on Playwright automation.",
    bullets: [
      "Build and maintain scalable web and mobile apps with React, React Native (Expo SDK), and TypeScript; reusable, well-typed components following a component-driven approach.",
      "Collaborate with cross-functional distributed teams (backend, design, QA, PM): code reviews, Agile ceremonies, frontend estimation, async communication workflows.",
      "Proposed and introduced code review guidelines and best practices adopted team-wide.",
      "Work as SDET: design and maintain automated end-to-end testing infrastructure with Playwright, improving regression coverage and release confidence.",
    ],
    projects: [
      {
        name: "Horse Racing Betting App - Cross-Platform",
        tech: "React Native · Expo SDK · Storybook",
        highlights: [
          "Drove architectural decisions and built a React Native application from scratch; independently designed and implemented a scalable UI Kit supporting white-label configurations and dark/light themes with a focus on maintainability, reusability, and performance optimization.",
          "Applied Component-Driven Development using Storybook to develop and maintain reusable components; collaborated on cross-platform delivery (iOS, Android, Web via Expo).",
          "Improved performance and unit test coverage for a maintainable, reliable codebase.",
        ],
      },
      {
        name: "Betting Services Admin Panel - Web",
        tech: "React",
        highlights: [
          "Developed and maintained a web-based admin panel for managing betting services.",
          "Implemented new features, resolved issues, and adapted existing components for an upcoming UI redesign.",
          "Collaborated closely with backend and QA teams in an Agile workflow.",
        ],
      },
      {
        name: "Horse Racing Betting App - Cordova (iOS) & Web",
        tech: "React · Apache Cordova · Playwright",
        highlights: [
          "Maintained and extended React-based components for a cross-platform betting app (iOS via Cordova and Web), ensuring stability and consistency across platforms.",
          "Integrated and configured Cordova plugins, working with iOS-specific capabilities.",
          "Built and maintained Playwright E2E automation, increasing regression coverage of key user flows.",
        ],
      },
      {
        name: "Insurance Agent Portal",
        tech: "React · Micro Frontends · Redux",
        highlights: [
          "Developed React components and feature modules within a micro-frontend architecture.",
          "Improved codebase stability and maintainability through unit and integration testing.",
          "Integrated REST APIs and managed application state with Redux.",
        ],
      },
      {
        name: "Transport & Logistics App",
        tech: "React Native",
        highlights: [
          "Built UI components for two React Native applications targeting managers and drivers in the transportation sector.",
          "Improved application stability by resolving defects and supporting consistent release quality across both apps.",
        ],
      },
    ],
  },
  {
    id: "freelance",
    title: "Frontend Developer - React",
    company: "Freelance / Self-Initiated",
    location: "Remote",
    period: "Apr 2020 - Dec 2021",
    current: false,
    summary:
      "React app built around the Google Maps API in collaboration with backend developers, designers, and stakeholders; also a static Next.js site as a sub-project.",
    bullets: [
      "Cooperated closely with backend developers to define API contracts and integrate REST endpoints.",
      "Worked independently on feature delivery, API integration, and responsive UI.",
    ],
  },
  {
    id: "itertech",
    title: "Frontend Developer",
    company: "IterTech Innovations",
    location: "Minsk, Belarus",
    period: "Sep 2019 - Jun 2021",
    current: false,
    summary:
      "ERP solution for a large enterprise client; migrated class-based components to hooks and functional components. Also contributed to a Next.js sub-project.",
    bullets: [
      "Built reusable UI components and maintained Storybook-based UI systems.",
      "Wrote unit tests with Jest and Enzyme to keep the codebase stable and regression-free.",
      "Worked on performance and scalability: bundle size, rendering, and asset optimization.",
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    label: "Languages",
    color: BadgeVariant.Cyan,
    skills: ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3"],
  },
  {
    label: "Frameworks & Libraries",
    color: BadgeVariant.Blue,
    skills: [
      "React",
      "React Native (Expo SDK)",
      "Next.js (SSR/SSG/ISR)",
      "Node.js",
      "Apache Cordova",
    ],
  },
  {
    label: "State & Data",
    color: BadgeVariant.Purple,
    skills: [
      "Redux Toolkit",
      "MobX",
      "Zustand",
      "TanStack React Query",
      "Apollo GraphQL",
      "REST",
      "WebSockets",
      "React Hook Form",
      "Formik",
      "Zod",
    ],
  },
  {
    label: "UI & Styling",
    color: BadgeVariant.Pink,
    skills: [
      "Material UI",
      "Fluent UI",
      "Tailwind CSS",
      "SCSS",
      "CSS Modules",
      "Styled-Components",
      "Storybook",
    ],
  },
  {
    label: "Testing",
    color: BadgeVariant.Orange,
    skills: ["Jest", "React Testing Library", "Playwright", "Vitest"],
  },
  {
    label: "Build & Tooling",
    color: BadgeVariant.Yellow,
    skills: [
      "Vite",
      "Webpack",
      "Babel",
      "ESLint",
      "Prettier",
      "Monorepo (Turborepo, Nx)",
      "Docker",
      "Firebase",
      "Postman",
      "Swagger",
      "CI/CD (GitHub Actions, CircleCI, Bitbucket)",
      "GCP",
      "Git",
    ],
  },
  {
    label: "CMS",
    color: BadgeVariant.Green,
    skills: ["WordPress", "Contentful"],
  },
  {
    label: "AI Dev Tools",
    color: BadgeVariant.Teal,
    skills: ["Claude Code", "GitHub Copilot", "Codex"],
  },
  {
    label: "Practices",
    color: BadgeVariant.Cyan,
    skills: [
      "Component-Driven Development",
      "Feature-Sliced Design",
      "Micro-frontends",
      "MVVM",
      "MVC",
      "Design Patterns",
      "Performance Optimization",
      "Responsive Design",
      "Agile/Scrum",
    ],
  },
];

export const EDUCATIONS: Education[] = [
  {
    degree: "Bachelor of Engineering in Software Engineering",
    institution: "ISEI BSU",
    location: "Minsk, Belarus",
    year: "Jul 2020",
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "React / Angular / TypeScript / JavaScript",
    issuer: "IT Academy, Minsk",
    period: "2018-2019",
  },
];

export const LANGUAGES: Language[] = [
  { name: "Russian", level: "Native", percent: 100 },
  { name: "English", level: "B2", percent: 68 },
];

export const CONTACT_ITEMS: ContactItem[] = [
  {
    label: "Email",
    value: "pasha.petrovich98@gmail.com",
    href: "mailto:pasha.petrovich98@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/pavel-software-anywhere",
    href: "https://linkedin.com/in/pavel-software-anywhere",
  },
  {
    label: "WhatsApp",
    value: "+48 516 532 323",
    href: "https://wa.me/48516532323",
  },
];

export const PERSONAL_PROJECTS: PersonalProject[] = [
  {
    name: "Mentara",
    tagline: "AI Mock Interview Training - Multi-Agent System",
    description:
      "Full-stack AI interview-training app (Expo/React Native + Fastify) powered by 3 orchestrated " +
      "LLM agents, with real-time token streaming over WebSocket for live interview conversations. " +
      "Adding voice input (speech-to-text) and voice output (text-to-speech) for a hands-free mode, " +
      "backed by a type-safe shared contract (TypeScript + Zod) across REST/WS. Planned launch " +
      "across all target platforms by the end of 2026.",
    url: "https://mentara-ai-landing.web.app/",
    relatedLinks: [
      {
        label: "Storybook",
        url: "https://storybook-production-e655.up.railway.app/",
      },
    ],
    // githubRepo: 'pavel-labs/mentara-ai-landing-page',
    status: ProjectStatus.InProgress,
    tags: [
      "React Native",
      "Expo",
      "Fastify",
      "TypeScript",
      "PostgreSQL",
      "WebSockets",
      "Zod",
      "Zustand",
      "TanStack Query",
      "Turborepo",
      "Clerk",
      "Stripe",
      "RevenueCat",
    ],
    arch: [
      {
        label: "Client",
        items: [
          "React Native · Expo",
          "Clerk Auth",
          "REST + WebSocket",
          "Voice I/O (in progress)",
        ],
      },
      {
        label: "Backend",
        items: [
          "Fastify",
          "PostgreSQL",
          "Redis",
          "Real-time WebSocket token streaming",
        ],
      },
      {
        label: "AI",
        items: [
          "Interview Agent",
          "Scoring Agent",
          "Progress Agent",
          "AICoach",
        ],
      },
      {
        label: "Infra",
        items: [
          "GitHub Actions",
          "EAS cloud builds",
          "Storybook workflow",
          "Stripe",
          "RevenueCat",
          "Judge0 (code execution)",
        ],
      },
    ] satisfies ArchLayer[],
  },
  {
    name: "Space View",
    tagline: "Immersive Single-Page Space Experience",
    description:
      "A single-page space-themed experience built with Next.js and Three.js, featuring an " +
      "interactive 3D scene rendered directly in the browser.",
    url: "https://space-view-one.vercel.app/",
    status: ProjectStatus.Live,
    tags: ["Next.js", "Three.js", "TypeScript"],
  },
  {
    name: "Fishing Store",
    tagline: "Reusable Multi-Brand E-Commerce Platform",
    description:
      "A production-oriented e-commerce platform built to run multiple storefronts from a single " +
      "codebase through configuration, not forks - brand, catalog source, and locale are all set " +
      "per instance. Fishing Store is the live demo instance, running on a clean App Router " +
      "architecture, strict TypeScript contracts, WooCommerce/WordPress integrations, resilient " +
      "order flows, and multilingual support with next-intl for localization-ready storefronts. " +
      "Custom PHP plugins extend WooCommerce with product filters, wishlist flows, and product Q&A " +
      "features. The WordPress backend itself is a custom serverless deployment: WordPress and " +
      "WooCommerce running inside a single Vercel function via ServerlessWP, with TiDB Cloud as the " +
      "database and no persistent server or writable filesystem.",
    url: "https://fishing-store.vercel.app/",
    status: ProjectStatus.Live,
    relatedLinks: [
      {
        label: "Serverless WordPress backend",
        url: "https://github.com/pavel-labs/fishing-store-serverless-wp",
      },
    ],
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "NextAuth",
      "WooCommerce",
      "WordPress",
      "WPGraphQL",
      "React Hook Form",
      "Zod",
      "next-intl",
      "Playwright",
    ],
    arch: [
      {
        label: "Client",
        items: [
          "Next.js App Router",
          "React 19",
          "Tailwind CSS 4",
          "Headless UI",
          "Heroicons",
        ],
      },
      {
        label: "Brands",
        items: [
          "Per-instance brand config",
          "Configurable catalog source",
          "Fishing Store as the live demo instance",
        ],
      },
      {
        label: "Commerce",
        items: [
          "WooCommerce REST API v3",
          "WooCommerce Store API",
          "Cart and order context flows",
        ],
      },
      {
        label: "Backend",
        items: [
          "Serverless WordPress via ServerlessWP",
          "Single Vercel function, no persistent server",
          "TiDB Cloud database",
        ],
      },
      {
        label: "Plugins",
        items: [
          "Custom PHP plugins",
          "Product filters",
          "Wishlist",
          "Product Q&A",
        ],
      },
      {
        label: "Content",
        items: [
          "WordPress REST API",
          "WPGraphQL",
          "GraphQL Code Generator",
          "sanitize-html",
        ],
      },
      {
        label: "i18n",
        items: [
          "next-intl",
          "Localized routes and messages",
          "Multilingual storefront architecture",
        ],
      },
      {
        label: "Quality",
        items: [
          "Strict TypeScript",
          "Jest",
          "Playwright",
          "ESLint 9 flat config",
          "Zod env validation",
        ],
      },
    ] satisfies ArchLayer[],
  },
];

export const SIDE_PROJECTS: PersonalProject[] = [
  {
    name: "Legacy Game Rethinking",
    tagline:
      "Game architecture experiment, rebuilt from a 2019 canvas prototype",
    description:
      "A 2019 JavaScript prototype was rebuilt in 2026 as a TypeScript game project with a much more disciplined architecture. " +
      "The goal was not just to make it work, but to rethink the project around systems, clear responsibilities, fixed-step simulation, and a WebAssembly hot path for gameplay logic. " +
      "This is a pure learning-and-experiment project: a way to explore how a small game codebase feels when it is structured more like a real indie game project than a casual learning exercise.",
    url: "https://arena-game-2.web.app/",
    status: ProjectStatus.Live,
    githubRepo: "pavel-labs/legacy-game-rethinking-2026",
    relatedLinks: [
      {
        label: "GitHub",
        url: "https://github.com/pavel-labs/legacy-game-rethinking-2026",
      },
    ],
    tags: [
      "TypeScript",
      "Game Architecture",
      "WebAssembly",
      "Canvas",
      "Systems Design",
      "AI-assisted coding",
      "Experiment",
    ],
  },
  {
    name: "PDF to DOC Converter",
    tagline:
      "Windows utility for quick PDF-to-Word conversion without manual Word work",
    description:
      "A small C++ tool built mainly out of curiosity and for personal convenience: convert PDF files into DOCX using Microsoft Word when it is available, with a fallback built-in engine when it is not. " +
      "The idea is simple but practical — avoid opening Word manually for repetitive conversion work while keeping the logic minimal and focused. The project is intentionally lightweight and is more of an exploration than a polished production product.",
    url: "https://github.com/pavel-labs/pdf-doc-converter",
    status: ProjectStatus.Live,
    githubRepo: "pavel-labs/pdf-doc-converter",
    tags: [
      "C++",
      "Windows",
      "PDF",
      "DOCX",
      "COM Automation",
      "AI-assisted coding",
      "Personal tool",
    ],
  },
];
