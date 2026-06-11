import { useRef, useState } from "react";
import BossCard from "./BossCard";

export default function Carousel({ bosses }) {
  const len = bosses.length;
  const extended = [...bosses, ...bosses, ...bosses];

  const [index, setIndex] = useState(len);
  const [transition, setTransition] = useState(true);

  const startX = useRef(0);
  const trackRef = useRef(null);

  const goNext = () => setIndex((i) => i + 1);
  const goPrev = () => setIndex((i) => i - 1);

  const onStart = (e) => {
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };
  ``;
  const onEnd = (e) => {
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;

    const diff = endX - startX.current;

    if (Math.abs(diff) > 60) {
      diff < 0 ? goNext() : goPrev();
    }
  };

  const activeIndex = index % len;

  const getCircularDirection = (from, to, len) => {
    const forward = (to - from + len) % len;
    const backward = (from - to + len) % len;
    return forward <= backward ? "next" : "prev";
  };

  // 🔥 SAFE INFINITE LOOP HANDLER
  const handleTransitionEnd = () => {
    if (index >= len * 2) {
      setTransition(false);

      requestAnimationFrame(() => {
        setIndex(len);
        requestAnimationFrame(() => {
          setTransition(true);
        });
      });
    }

    if (index < len) {
      setTransition(false);

      requestAnimationFrame(() => {
        setIndex(len + (index % len));
        requestAnimationFrame(() => {
          setTransition(true);
        });
      });
    }
  };

  return (
    <div
      className="carousel"
      onMouseDown={onStart}
      onMouseUp={onEnd}
      onTouchStart={onStart}
      onTouchEnd={onEnd}
    >
      {/* BACKGROUND */}
      <div className="bg-container">
        {bosses.map((b, i) => (
          <div
            key={b.id}
            className={`bg ${i === activeIndex ? "active" : ""}`}
            style={{
              backgroundImage: `url(${b.image})`,
            }}
          />
        ))}
      </div>

      {/* TRACK */}
      <div
        ref={trackRef}
        onTransitionEnd={handleTransitionEnd}
        className="track"
        style={{
          transform: `translateX(calc(50vw - 170px - ${index * 360}px))`,
          transition: transition ? "transform 0.6s ease" : "none",
        }}
      >
        {extended.map((boss, i) => {
          const realIndex = i % len;
          const isActive = realIndex === activeIndex;

          return (
            <div
              key={i}
              onClick={() => {
                if (isActive) return;

                const direction = getCircularDirection(
                  activeIndex,
                  realIndex,
                  len,
                );

                direction === "next" ? goNext() : goPrev();
              }}
            >
              <BossCard boss={boss} active={isActive} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
