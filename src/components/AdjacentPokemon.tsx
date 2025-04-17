import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function AdjacentPokemon({
  id,
  direction,
}: {
  id: number;
  direction: "prev" | "next";
}) {
  const [data, setData] = useState<{
    displayName: string;
    name: string;
    sprite: string | null;
  } | null>(null);

  const isPrev = direction === "prev";
  const targetId = isPrev ? id - 1 : id + 1;

  useEffect(() => {
    if ((isPrev && id <= 1) || (!isPrev && id >= 905)) return;

    (async () => {
      try {
        const [species, pokemon] = await Promise.all([
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${targetId}`).then(
            (res) => res.json()
          ),
          fetch(`https://pokeapi.co/api/v2/pokemon/${targetId}`).then((res) =>
            res.json()
          ),
        ]);

        setData({
          displayName:
            species.names.find(
              (c: { language: { name: string }; name: string }) =>
                c.language.name === "en"
            )?.name ?? pokemon.name,
          name: pokemon.name,
          sprite:
            pokemon.sprites.versions["generation-viii"].icons.front_default ||
            null,
        });
      } catch {
        setData(null);
      }
    })();
  }, [id, direction]);

  if (!data) return null;

  return (
    <Link
      href={`/pokemon/${targetId}`}
      className="flex items-end justify-center mt-4 rounded-full transition-all space-x-4"
    >
      {isPrev && <span className="text-2xl text-gray-500">‹</span>}

      <div className="flex items-end space-x-3">
        {data.sprite && (
          <img
            src={data.sprite}
            alt={data.displayName}
            className="w-auto object-contain"
          />
        )}
        <span className="font-bold text-gray-800">{data.displayName}</span>
        <span className="text-sm text-gray-500">#{targetId}</span>
      </div>

      {!isPrev && <span className="text-2xl text-gray-500">›</span>}
    </Link>
  );
}
