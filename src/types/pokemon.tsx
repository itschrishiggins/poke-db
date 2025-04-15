export interface Pokemon {
  id: number;
  name: string;
  rawName: string;
  image: string;
  types: string[];
}

export interface PokemonDetails extends Omit<Pokemon, "types"> {
  types: { type: { name: string; url: string } }[];
  height: number;
  weight: number;
  abilities: Ability[];
  abilityFlavor: string;
  stats: Stat[];
  genus: string;
  flavor_text: string;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

export interface Ability {
  ability: {
    name: string;
    url: string;
  };
}

export interface Stat {
  base_stat: number;
  stat: { name: string };
}

export interface TypeStyles {
  [type: string]: string;
}
