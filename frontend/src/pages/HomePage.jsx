import { CtaButton } from "../../components/Button/Button";
import profileImg from "../../assets/images/profile-image.jpg";

// Base button classes
const baseBtnClasses =
  "px-6 py-3 bg-[#ff4e50] text-white font-bold rounded-lg hover:scale-105 hover:bg-[#ff7375] transition duration-300 ease-in-out max-[480px]:w-[80%] max-[480px]:max-w-[260px]";

// Animation helper classes
const slideLeft =
  "animate-[slide-fade-in-left_1.2s_ease-out_forwards] opacity-0 max-[480px]:opacity-100";
const slideRight =
  "animate-[slide-fade-in-right_1.2s_ease-out_forwards] opacity-0 max-[480px]:opacity-100";
const fadeUp = (delay = "0s") =>
  `animate-[fade-in-up_1s_ease-out_${delay}_forwards] opacity-0 max-[480px]:opacity-100`;

export function Home() {
  return (
    <main className="flex justify-between items-center px-[100px] py-[60px] min-h-screen text-white overflow-hidden bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] max-[480px]:flex-col max-[480px]:px-5 max-[480px]:py-10 max-[480px]:text-center">
      {/* Hero Left */}
      <div className={`max-w-[50%] ${slideLeft} max-[480px]:max-w-full`}>
        <h1
          className={`${fadeUp(
            "0.5s",
          )} text-[42px] font-bold mb-5 max-[480px]:text-[32px] max-[480px]:mb-4`}
        >
          I am MERN Stack Developer
        </h1>
        <p
          className={`${fadeUp(
            "1s",
          )} text-[18px] leading-relaxed mb-7 text-[#dcdcdc] max-[480px]:text-[16px] max-[480px]:mb-5`}
        >
          Hi, I’m Saim Ahmed — a passionate MERN stack developer who loves
          building clean, functional web apps. I enjoy solving real-world
          problems through code and constantly push myself to learn and improve.
        </p>

        <div className="flex max-[480px]:flex-col max-[480px]:items-center">
          <CtaButton
            className={`${baseBtnClasses} mr-4 max-[480px]:mb-2`}
            to="/project"
          >
            Project
          </CtaButton>
          <CtaButton className={baseBtnClasses} to="/about">
            About me
          </CtaButton>
        </div>
      </div>

      {/* Hero Right */}
      <div className={`${slideRight} max-[480px]:mt-10`}>
        <div className="w-[600px] h-[1000px] rounded-[80%] overflow-hidden border-[5px] border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.4)] max-[480px]:w-[90%] max-[480px]:h-auto max-[480px]:max-w-[320px] max-[480px]:rounded-full max-[480px]:mx-auto">
          <img
            src={profileImg}
            alt="Saim Ahmed"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </main>
  );
}
