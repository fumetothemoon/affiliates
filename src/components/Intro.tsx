import { useEffect, useRef, useState } from "react";
import { introQuote } from "../data/intro";
import "./Intro.css";

const PAUSE_CHARS = ".,!?：: ";
const INTRO_HIDDEN_KEY = "affiliates:intro-hidden";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function Intro() {
  const chars = useRef(Array.from(introQuote)).current;
  const reduceMotion = useRef(prefersReducedMotion()).current;

  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      return window.localStorage.getItem(INTRO_HIDDEN_KEY) !== "true";
    } catch {
      return true;
    }
  });

  const [dismissing, setDismissing] = useState(false);
  const [hideIntro, setHideIntro] = useState(false);
  const [popped, setPopped] = useState(reduceMotion);
  const [readyToType, setReadyToType] = useState(reduceMotion);
  const [typedCount, setTypedCount] = useState(reduceMotion ? chars.length : 0);
  const [typingDone, setTypingDone] = useState(reduceMotion);

  const typeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    if (!reduceMotion) {
      popTimer.current = setTimeout(() => setPopped(true), 260);
    }

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      if (popTimer.current) clearTimeout(popTimer.current);
      if (typeTimer.current) clearTimeout(typeTimer.current);
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!readyToType || typingDone) return;
    if (typedCount >= chars.length) {
      setTypingDone(true);
      return;
    }
    const nextChar = chars[typedCount];
    let delay = 26 + Math.random() * 30;
    if (PAUSE_CHARS.includes(nextChar)) delay += 160;
    typeTimer.current = setTimeout(() => {
      setTypedCount((count) => count + 1);
    }, delay);
    return () => {
      if (typeTimer.current) clearTimeout(typeTimer.current);
    };
  }, [readyToType, typedCount, typingDone, chars]);

  const finishTyping = () => {
    if (typeTimer.current) clearTimeout(typeTimer.current);
    setTypedCount(chars.length);
    setTypingDone(true);
  };

  const dismiss = () => {
    if (hideIntro) {
      try {
        localStorage.setItem(INTRO_HIDDEN_KEY, "true");
      } catch {
        // ignore write failures (storage blocked/unavailable)
      }
    }
    setDismissing(true);
    document.documentElement.style.overflow = "";
    dismissTimer.current = setTimeout(() => setVisible(false), 1150);
  };

  if (!visible) return null;

  return (
    <div
      className={`intro-overlay${dismissing ? " intro-dismissing" : ""}`}
      onClick={() => {
        if (!typingDone) finishTyping();
      }}
    >
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <filter id="intro-turb">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.012"
            numOctaves={2}
            seed={7}
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={60} />
        </filter>
      </svg>
      <button
        type="button"
        className="intro-skip"
        onClick={(event) => {
          event.stopPropagation();
          dismiss();
        }}
      >
        skip
      </button>
      <div className="intro-mist-stage">
        <div className="intro-mist m1" />
        <div className="intro-mist m2" />
        <div className="intro-mist m3" />
      </div>
      <div
        className={`intro-terminal${popped ? " intro-pop" : ""}`}
        style={reduceMotion ? { opacity: 1, transform: "none" } : undefined}
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget) setReadyToType(true);
        }}
      >
        <div className="intro-dots">
          <span />
          <span />
          <span />
        </div>
        <div className="intro-type">
          {chars.slice(0, typedCount).join("")}
          <span className="intro-cursor" />
        </div>
        <label
          className={`intro-hide-option${typingDone ? " intro-show" : ""}`}
          onClick={(event) => event.stopPropagation()}
        >
          <input
            type="checkbox"
            checked={hideIntro}
            onChange={(event) => setHideIntro(event.target.checked)}
          />
          <span>不再顯示</span>
        </label>
        <button
          type="button"
          className={`intro-accept${typingDone ? " intro-show" : ""}`}
          onClick={(event) => {
            event.stopPropagation();
            dismiss();
          }}
        >
          知道了
        </button>
      </div>
    </div>
  );
}
