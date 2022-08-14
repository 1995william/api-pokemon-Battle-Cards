export interface Ipokemon {
    _id: number,
      name: string,
      attributes: {
              hp: number,
              attack: number,
              defense: number,
              "special-attack": number,
              "special-defense": number,
              "speed": number,
          },
  }