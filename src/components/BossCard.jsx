import { useState, useEffect } from "react";

export default function BossCard({ boss, active }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [active]);

  return (
    <div className={`card ${active ? "active" : "inactive"}`}>
      <div
        className={`card-inner ${flipped ? "flipped" : ""}`}
        style={{
          backgroundImage: `url(${boss.image})`,
        }}
        onClick={() => active && setFlipped(!flipped)}
      >
        <div className="card-front">
          <div className="overlay">
            <h2>{boss.name}</h2>
          </div>
        </div>

        <div className="card-back">
          <div className="scroll">
            <section>
              <h3>Abilities</h3>
              <ul>
                {boss.abilities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3>Explanation</h3>
              <p>{boss.explanation}</p>
            </section>

            <section>
              <h3>Tactics</h3>
              <pre>{boss.tactics}</pre>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
