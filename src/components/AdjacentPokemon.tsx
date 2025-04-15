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
    sprite: string;
  } | null>(null);

  const isPrev = direction === "prev";
  const targetId = isPrev ? id - 1 : id + 1;

  useEffect(() => {
    if ((isPrev && id <= 1) || (!isPrev && id >= 1025)) return;

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
            pokemon.sprites.versions["generation-viii"].icons.front_default,
        });
      } catch {
        setData(null);
      }
    })();
  }, [id, direction]);

  if (!data) return null;

  return (
    <div className="flex items-end justify-center mt-4">
      {isPrev && <span className="mr-2">&lt;</span>}
      <img src={data.sprite} alt={data.displayName} className="mx-2" />
      <span className="font-bold">
        <Link href={`/pokemon/${targetId}`}>
          {`#${targetId} ${data.displayName}`}
        </Link>
      </span>
      {!isPrev && <span className="ml-2">&gt;</span>}
    </div>
  );
}
