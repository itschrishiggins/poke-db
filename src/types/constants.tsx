export type TypeStyles = {
  [key: string]: string;
};

export const typeStyles: TypeStyles = {
  normal: "#9099a1",
  fighting: "#ce4069",
  flying: "#92aade",
  poison: "#ab6ac8",
  ground: "#d97746",
  rock: "#c7b78b",
  bug: "#90c12c",
  ghost: "#5269ac",
  steel: "#5a8ea1",
  fire: "#ff9c54",
  water: "#4d90d5",
  grass: "#63bb5b",
  electric: "#f3d23b",
  psychic: "#f97176",
  ice: "#74cec0",
  dragon: "#096dc4",
  dark: "#5a5366",
  fairy: "#ec8fe6",
};

export const pokemonTypes: string[] = [
  "Normal",
  "Fighting",
  "Flying",
  "Poison",
  "Ground",
  "Rock",
  "Bug",
  "Ghost",
  "Steel",
  "Fire",
  "Water",
  "Grass",
  "Electric",
  "Psychic",
  "Ice",
  "Dragon",
  "Dark",
  "Fairy",
];

export const generations = [
  {
    generation: 1,
    count: 151,
    start: 1,
    offset: 0,
  },
  {
    generation: 2,
    count: 100,
    start: 152,
    offset: 151,
  },
  {
    generation: 3,
    count: 135,
    start: 252,
    offset: 251,
  },
  {
    generation: 4,
    count: 107,
    start: 387,
    offset: 386,
  },
  {
    generation: 5,
    count: 156,
    start: 494,
    offset: 493,
  },
  {
    generation: 6,
    count: 72,
    start: 650,
    offset: 649,
  },
  {
    generation: 7,
    count: 88,
    start: 722,
    offset: 721,
  },
  {
    generation: 8,
    count: 96,
    start: 810,
    offset: 809,
  },
];
