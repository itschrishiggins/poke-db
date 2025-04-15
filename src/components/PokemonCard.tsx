import Link from "next/link";
import type { Pokemon } from "@/types/pokemon";
import { getTypeIconSrc } from "@/utils/helper-functions";
import { typeStyles } from "@/types/constants";

interface Props {
  pokemon: Pokemon;
  darkMode?: boolean;
}

export default function PokemonCard({ pokemon, darkMode = false }: Props) {
  const idString = pokemon.id.toString().padStart(3, "0");
  const cardClass = darkMode
    ? "bg-gray-800 text-white border border-gray-700"
    : "bg-white text-black shadow";

  return (
    <div
      className={`card w-full h-70 rounded-lg flex justify-center items-center ${cardClass}`}
    >
      <div className="flex flex-col justify-between items-center h-full w-full">
        <div className="id-container">
          <div className="text-sm font-medium mt-2">#{idString}</div>
        </div>
        <div className="image-container">
          <Link href={`/pokemon/${pokemon.id}`}>
            <img src={pokemon.image} alt={pokemon.name} />
          </Link>
        </div>
        <div className="details-container">
          <div className="text-xl font-bold text-center mb-2">
            <Link href={`/pokemon/${pokemon.id}`}>{pokemon.name}</Link>
          </div>
          <div className="flex">
            <div className="types flex flex-row items-center">
              {pokemon.types.map((type, idx) => {
                const typeImg = getTypeIconSrc(type);
                return (
                  <div
                    key={idx}
                    className="flex flex-row items-center justify-center
                               text-white text-xs font-medium 
                               rounded-sm w-24 p-0.5 mx-0.5 mb-3"
                    style={{ backgroundColor: typeStyles[type.toLowerCase()] }}
                  >
                    <img src={typeImg} alt={type} className="w-3 h-3 mr-1" />
                    <span>{type.toUpperCase()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
