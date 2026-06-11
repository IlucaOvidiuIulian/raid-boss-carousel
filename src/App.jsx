import { useState } from "react";
import Carousel from "./components/Carousel";
import { bosses } from "./data/bosses";

export default function App() {
  const len = bosses.length;

  const [index, setIndex] = useState(len);

  const activeIndex = index % len;

  const jumpTo = (i) => {
    setIndex(len + i);
  };

  return (
    <div className="app">
      <Carousel bosses={bosses} index={index} setIndex={setIndex} />

      {/* PAGINATION (SAFE OUTSIDE) */}
      <div className="pagination">
        {bosses.map((b, i) => (
          <div
            key={b.id}
            className={`dot ${i === activeIndex ? "active" : ""}`}
            onClick={() => jumpTo(i)}
            title={b.name}
          />
        ))}
      </div>
    </div>
  );
}
