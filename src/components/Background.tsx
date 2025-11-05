// src/components/Background.tsx
import "./BackGroundImage.css";

import bike from "../assets/ba2e994c-bc19-4d3a-8900-07dd187a9dd4.webp";
import ShinyText from "./ShinyText";        // your shiny text component
import RevealOnScroll from "./RevealOnScroll"; // optional: smooth entrance

export default function Background() {
  const onBook = () => alert("Book a test ride");
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <section className="h2r-hero" aria-label="Kawasaki H2R highlight">
      {/* big ghost text like the screenshot */}
      <div className="h2r-ghost" aria-hidden>
        <span className="h2r-ghost-big">H2 R</span>
        <span className="h2r-ghost-year">2023</span>
      </div>

      <div className="h2r-inner">
        {/* motorcycle visual + shiny overlay + reveal on scroll */}
        <RevealOnScroll
          className="h2r-bike-wrap"
          from={{ opacity: 0, transform: "translateY(40px) scale(0.98)" }}
          to={{ opacity: 1, transform: "translateY(0) scale(1)" }}
          duration={0.2}
          delay={0.5}
          ease="power3.out"
          threshold={0.7}
          rootMargin="-200px"
        >
          <img className="h2r-bike" src={bike} alt="Kawasaki Ninja H2R" />
          <ShinyText text="NINJA H2R" className="on-bike" speed={3} />
        </RevealOnScroll>

        {/* content */}
        <div className="h2r-copy">
          <div className="h2r-brand">
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="11" fill="currentColor" />
              <path d="M6.5 16.5L11 12L6.5 7.5h3L14 11V7.5h3V16.5h-3V13l-4.5 3.5h-3Z" fill="#0b0b0b" />
            </svg>
            <span>Kawasaki</span>
          </div>

          {/* ✅ SplitText now INSIDE the component */}
      
        <RevealOnScroll
          className="h2r-bike-wrap"
          from={{ opacity: 0, transform: "translateY(40px) scale(0.98)" }}
          to={{ opacity: 1, transform: "translateY(0) scale(1)" }}
          duration={0.2}
          delay={0.5}
          ease="power3.out"
          threshold={0.7}
          rootMargin="-200px"
        >
           <h1 className="h2r-title">
            <span>H2</span> R
          </h1>
          
        </RevealOnScroll>
        

          <p className="h2r-text">
            Kawasaki Ninja H2R merupakan sepeda motor super sport yang diproduksi sejak 2015. Tenaga dan
            teknologi aero membuatnya istimewa—didesain khusus untuk lintasan sirkuit.
          </p>

          <button className="h2r-cta" onClick={onBook}>
            BOOK A TESTRIDE
          </button>
        </div>
      </div>
    </section>
  );
}
