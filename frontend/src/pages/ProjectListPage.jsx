import countdown from "../assets/screenshots/countdown-timer.png";
import ebook from "../assets/screenshots/ebook-store.png";
import calculator from "../assets/screenshots/simple-calculator.png";
import tipCalculator from "../assets/screenshots/tip-calculator.png";
import markdown from "../assets/screenshots/markdown-previwer.png";
import quoteGenerator from "../assets/screenshots/quote-generator.png";
import Clock from "../assets/screenshots/smart-clock.png";
import  ProjectComp  from "../components/ProjectList";

export function Project() {
  const Projects = [
    {
      title: "Quote Generator",
      img: quoteGenerator,
      link: "/project/quote-generator",
    },
    { title: "Ebook Store", img: ebook, link: "/project/ebook-store" },
    {
      title: "Simple Calculator",
      img: calculator,
      link: "/project/simple-calculator",
    },
    {
      title: "Tip Calculator",
      img: tipCalculator,
      link: "/project/tip-calculator",
    },

    {
      title: "Markdown Previwer",
      img: markdown,
      link: "/project/markdown-previewer",
    },
    {
      title: "CountDown Timer",
      img: countdown,
      link: "/project/countdown-timer",
    },
    { title: "Digital Clock", img: Clock, link: "/project/smart-clock" },
  ];

  return (
    
      <ProjectComp details={Projects} />
    
  );
}
