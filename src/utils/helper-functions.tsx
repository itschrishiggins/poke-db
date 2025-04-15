export const getTypeIconSrc = (type: string) =>
  `/images/types-icons/${type}.svg`;

export function getStatName(statName: string) {
  switch (statName) {
    case "hp":
      return "HP";
    case "attack":
      return "Attack";
    case "defense":
      return "Defense";
    case "special-attack":
      return "Sp. Atk";
    case "special-defense":
      return "Sp. Defense";
    case "speed":
      return "Speed";
    default:
      return statName;
  }
}
