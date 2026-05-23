import quoteGeneratorImg from "../assets/screenshots/quote-generator.png";
import ebookStoreImg from "../assets/screenshots/ebook-store.png";
import simpleCalculatorImg from "../assets/screenshots/simple-calculator.png";
import tipCalculatorImg from "../assets/screenshots/tip-calculator.png";
import markdownPreviewerImg from "../assets/screenshots/markdown-previwer.png";
import countdownTimerImg from "../assets/screenshots/countdown-timer.png";
import smartClockImg from "../assets/screenshots/smart-clock.png";
import pollForgeImg from "../assets/screenshots/poll-forge.png";
import randomCatViewerImg from "../assets/screenshots/Cat-Listing-Desktop-view.png";
import mealRecipesImg from "../assets/screenshots/Meal-listing-desktop-view.png";
import videoListingImg from "../assets/screenshots/videos-listing-desktop-view.png";

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
    techStack: ["HTML","CSS","JavaScript"],
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
    techStack: ["HTML", "CSS", "JavaScript"],
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
    techStack: ["HTML", "CSS", "JavaScript"],
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
    techStack: ["HTML", "CSS", "JavaScript"],
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
    techStack: ["HTML", "CSS", "JavaScript"],
    conceptsUsed: ["Time Manipulation", "Reusable Components", "Live Updates"],
  },
  {
    id: "poll-forge",
    isFullStack: true,
    title: "Poll Forge",
    image: pollForgeImg,
    video: "",
    github: "https://github.com/Saimahmed78/Pulse-Board",
    vercel: "https://poll-forge-chi.vercel.app",
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
  },
  {
    id: "random-cat-viewer",
    isFullStack: false,
    isReact: true,
    title: "Random Cat Viewer",
    image: randomCatViewerImg,
    github: "https://github.com/Saimahmed78/Random-Cat-Viewer",
    vercel: "https://random-cat-generator-three.vercel.app/",
    weakness: "Requires continuous network access to load images.",
    enhancementsToMake: ["Add caching for offline support", "implement favorite breeds list."],
    description: "A React-based app that fetches and displays a random cat breed on every click — built to practice component architecture, state management, and hooks.",
    techStack: ["React.js", "Vanilla CSS", "FreeAPI"],
    conceptsUsed: ["useEffect", "useState", "Conditional Rendering", "API Integration"],
    features: [
      "Fetches a random cat breed from FreeAPI on load and on demand",
      "Displays breed image, origin, lifespan, temperament, and dog-friendliness",
      "Animated energy level progress bar",
      "Wikipedia link per breed",
      "Loading state between fetches"
    ]
  },
  {
    id: "meal-recipes",
    isFullStack: false,
    isReact: true,
    title: "Meal Recipes",
    image: mealRecipesImg,
    github: "https://github.com/Saimahmed78/Meal-Recipes",
    vercel: "https://meals-listing-lyart.vercel.app/",
    weakness: "Dependent on external API rate limits.",
    enhancementsToMake: ["Add user authentication", "allow saving custom recipes."],
    description: "A React-based meal recipe listing app that fetches recipes and their full ingredient breakdowns from an API, displayed in an editorial dark-themed layout.",
    techStack: ["React.js", "Vanilla CSS", "FreeAPI"],
    conceptsUsed: ["useEffect with AbortController", "useState", "Dynamic Key Extraction", "Error Handling"],
    features: [
      "Editorial dark UI with a responsive recipe grid",
      "Fetches live meal data from FreeAPI",
      "Displays full ingredient list with measurements per recipe",
      "Category and cuisine area tags per meal",
      "Graceful error handling on fetch failure",
      "Smooth image overlay and card transitions"
    ]
  },
  {
    id: "video-listing-project",
    isFullStack: false,
    isReact: true,
    title: "Video Listing Project",
    image: videoListingImg,
    github: "https://github.com/Saimahmed78/Video-Listing-Project",
    vercel: "https://video-listing-project.vercel.app/",
    weakness: "Playback is not supported internally yet.",
    enhancementsToMake: ["Embed video player", "add infinite scrolling.", "implement custom categories."],
    description: "A React-based video listing app that fetches videos and their metadata from an API and displays them in a YouTube-style layout.",
    techStack: ["React.js", "Vanilla CSS", "FreeAPI"],
    conceptsUsed: ["Component Decomposition", "Skeleton Loaders", "Date Formatting", "State Management"],
    features: [
      "YouTube-style responsive video grid",
      "Fetches live video data from FreeAPI",
      "Skeleton loading cards while data is being fetched",
      "Formatted view counts, like counts, and comment counts",
      "Human-readable timestamps",
      "Hover animation on video cards",
      "Graceful error handling on fetch failure",
      "Sticky header with search bar UI"
    ]
  }
];

export { projectDetails };