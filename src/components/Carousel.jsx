import { useRef } from "react";
import BossCard from "./BossCard";

export default function Carousel({ bosses, index, setIndex }) {
  const len = bosses.length;
  const extended = [...bosses, ...bosses, ...bosses];

  const startX = useRef(0);

  const goNext = () => setIndex((i) => i + 1);
  const goPrev = () => setIndex((i) => i - 1);

  const onStart = (e) => {
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const onEnd = (e) => {
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;

    const diff = endX - startX.current;

    if (Math.abs(diff) > 60) {
      diff < 0 ? goNext() : goPrev();
    }
  };

  const activeIndex = ((index % len) + len) % len;

  const getCircularDirection = (from, to, len) => {
    const forward = (to - from + len) % len;
    const backward = (from - to + len) % len;
    return forward <= backward ? "next" : "prev";
  };

  return (
    <div
      className="carousel"
      onMouseDown={onStart}
      onMouseUp={onEnd}
      onTouchStart={onStart}
      onTouchEnd={onEnd}
    >
      {/* Background */}
      <div className="bg-container">
        {bosses.map((b, i) => (
          <div
            key={b.id}
            className={`bg ${i === activeIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${b.image})` }}
          />
        ))}
      </div>

      {/* Track */}
      <div
        className="track"
        style={{
          transform: `translateX(calc(50vw - 170px - ${index * 360}px))`,
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
