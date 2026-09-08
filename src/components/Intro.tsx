import { useEffect, useMemo, useRef, useState } from "react";
import { makeStyles, mergeClasses } from "@fluentui/react-components";
import { useTranslation } from "react-i18next";

const PAUSE_CHARS = ".,!?：: ";
const INTRO_HIDDEN_KEY = "affiliates:intro-hidden";

const useStyles = makeStyles({
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    backgroundColor: "#101114",
    transitionProperty: "opacity, filter",
    transitionDuration: "1.1s",
    transitionTimingFunction: "ease",
    "--intro-holo-1": "#b8a9ff",
    "--intro-holo-2": "#8fe3ff",
    "--intro-holo-3": "#ffb8e6",
  },
  overlayDismissing: {
    opacity: 0,
    filter: "blur(18px)",
    pointerEvents: "none",
  },
  mistStage: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    filter: "url(#intro-turb)",
  },
  mist: {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(50px)",
    mixBlendMode: "screen",
    opacity: 0.55,
    "@media (prefers-reduced-motion: reduce)": {
      animationName: "none",
    },
  },
  mistDismissing: {
    animationPlayState: "paused",
    transitionProperty: "transform, opacity",
    transitionDuration: "1s",
    transitionTimingFunction: "ease",
    transform: "scale(2.4)",
    opacity: 0,
  },
  m1: {
    width: "70vw",
    height: "70vw",
    top: "-10vw",
    left: "-10vw",
    backgroundImage:
      "radial-gradient(circle, var(--intro-holo-1), transparent 65%)",
    animationName: {
      to: { transform: "translate(10vw, 8vw) scale(1.15)" },
    },
    animationDuration: "14s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
    animationDirection: "alternate",
  },
  m2: {
    width: "60vw",
    height: "60vw",
    bottom: "-15vw",
    right: "-10vw",
    backgroundImage:
      "radial-gradient(circle, var(--intro-holo-2), transparent 65%)",
    animationName: {
      to: { transform: "translate(-8vw, -10vw) scale(1.2)" },
    },
    animationDuration: "17s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
    animationDirection: "alternate",
  },
  m3: {
    width: "50vw",
    height: "50vw",
    bottom: "5vw",
    left: "10vw",
    backgroundImage:
      "radial-gradient(circle, var(--intro-holo-3), transparent 65%)",
    animationName: {
      to: { transform: "translate(6vw, -6vw) scale(1.1)" },
    },
    animationDuration: "20s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
    animationDirection: "alternate",
  },
  terminal: {
    position: "relative",
    zIndex: 1,
    width: "min(92vw, 460px)",
    backgroundColor: "rgba(10, 11, 13, 0.55)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.14)",
    borderRadius: "14px",
    padding: "20px 20px 22px",
    boxShadow: "0 30px 80px rgba(0, 0, 0, 0.6)",
    opacity: 0,
    transform: "scale(0.4) translateY(50px)",
    transformOrigin: "center 70%",
  },
  terminalPop: {
    animationName: {
      "0%": { opacity: 0, transform: "scale(0.35) translateY(60px)" },
      "55%": { opacity: 1, transform: "scale(1.045) translateY(-6px)" },
      "78%": { transform: "scale(0.985) translateY(2px)" },
      "100%": { opacity: 1, transform: "scale(1) translateY(0)" },
    },
    animationDuration: "0.68s",
    animationTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    animationFillMode: "forwards",
  },
  dots: {
    display: "flex",
    gap: "6px",
    marginBottom: "14px",
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    opacity: 0.95,
  },
  dot1: {
    backgroundColor: "#ff5f57",
  },
  dot2: {
    backgroundColor: "#febc2e",
  },
  dot3: {
    backgroundColor: "#28c840",
  },
  type: {
    fontFamily: "'Space Mono', 'PingFang TC', 'Microsoft JhengHei', monospace",
    fontSize: "13.5px",
    lineHeight: "1.75",
    color: "var(--intro-holo-2)",
    textShadow: "0 0 12px rgba(143, 227, 255, 0.35)",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    minHeight: "150px",
  },
  cursor: {
    display: "inline-block",
    width: "8px",
    height: "15px",
    backgroundColor: "var(--intro-holo-2)",
    marginLeft: "2px",
    verticalAlign: "-2px",
    animationName: {
      "50%": { opacity: 0 },
    },
    animationDuration: "0.9s",
    animationTimingFunction: "step-end",
    animationIterationCount: "infinite",
    "@media (prefers-reduced-motion: reduce)": {
      animationName: "none",
    },
  },
  accept: {
    marginTop: "20px",
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    fontFamily: "'Unbounded', sans-serif",
    fontWeight: 600,
    fontSize: "13px",
    backgroundImage:
      "linear-gradient(100deg, var(--intro-holo-1), var(--intro-holo-2), var(--intro-holo-3))",
    color: "#101114",
    cursor: "pointer",
    opacity: 0,
    transform: "translateY(6px)",
    transitionProperty: "opacity, transform",
    transitionDuration: "0.5s",
    transitionTimingFunction: "ease",
    pointerEvents: "none",
  },
  acceptShow: {
    opacity: 1,
    transform: "translateY(0)",
    pointerEvents: "auto",
  },
  hideOption: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "14px",
    color: "#c9cbcf",
    fontFamily: "'Space Mono', 'PingFang TC', 'Microsoft JhengHei', monospace",
    fontSize: "12px",
    opacity: 0,
    transitionProperty: "opacity",
    transitionDuration: "0.5s",
    transitionTimingFunction: "ease",
    cursor: "pointer",
    pointerEvents: "none",
  },
  hideOptionShow: {
    opacity: 1,
    pointerEvents: "auto",
  },
  hideOptionInput: {
    width: "14px",
    height: "14px",
    margin: 0,
    accentColor: "var(--intro-holo-2)",
    cursor: "pointer",
  },
  skip: {
    position: "absolute",
    top: "18px",
    right: "20px",
    zIndex: 2,
    fontFamily: "'Space Mono', monospace",
    fontSize: "11px",
    color: "#8d8f94",
    opacity: 0.6,
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    transitionProperty: "opacity",
    transitionDuration: "0.2s",
    transitionTimingFunction: "ease",
    ":hover": {
      opacity: 1,
    },
  },
});

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function Intro() {
  const styles = useStyles();
  const { t } = useTranslation();
  const introQuote = t("intro.quote");
  const chars = useMemo(() => Array.from(introQuote), [introQuote]);
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
      role="dialog"
      aria-modal="true"
      aria-label={t("intro.ariaLabel")}
      className={mergeClasses(
        styles.overlay,
        dismissing && styles.overlayDismissing,
      )}
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
        className={styles.skip}
        onClick={(event) => {
          event.stopPropagation();
          dismiss();
        }}
      >
        {t("intro.skip")}
      </button>
      <div className={styles.mistStage}>
        <div
          className={mergeClasses(
            styles.mist,
            styles.m1,
            dismissing && styles.mistDismissing,
          )}
        />
        <div
          className={mergeClasses(
            styles.mist,
            styles.m2,
            dismissing && styles.mistDismissing,
          )}
        />
        <div
          className={mergeClasses(
            styles.mist,
            styles.m3,
            dismissing && styles.mistDismissing,
          )}
        />
      </div>
      <div
        className={mergeClasses(styles.terminal, popped && styles.terminalPop)}
        style={reduceMotion ? { opacity: 1, transform: "none" } : undefined}
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget) setReadyToType(true);
        }}
      >
        <div className={styles.dots}>
          <span className={mergeClasses(styles.dot, styles.dot1)} />
          <span className={mergeClasses(styles.dot, styles.dot2)} />
          <span className={mergeClasses(styles.dot, styles.dot3)} />
        </div>
        <div className={styles.type}>
          {chars.slice(0, typedCount).join("")}
          <span className={styles.cursor} />
        </div>
        <label
          className={mergeClasses(
            styles.hideOption,
            typingDone && styles.hideOptionShow,
          )}
          onClick={(event) => event.stopPropagation()}
        >
          <input
            type="checkbox"
            className={styles.hideOptionInput}
            checked={hideIntro}
            onChange={(event) => setHideIntro(event.target.checked)}
          />
          <span>{t("intro.hideOption")}</span>
        </label>
        <button
          type="button"
          className={mergeClasses(
            styles.accept,
            typingDone && styles.acceptShow,
          )}
          onClick={(event) => {
            event.stopPropagation();
            dismiss();
          }}
        >
          {t("intro.accept")}
        </button>
      </div>
    </div>
  );
}
