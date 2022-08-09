export class ResultModel {
  winner: number;
  loser: number;
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
    details: {
      hp: number;
      attack: number;
      defense: number;
      "special-attack": number;
      "special-defense": number;
      speed: number;
    }
  ) {
    this.winner = winner;
    this.loser = loser;
    this.details = details;
  }
}
