import { useState, useRef } from "react";

/* ============================================================
   CORETECH MINIS
   Center video sits in front. Previous video peeks from the
   left, next from the right — both smaller and faded back.
   Swipe or tap a side card to bring it forward.

   TO ADD A VIDEO — just add an entry below.
   src can be:
     • a YouTube Shorts / watch / youtu.be link
     • an uploaded file:  "/minis/my-video.mp4"
       (drop the file into  job-portal-frontend/public/minis/ )
     • null  -> shows as "Coming soon"
   ============================================================ */

const MINIS = [
  {
    id: 1,
    title: "What recruiters look for in 15 seconds",
    src: "https://youtube.com/shorts/REPLACE_ME",
  },
  { id: 2, title: "Resume mistakes that cost interviews", src: null },
  { id: 3, title: "How to answer 'tell me about yourself'", src: null },
  { id: 4, title: "Manufacturing jobs in Hosur right now", src: null },
  { id: 5, title: "Salary negotiation: the one question to ask", src: null },
];

const NAVY = "#0A1930";
const BLUE = "#1A73E8";

function getYouTubeId(url = "") {
  const patterns = [
    /youtube\.com\/shorts\/([\w-]{6,})/,
    /youtu\.be\/([\w-]{6,})/,
    /youtube\.com\/watch\?v=([\w-]{6,})/,
    /youtube\.com\/embed\/([\w-]{6,})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function CardInner({ mini, isActive, isPlaying, onPlay }) {
  const ytId = mini.src ? getYouTubeId(mini.src) : null;

  if (!mini.src) {
    return (
      <div className="ctm-frame ctm-frame--empty">
        <span className="ctm-empty-dot" />
        <p className="ctm-empty-text">Coming soon</p>
      </div>
    );
  }

  if (isActive && isPlaying) {
    return (
      <div className="ctm-frame">
        {ytId ? (
          <iframe
            className="ctm-media"
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&playsinline=1`}
            title={mini.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video className="ctm-media" src={mini.src} controls autoPlay playsInline />
        )}
      </div>
    );
  }

  return (
    <div className="ctm-frame">
      {ytId ? (
        <img
          className="ctm-media"
          src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
          alt=""
        />
      ) : (
        <video className="ctm-media" src={mini.src} preload="metadata" muted />
      )}
      {isActive && (
        <button
          type="button"
          className="ctm-play"
          onClick={onPlay}
          aria-label={`Play: ${mini.title}`}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path d="M8 5v14l11-7z" fill="#fff" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default function CoretechMinis() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const touchX = useRef(null);

  const go = (next) => {
    const clamped = Math.max(0, Math.min(MINIS.length - 1, next));
    if (clamped !== active) {
      setActive(clamped);
      setPlaying(false);
    }
  };

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(delta) > 45) go(active + (delta < 0 ? 1 : -1));
    touchX.current = null;
  };

  return (
    <section className="ctm-wrap">
      <style>{`
        .ctm-wrap { position: relative; padding: 6px 0 4px; }

        .ctm-stage {
          position: relative;
          height: calc(min(58vw, 236px) * 16 / 9);
          overflow: hidden;
          touch-action: pan-y;
        }

        .ctm-card {
          position: absolute;
          top: 0;
          left: 50%;
          width: min(58vw, 236px);
          padding: 0;
          border: 0;
          background: none;
          cursor: pointer;
          transition: transform .38s cubic-bezier(.22,.61,.36,1),
                      opacity .38s ease,
                      filter .38s ease;
          will-change: transform, opacity;
        }
        .ctm-card--hidden { pointer-events: none; }

        .ctm-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 9 / 16;
          border-radius: 20px;
          overflow: hidden;
          background: ${NAVY};
          box-shadow: 0 10px 30px rgba(10, 25, 48, .22);
        }

        .ctm-media {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border: 0;
          display: block;
        }

        .ctm-play {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          width: 58px; height: 58px;
          min-width: 58px; min-height: 58px;
          flex-shrink: 0;
          border: 0;
          border-radius: 50%;
          background: ${BLUE};
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 18px rgba(10, 25, 48, .4);
        }
        .ctm-play svg { margin-left: 3px; display: block; }

        .ctm-frame--empty {
          border: 1px dashed rgba(10, 25, 48, .22);
          background: #f3f6fb;
          box-shadow: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .ctm-empty-dot { width: 10px; height: 10px; border-radius: 50%; background: ${BLUE}; opacity: .5; }
        .ctm-empty-text { margin: 0; color: #5b6b82; font-size: .9rem; }

        .ctm-caption {
          margin: 16px auto 0;
          max-width: 460px;
          text-align: center;
          font-size: 1rem;
          line-height: 1.4;
          color: ${NAVY};
          font-weight: 600;
        }

        .ctm-dots {
          display: flex;
          justify-content: center;
          gap: 7px;
          margin-top: 12px;
        }
        .ctm-dot {
          width: 7px; height: 7px;
          min-width: 7px;
          padding: 0;
          border: 0;
          border-radius: 50%;
          background: rgba(10, 25, 48, .22);
          cursor: pointer;
        }
        .ctm-dot--on { background: ${BLUE}; width: 20px; min-width: 20px; border-radius: 4px; }

        @media (prefers-reduced-motion: reduce) {
          .ctm-card { transition: none; }
        }
      `}</style>

      <div className="ctm-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {MINIS.map((mini, i) => {
          const offset = i - active;
          const far = Math.abs(offset) > 1;
          const style = {
            transform: `translateX(calc(-50% + ${offset * 62}%)) scale(${
              offset === 0 ? 1 : 0.82
            })`,
            opacity: far ? 0 : offset === 0 ? 1 : 0.45,
            filter: offset === 0 ? "none" : "blur(1px)",
            zIndex: 10 - Math.abs(offset),
          };
          return (
            <div
              key={mini.id}
              className={`ctm-card${far ? " ctm-card--hidden" : ""}`}
              style={style}
              onClick={() => offset !== 0 && go(i)}
              role={offset !== 0 ? "button" : undefined}
              aria-hidden={far ? "true" : undefined}
            >
              <CardInner
                mini={mini}
                isActive={offset === 0}
                isPlaying={playing}
                onPlay={() => setPlaying(true)}
              />
            </div>
          );
        })}
      </div>

      <p className="ctm-caption">{MINIS[active].title}</p>

      <div className="ctm-dots">
        {MINIS.map((mini, i) => (
          <button
            key={mini.id}
            type="button"
            className={`ctm-dot${i === active ? " ctm-dot--on" : ""}`}
            onClick={() => go(i)}
            aria-label={`Go to video ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}