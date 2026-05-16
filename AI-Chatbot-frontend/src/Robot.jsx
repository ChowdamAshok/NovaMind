import { useEffect, useRef, useState } from "react";
import "./Robot.css";

function Robot({ state = "idle" }) {
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [blink, setBlink] = useState(false);
  const [headTilt, setHeadTilt] = useState(0);

  const robotRef = useRef(null);

  /* =========================
     EYES FOLLOW CURSOR
  ========================= */

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!robotRef.current) return;

      const rect = robotRef.current.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const angle = Math.atan2(
        e.clientY - centerY,
        e.clientX - centerX
      );

      const distance = 4;

      setEyePos({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });

      const tilt =
        ((e.clientX - centerX) / rect.width) * 8;

      setHeadTilt(tilt);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () =>
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
  }, []);

  /* =========================
     BLINK
  ========================= */

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);

      setTimeout(() => {
        setBlink(false);
      }, 150);
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div
      className={`robot-wrapper ${state}`}
      ref={robotRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* =========================
          BUBBLES
      ========================= */}

      {isHovered && state === "idle" && (
        <div className="speech-bubble">
          Hey there 👋
        </div>
      )}

      {state === "thinking" && (
        <div className="speech-bubble thinking-bubble">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      {state === "typing" && (
        <div className="speech-bubble typing-bubble">
          Thinking...
        </div>
      )}

      {state === "answer" && (
        <div className="speech-bubble answer-bubble">
          Done ✨
        </div>
      )}

      {/* =========================
          SVG
      ========================= */}

      <svg
        width="140"
        height="170"
        viewBox="0 0 160 220"
        xmlns="http://www.w3.org/2000/svg"
        className="robot-svg"
        style={{
          transform: `rotate(${headTilt}deg)`,
        }}
      >
        <defs>
          {/* HEAD */}
          <radialGradient
            id="headGrad"
            cx="40%"
            cy="35%"
            r="65%"
          >
            <stop offset="0%" stopColor="#4338ca" />
            <stop offset="50%" stopColor="#312e81" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </radialGradient>

          {/* BODY */}
          <linearGradient
            id="bodyGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>

          {/* EYE */}
          <radialGradient
            id="eyeGrad"
            cx="40%"
            cy="35%"
            r="60%"
          >
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="60%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#0891b2" />
          </radialGradient>

          {/* GLOW */}
          <filter
            id="glow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur
              stdDeviation="3"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* SHADOW */}
          <filter
            id="shadow"
            x="-20%"
            y="-20%"
            width="160%"
            height="160%"
          >
            <feDropShadow
              dx="0"
              dy="5"
              stdDeviation="4"
              floodColor="#312e81"
              floodOpacity="0.5"
            />
          </filter>

          {/* CLIPS */}
          <clipPath id="leftEyeClip">
            <ellipse
              cx="57"
              cy="88"
              rx="11"
              ry="13"
            />
          </clipPath>

          <clipPath id="rightEyeClip">
            <ellipse
              cx="103"
              cy="88"
              rx="11"
              ry="13"
            />
          </clipPath>
        </defs>

        {/* =========================
            SHADOW
        ========================= */}

        <ellipse
          cx="80"
          cy="194"
          rx="34"
          ry="5"
          fill="rgba(99,102,241,0.18)"
        />

        {/* =========================
            BODY
        ========================= */}

        <rect
          x="35"
          y="118"
          width="90"
          height="62"
          rx="22"
          fill="url(#bodyGrad)"
          stroke="#60a5fa"
          strokeWidth="2"
          filter="url(#shadow)"
        />

        {/* CHEST */}

        <rect
          x="50"
          y="128"
          width="60"
          height="28"
          rx="10"
          fill="rgba(0,0,0,0.25)"
          stroke="rgba(255,255,255,0.08)"
        />

        {/* AI LINE */}

        <rect
          x="58"
          y="140"
          width="44"
          height="2"
          rx="1"
          fill="#22d3ee"
          opacity="0.9"
        >
          <animate
            attributeName="width"
            values="10;44;10"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>

        {/* LIGHTS */}

        <circle
          cx="62"
          cy="149"
          r="3"
          fill="#f87171"
        />

        <circle
          cx="80"
          cy="149"
          r="3"
          fill="#fbbf24"
        />

        <circle
          cx="98"
          cy="149"
          r="3"
          fill="#34d399"
        />

        {/* =========================
            LEFT ARM
        ========================= */}

        <g className="arm-left">
          <rect
            x="12"
            y="124"
            width="22"
            height="44"
            rx="12"
            fill="#2563eb"
          />

          <circle
            cx="23"
            cy="172"
            r="10"
            fill="#1d4ed8"
          />
        </g>

        {/* =========================
            RIGHT ARM
        ========================= */}

        <g className="arm-right">
          <rect
            x="126"
            y="124"
            width="22"
            height="44"
            rx="12"
            fill="#2563eb"
          />

          <circle
            cx="137"
            cy="172"
            r="10"
            fill="#1d4ed8"
          />
        </g>

        {/* =========================
            NECK
        ========================= */}

        <rect
          x="68"
          y="108"
          width="24"
          height="12"
          rx="6"
          fill="#1e3a8a"
        />

        {/* =========================
            HEAD
        ========================= */}

        <ellipse
          cx="80"
          cy="72"
          rx="50"
          ry="48"
          fill="url(#headGrad)"
          stroke="#818cf8"
          strokeWidth="2"
          filter="url(#shadow)"
        />

        {/* ANTENNA */}

        <rect
          x="78"
          y="16"
          width="4"
          height="22"
          rx="2"
          fill="#6366f1"
        />

        <circle
          cx="80"
          cy="12"
          r="8"
          fill="#22d3ee"
          filter="url(#glow)"
        >
          <animate
            attributeName="r"
            values="8;10;8"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* =========================
            EYES
        ========================= */}

        {/* LEFT EYE */}

        <ellipse
          cx="57"
          cy="88"
          rx="15"
          ry="17"
          fill="#020617"
          stroke="#22d3ee"
          strokeWidth="2"
        />

        {!blink ? (
          <>
            <ellipse
              cx={57 + eyePos.x}
              cy={88 + eyePos.y}
              rx="8"
              ry="10"
              fill="url(#eyeGrad)"
              filter="url(#glow)"
              clipPath="url(#leftEyeClip)"
            />

            <circle
              cx={53 + eyePos.x}
              cy={84 + eyePos.y}
              r="2.5"
              fill="white"
            />
          </>
        ) : (
          <ellipse
            cx="57"
            cy="88"
            rx="12"
            ry="2"
            fill="#22d3ee"
          />
        )}

        {/* RIGHT EYE */}

        <ellipse
          cx="103"
          cy="88"
          rx="15"
          ry="17"
          fill="#020617"
          stroke="#22d3ee"
          strokeWidth="2"
        />

        {!blink ? (
          <>
            <ellipse
              cx={103 + eyePos.x}
              cy={88 + eyePos.y}
              rx="8"
              ry="10"
              fill="url(#eyeGrad)"
              filter="url(#glow)"
              clipPath="url(#rightEyeClip)"
            />

            <circle
              cx={99 + eyePos.x}
              cy={84 + eyePos.y}
              r="2.5"
              fill="white"
            />
          </>
        ) : (
          <ellipse
            cx="103"
            cy="88"
            rx="12"
            ry="2"
            fill="#22d3ee"
          />
        )}

        {/* =========================
            MOUTH
        ========================= */}

        {state === "answer" ? (
          <path
            d="M 58 112 Q 80 128 102 112"
            fill="none"
            stroke="#34d399"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glow)"
          />
        ) : state === "thinking" ? (
          <rect
            x="66"
            y="113"
            width="28"
            height="4"
            rx="2"
            fill="#f59e0b"
          />
        ) : (
          <path
            d="M 62 112 Q 80 122 98 112"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#glow)"
          />
        )}

        {/* CHEEKS */}

        <ellipse
          cx="46"
          cy="108"
          rx="8"
          ry="5"
          fill="rgba(236,72,153,0.25)"
        />

        <ellipse
          cx="114"
          cy="108"
          rx="8"
          ry="5"
          fill="rgba(236,72,153,0.25)"
        />

        {/* =========================
            BOTTOM GLOW
        ========================= */}

        <ellipse
          cx="80"
          cy="188"
          rx="32"
          ry="6"
          fill="rgba(34,211,238,0.25)"
          filter="url(#glow)"
        >
          <animate
            attributeName="rx"
            values="28;36;28"
            dur="2.5s"
            repeatCount="indefinite"
          />

          <animate
            attributeName="opacity"
            values="0.2;0.5;0.2"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </ellipse>
      </svg>
    </div>
  );
}

export default Robot;