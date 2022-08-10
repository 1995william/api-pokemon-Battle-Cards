export class PokemonBattleStatsModel {
    hp: number;
    attack: number;
    defense: number;
    "special-attack": number;
    "special-defense": number;
    speed: number;

    constructor(hp: number, attack: number, defense: number, specialAttack: number, specialDefense: number, speed: number) {
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this["special-attack"] = specialAttack;
        this["special-defense"] = specialDefense;
        this.speed = speed;
    }
}