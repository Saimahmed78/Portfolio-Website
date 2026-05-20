import countdown from "../assets/screenshots/countdown-timer.png";
import ebook from "../assets/screenshots/ebook-store.png";
import calculator from "../assets/screenshots/simple-calculator.png";
import tipCalculator from "../assets/screenshots/tip-calculator.png";
import markdown from "../assets/screenshots/markdown-previwer.png";
import quoteGenerator from "../assets/screenshots/quote-generator.png";
import Clock from "../assets/screenshots/smart-clock.png";
import ProjectComp from "../components/ProjectList";

export function Project() {
  const Projects = [
    { 
      title: "Pulse Board", 
      impact: "Full-stack real-time analytics dashboard with secure dual-token authentication.",
      img: ebook, // Reusing ebook as placeholder since it's full stack
      link: "/project/pulse-board",
      brand: "#47A248",
      metrics: { stars: 45, views: 1200 },
      skills: ["MongoDB", "Express", "React", "Node.js"],
    },
    {
      title: "Quote Generator",
      impact: "A lightweight daily motivation app serving thousands of dynamic quotes via REST APIs.",
      img: quoteGenerator,
      link: "/project/quote-generator",
      brand: "#61DAFB",
      metrics: { stars: 12, views: 450 },
      skills: ["React", "API", "CSS"],
    },
    {
      title: "Simple Calculator",
      impact: "A precise, state-driven calculation engine with zero external dependencies.",
      img: calculator,
      link: "/project/simple-calculator",
      brand: "#F7DF1E",
      metrics: { stars: 8, views: 320 },
      skills: ["React", "Hooks", "CSS"],
    },
    {
      title: "Tip Calculator",
      impact: "A responsive utility app for quick bill splitting and tip calculation.",
      img: tipCalculator,
      link: "/project/tip-calculator",
      brand: "#06B6D4",
      metrics: { stars: 5, views: 210 },
      skills: ["React", "State", "Tailwind"],
    },
    {
      title: "Markdown Previewer",
      impact: "Real-time markdown compilation and rendering engine for writers.",
      img: markdown,
      link: "/project/markdown-previewer",
      brand: "#339933",
      metrics: { stars: 18, views: 890 },
      skills: ["React", "Marked.js", "CSS"],
    },
    {
      title: "CountDown Timer",
      impact: "High-precision interval tracking application for productivity.",
      img: countdown,
      link: "/project/countdown-timer",
      brand: "#646CFF",
      metrics: { stars: 10, views: 400 },
      skills: ["React", "Hooks", "Interval"],
    },
    { 
      title: "Digital Clock", 
      impact: "A sleek, zero-latency digital time display using native Date objects.",
      img: Clock, 
      link: "/project/smart-clock",
      brand: "#E34F26",
      metrics: { stars: 7, views: 250 },
      skills: ["React", "Date Object"],
    },
  ];

  return (
    <div className="section section-tight animate-fadeIn" style={{ paddingTop: "100px", paddingBottom: "40px" }}>
      <div className="section-label">Selected Works</div>
      <h1 className="section-title text-[var(--text-display)] tracking-tight">
        Featured <span className="hero-title-accent">Projects</span>
      </h1>
      <p className="section-sub mb-12">
        A collection of web applications I've engineered, showcasing my expertise in the MERN stack, performance optimization, and UI design.
      </p>

      <div className="mt-8">
        <ProjectComp details={Projects} />
      </div>
    </div>
  );
}
