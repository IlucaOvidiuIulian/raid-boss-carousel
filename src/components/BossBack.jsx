export default function BossBack({ boss }) {
  return (
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
  );
}
