import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";  // ✅ add this

type CSSProps = CSSProperties;

type Props = {
  children: ReactNode;
  className?: string;
  from?: CSSProps;
  to?: CSSProps;
  duration?: number;   // seconds (or ms if >10)
  delay?: number;      // seconds (or ms if >10)
  ease?: string;       // e.g. "power3.out"
  threshold?: number;  // 0..1
  rootMargin?: string; // e.g. "-100px"
  once?: boolean;
};

function toSeconds(v = 0.6) {
  return v > 10 ? v / 1000 : v;
}

function mapEase(ease?: string) {
  switch ((ease || "").toLowerCase()) {
    case "power1.out": return "cubic-bezier(0.33, 1, 0.68, 1)";
    case "power2.out": return "cubic-bezier(0.25, 1, 0.5, 1)";
    case "power3.out": return "cubic-bezier(0.22, 1, 0.36, 1)";
    case "power4.out": return "cubic-bezier(0.17, 0.84, 0.44, 1)";
    case "back.out":
    case "back.out(1.7)": return "cubic-bezier(.34,1.56,.64,1)";
    default: return "cubic-bezier(0.22, 1, 0.36, 1)";
  }
}

export default function RevealOnScroll({
  children,
  className,
  from = { opacity: 0, transform: "translateY(40px) scale(0.98)" },
  to = { opacity: 1, transform: "translateY(0) scale(1)" },
  duration = 0.6,
  delay = 0,
  ease = "power3.out",
  threshold = 0.1,
  rootMargin = "-100px",
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) io.disconnect();
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  const style = useMemo(() => {
    const base: CSSProps = {
      willChange: "transform, opacity, filter, clip-path",
      transitionProperty: "transform, opacity, filter, clip-path",
      transitionDuration: `${toSeconds(duration)}s`,
      transitionTimingFunction: mapEase(ease),
      transitionDelay: `${toSeconds(delay)}s`,
      ...from,
    };
    return inView ? { ...base, ...to } : base;
  }, [from, to, inView, duration, delay, ease]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
