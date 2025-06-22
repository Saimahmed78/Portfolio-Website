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
    { title: "Quote Generator", img: countdown },
    { title: "Ebook Store", img: ebook },
    { title: "Simple Calculator", img: calculator },
    { title: "Tip Calculator", img: tipCalculator },
    { title: "Markdown Previwer", img: markdown },
    { title: "Quote Generator", img: quoteGenerator },
    { title: "Digital Clock", img: Clock },
  ];

  return (
    <div>
      <Projectcomp details={Projects} />
    </div>
  );
}
