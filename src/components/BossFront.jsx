export default function BossFront({ boss }) {
  return (
    <div className="front">
      <h2>{boss.name}</h2>
      <div className="wing">{boss.wing}</div>
    </div>
  );
}
