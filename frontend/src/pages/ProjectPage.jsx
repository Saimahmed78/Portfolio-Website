import countdown from "../assets/countdown timer.png";
import ebook from "../assets/Ebook Store.png";
import calculator from "../assets/Simple Calculator.png";
import tipCalculator from "../assets/Tip Calculator.png";
import markdown from "../assets/MarkDown previwer.png";
import quoteGenerator from "../assets/Quote Generator.png";
import Clock from "../assets/SmartClock.png";
import { Projectcomp } from "../component/projectList";
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
    <>
      <div>
        <Projectcomp details={Projects} />
      </div>
    </>
  );
}
