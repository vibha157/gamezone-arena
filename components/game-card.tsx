import Link from "next/link";

type Game = { id: string; name: string; price: number; unit: string; icon: string; description: string };

export function GameCard({ game }: { game: Game }) {
  return (
    <article className="game-card">
      <div className="game-icon">{game.icon}</div>
      <div className="game-meta"><span>GAME</span><span>₹{game.price}</span></div>
      <h3>{game.name}</h3>
      <p>{game.description}</p>
      <div className="card-bottom">
        <small>{game.unit}</small>
        <Link href={`#booking`} className="text-button">Book →</Link>
      </div>
    </article>
  );
}
