export class ResultModel  {
  playerWinner: number;
  playerLoser: number;
  pokemon: string;
  details: {
    hp: number;
    attack: number;
    defense: number;
    "special-attack": number;
    "special-defense": number;
    speed: number;
  };

  constructor(
    winner: number,
    loser: number,
    pokemon: string,
    details: {
      hp: number;
      attack: number;
      defense: number;
      "special-attack": number;
      "special-defense": number;
      speed: number;
    }
  ) {
    this.playerWinner = winner;
    this.playerLoser = loser;
    this.pokemon = pokemon;
    this.details = details;
  }
}
