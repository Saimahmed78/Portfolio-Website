import quoteGeneratorImg from "../assets/screenshots/quote-generator.png";
import ebookStoreImg from "../assets/screenshots/ebook-store.png";
import simpleCalculatorImg from "../assets/screenshots/simple-calculator.png";
import tipCalculatorImg from "../assets/screenshots/tip-calculator.png";
import markdownPreviewerImg from "../assets/screenshots/markdown-previwer.png";
import countdownTimerImg from "../assets/screenshots/countdown-timer.png";
import smartClockImg from "../assets/screenshots/smart-clock.png";
import pollForgeImg from "../assets/screenshots/poll-forge.png";

const projectDetails = [
  {
    id: "quote-generator",
    isFullStack: false,
    title: "Quote Generator",
    image: quoteGeneratorImg,
    video: "/assets/Quote Generator Live Preview.webm",
    github:
      "https://github.com/Saimahmed78/10-Days-10-JS-Projects-Series/tree/main/Random-Quote-Generator",
    vercel: "https://quotegenerator-amber.vercel.app/",
    weakness: "Currently uses static quotes; lacks API integration.",
    enhancementsToMake: ["Integrate quote API", "add tweet feature."],
    description: "A dynamic quote generator that displays random inspirational quotes with smooth transitions and optional sharing.",
    techStack: ["HTML", "CSS", "JS"],
    conceptsUsed: ["State", "Event Handling", "Conditional Rendering"],
  },
  {
    id: "ebook-store",
    isFullStack: false,
    title: "Ebook Store",
    image: ebookStoreImg,
    github: "https://github.com/Saimahmed78/Ebook-Store",
    vercel: "https://ebook-store-sable.vercel.app/",
    weakness: "No real payment or backend support.",
    description: "An online ebook store showcasing a curated collection of digital books with responsive UI and smooth navigation.",
    enhancementsToMake: [
      "Add payment gateway",
      "filter/sort books",
      "connect to database.",
    ],
    techStack: ["React", "Tailwind", "React Router"],
    conceptsUsed: ["Routing", "Component Design", "Props"],
  },
  {
    id: "simple-calculator",
    isFullStack: false,
    title: "Simple Calculator",
    image: simpleCalculatorImg,
    github: "https://github.com/Saimahmed78/10-Days-10-JS-Projects-Series/tree/main/Simple-Calculator",
    vercel: "https://simplecalculator-wine.vercel.app/",
    weakness: "No keyboard support, minimal styling.",
    enhancementsToMake: [
      "Add keyboard support",
      "improve styling",
      "add history feature.",
    ],
    techStack: ["HTML", "CSS", "JavaScript"],
    description: "A minimalist calculator supporting basic arithmetic operations with a clean UI.",
    conceptsUsed: ["DOM Manipulation", "Events", "Functions"],
  },
  {
    id: "tip-calculator",
    isFullStack: false,
    title: "Tip Calculator",
    image: tipCalculatorImg,
    github: "https://github.com/Saimahmed78/10-Days-10-JS-Projects-Series/tree/main/Tip-Calculator",
    vercel: "https://tip-calulator.vercel.app/",
    weakness: "No validation on input fields.",
    enhancementsToMake: ["Add input validation ", "animated UI."],
    techStack: ["React", "CSS Modules"],
    description: "A tip calculator that helps users quickly compute appropriate tip amounts with an intuitive interface.",
    conceptsUsed: ["useState", "Input Handling", "Form Validation"],
  },
  {
    id: "markdown-previewer",
    isFullStack: false,
    title: "Markdown Previewer",
    image: markdownPreviewerImg,
    github: "https://github.com/Saimahmed78/Markdown-Previewer",
    vercel: "https://markdown-previewer-jade-seven.vercel.app/",
    weakness: "Limited markdown support.",
    enhancementsToMake: ["Support full markdown spec", "add dark mode toggle."],
    techStack: ["React", "Marked.js"],
    description: "A markdown previewer that renders markdown in real-time with syntax highlighting.",
    conceptsUsed: ["Third-party Libraries", "Live Preview", "State Syncing"],
  },
  {
    id: "countdown-timer",
    isFullStack: false,
    title: "Countdown Timer",
    image: countdownTimerImg,
    description: "A customizable countdown timer with visual alerts and optional sound notifications.",
    github: "https://github.com/Saimahmed78/10-Days-10-JS-Projects-Series/tree/main/Digital%20Stop%20Watch",
    vercel: "https://digitalstopwatch-livid.vercel.app/",
    weakness: "Time input isn’t intuitive, no sound/alarm at end.",
    enhancementsToMake: ["Improve input UI", " add notification/alarm."],
    techStack: ["React", "CSS"],
    conceptsUsed: ["Timers", "useEffect", "Cleanup Functions"],
  },
  {
    id: "smart-clock",
    isFullStack: false,
    title: "Digital Smart Clock",
    image: smartClockImg,
    description: "A sleek digital smart clock with customizable themes, world clock support, and smooth animations.",
    github: "https://github.com/Saimahmed78/10-Days-10-JS-Projects-Series/tree/main/Digital%20Clock",
    vercel: "https://digitalclock-psi.vercel.app/",
    weakness: "Just shows time, no world clock or theme.",
    enhancementsToMake: ["Add themes", "world clock toggle", "analog mode."],
    techStack: ["React", "Date API", "TailwindCSS"],
    conceptsUsed: ["Time Manipulation", "Reusable Components", "Live Updates"],
  },
  {
    id: "poll-forge",
    isFullStack: true,
    title: "Poll Forge",
    image: pollForgeImg,
    video: "",
    github: "https://github.com/Saimahmed78/Pulse-Board",
    vercel: "",
    weakness: "Requires external SMTP and MongoDB for local setup; currently lacks multi-tenant team workspaces.",
    enhancementsToMake: [
      "Add Multi-Tenant Team Workspaces",
      "Integrate AI-Generated Summaries",
      "Add Progressive Web App (PWA) Support",
      "Include Rich Question Blocks"
    ],
    description: "An elite, real-time polling and analytics platform engineered with a premium dark void theme, secure authentication systems, and interactive analytics. Built on a MERN architecture with Socket.io WebSockets, it enables creators to instantly deploy forms, collect responses, and watch analytics update live without a single page refresh.",
    techStack: [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "Socket.io",
      "Zustand",
      "TailwindCSS"
    ],
    conceptsUsed: [
      "WebSockets for Real-time Analytics",
      "Dual-Token JWT Authentication",
      "High-Entropy Device Hints",
      "MERN Architecture",
      "Custom Global Scroll Restoration"
    ],
    features: [
      "Dual-Token JWT & Self-Healing Refresh Engine",
      "High-Entropy Mobile Telemetry & Codename Translation",
      "Premium Glassmorphic Design System",
      "Interactive Celebrating Feedback"
    ],
    architecture: {
      frontend: ["Vite React 19", "React Router v7", "Zustand"],
      backend: ["Node.js + Express", "MongoDB via Mongoose", "Socket.io", "Brevo SMTP"]
    }
  }
];

export { projectDetails };