import { useState, useEffect } from "react";
import BossFront from "./BossFront";
import BossBack from "./BossBack";

export default function BossCard({ boss, active }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [active]);

  return (
    <div className={`card ${active ? "active" : "inactive"}`}>
      <div
        className={`card-inner ${flipped ? "flipped" : ""}`}
        style={{ backgroundImage: `url(${boss.image})` }}
        onClick={() => active && setFlipped((f) => !f)}
      >
        <div className="card-front">
          <BossFront boss={boss} />
        </div>

        <div className="card-back">
          <BossBack boss={boss} />
        </div>
      </div>
    </div>
  );
}
