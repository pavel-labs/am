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
  title: "Senior Frontend Developer",
  subtitle:
    "Building web and mobile products with React, React Native, and TypeScript",
  location: "Warsaw, Poland",
  email: "pasha.petrovich98@gmail.com",
  github: "pavel-labs",
  githubUrl: "https://github.com/pavel-labs",
  linkedin: "pavel-software-anywhere",
  linkedinUrl: "https://linkedin.com/in/pavel-software-anywhere",
  phone: "+48 516 532 323",
  currentCompany: "GB2B - GamingB2B",
  cvPath: "/api/cv-view",
  cvFileName: CV_PDF_FILENAME,
  summary: `Senior Frontend Developer with 7+ years of commercial experience building web and mobile
    applications with React, React Native, and TypeScript. Experienced in frontend architecture,
    white-label UI systems, component-driven development with Storybook, and Playwright E2E automation.`,
  yearsOfExperience: 7,
};

export const HERO_STATS: Stat[] = [
  { value: "7+", label: "Years XP" },
  { value: "B2", label: "English" },
];

export const ABOUT_TAGS: readonly string[] = [
  "Component-Driven Dev",
  "TypeScript-first",
  "White-label UI",
  "Micro-frontends",
  "Playwright E2E",
  "Agile / Scrum",
];

export const JOBS: Job[] = [
  {
    id: "gamingb2b",
    title: "Senior Frontend Developer",
    company: "GB2B - GamingB2B",
    location: "Warsaw, Poland",
    period: "Oct 2026 - Present",
    current: true,
    bullets: [
      "Developing iGaming platform apps using React (Web) and React Native (iOS, Android).",
    ],
  },
  {
    id: "solbeg",
    title: "Frontend Software Engineer",
    company: "Solbeg_",
    location: "Warsaw, Poland",
    period: "Jun 2021 - Jul 2026",
    current: false,
    summary:
      "Delivered React and React Native applications across betting, insurance, and logistics projects, contributing to frontend architecture, reusable UI systems, and automated testing.",
    bullets: [
      "Introduced code review guidelines and frontend best practices adopted team-wide.",
    ],
    projects: [
      {
        name: "Horse Racing Betting App - Cross-Platform",
        tech: "React Native · Expo SDK · Storybook",
        highlights: [
          "Built a React Native application from scratch and independently designed its UI Kit with white-label configuration and dark/light themes.",
          "Developed reusable components with Storybook for cross-platform delivery on iOS, Android, and Web via Expo.",
        ],
      },
      {
        name: "Betting Services Admin Panel - Web",
        tech: "React",
        highlights: [
          "Implemented admin features for betting services and adapted existing React components for a planned UI redesign.",
        ],
      },
      {
        name: "Horse Racing Betting App - Cordova (iOS) & Web | SDET",
        tech: "React · Apache Cordova · Playwright",
        highlights: [
          "Developed React UI and integrated iOS-specific Cordova plugins for a betting app supporting Web, iOS, and 3+ white-label brands.",
          "Rebuilt Playwright E2E automation from scratch to cover critical betting and user flows.",
        ],
      },
      {
        name: "Insurance Agent Portal - Web",
        tech: "React · Micro Frontends · Redux",
        highlights: [
          "Built reusable React components and feature modules in a micro-frontend architecture, integrating REST APIs and Redux state management.",
        ],
      },
      {
        name: "Transport & Logistics App",
        tech: "React Native · Azure DevOps",
        highlights: [
          "Developed reusable UI components for two React Native applications used by logistics managers and drivers.",
        ],
      },
    ],
  },
  {
    id: "freelance",
    title: "Frontend Engineer",
    company: "Freelance / Self-Employed",
    location: "Remote",
    period: "Apr 2020 - Dec 2021 (part-time)",
    current: false,
    summary:
      "Delivered a React application with Google Maps integration and a static Next.js site.",
    bullets: [
      "Built interactive maps and location-based functionality with the Google Maps API.",
      "Defined API contracts with backend developers and integrated REST endpoints.",
      "Integrated cryptocurrency transactions into the application, connecting the payment flows in the UI to backend services.",
    ],
  },
  {
    id: "itertech",
    title: "Frontend Engineer",
    company: "IterTech Innovations",
    location: "Minsk, Belarus",
    period: "Sep 2019 - Jun 2021",
    current: false,
    summary:
      "Developed an enterprise ERP frontend and contributed to a Next.js sub-project.",
    bullets: [
      "Migrated class-based React components to hooks and functional components; built reusable UI and helped introduce Storybook.",
      "Wrote unit tests with Jest and Enzyme and worked on bundle size, rendering, and asset optimization.",
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
      "REST",
      "WebSockets",
      "React Hook Form",
      "Zod",
    ],
  },
  {
    label: "UI & Styling",
    color: BadgeVariant.Pink,
    skills: [
      "Storybook",
      "Material UI",
      "Tailwind CSS",
      "SCSS",
      "CSS Modules",
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
      "Git",
      "Vite",
      "Webpack",
      "ESLint",
      "Prettier",
      "Monorepo (Turborepo, Nx)",
      "CI/CD (GitHub Actions, CircleCI, Bitbucket)",
    ],
  },
  {
    label: "Practices",
    color: BadgeVariant.Cyan,
    skills: [
      "Component-Driven Development",
      "Feature-Sliced Design",
      "Micro-frontends",
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
    label: "GitHub",
    value: "github.com/pavel-labs",
    href: "https://github.com/pavel-labs",
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
    tagline: "AI Interview Practice for Web & Mobile",
    description:
      "Building an AI interview-practice app with Expo/React Native and Fastify for Web, iOS, and Android. " +
      "The system orchestrates 3 LLM agents, streams responses over WebSockets, and shares " +
      "TypeScript/Zod contracts across the client and backend.",
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
