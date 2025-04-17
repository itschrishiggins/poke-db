"use client";

import React from "react";
import type { PokemonDetails } from "@/types/pokemon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import AdjacentPokemon from "@/components/AdjacentPokemon";
import { getTypeIconSrc } from "@/utils/helper-functions";
import { typeStyles } from "@/types/constants";
import StatsChart from "@/components/StatsChart";
import { useDominantColour } from "@/hooks/useDominantColour";

export default function PokemonDetailsComponent({
  pokemon,
  darkMode,
}: {
  pokemon: PokemonDetails;
  darkMode: boolean;
}) {
  const [elColour, imgRef] = useDominantColour(
    pokemon.sprites.other["official-artwork"].front_default
  );

  const totalStats = pokemon.stats.reduce(
    (acc, stat) => acc + stat.base_stat,
    0
  );

  return (
    <>
      <div className="mx-auto flex items-center max-w-7xl px-6 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-8">
        {/* Left column */}
        <div className="order-2 md:order-1 flex flex-col justify-between gap-6 mt-12">
          <div className="space-y-6">
            {/* About */}
            <div className="w-full px-4">
              <h2 className="text-xl font-semibold mb-1 text-center">About</h2>
              <p
                className={`text-center p-2 rounded-md ${
                  darkMode
                    ? "bg-gray-700 text-gray-200"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {pokemon.flavor_text}
              </p>
            </div>

            {/* Height & Weight */}
            <div className="flex flex-row">
              <div className="w-1/2 px-4">
                <h2 className="text-xl font-semibold mb-1 text-center">
                  Height
                </h2>
                <div
                  className={`text-center p-2 rounded-md ${
                    darkMode
                      ? "bg-gray-700 text-gray-200"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {(pokemon.height / 10).toFixed(1)}m
                </div>
              </div>
              <div className="w-1/2 px-4">
                <h2 className="text-xl font-semibold mb-1 text-center">
                  Weight
                </h2>
                <div
                  className={`text-center p-2 rounded-md ${
                    darkMode
                      ? "bg-gray-700 text-gray-200"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {(pokemon.weight / 10).toFixed(1)}kg
                </div>
              </div>
            </div>

            {/* Abilities */}
            <div className="w-full px-4">
              <h2 className="text-xl font-semibold mb-2 text-center">
                Abilities
              </h2>
              <div className="flex flex-wrap gap-2 justify-center">
                {pokemon.abilities.map((a, idx) => {
                  const ability = a as {
                    ability: { name: string };
                    is_hidden?: boolean;
                  };

                  return (
                    <div
                      key={idx}
                      className={`flex items-center border px-3 py-1 rounded-full capitalize ${
                        darkMode
                          ? "border-gray-400 text-gray-200"
                          : "border-gray-300 text-gray-700"
                      }`}
                    >
                      <span>{ability.ability.name}</span>
                      {ability.is_hidden && (
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          className="ml-2 text-blue-500"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Centre column */}
        <div className="order-1 md:order-2 h-screen sm:h-full flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center aspect-square w-full max-w-sm">
            <div
              className={`absolute inset-0 bg-no-repeat bg-center bg-contain mix-blend-multiply  ${
                darkMode ? "opacity-25" : "opacity-10"
              }`}
              style={{
                backgroundImage: "url('/images/pokeball-transparent.svg')",
              }}
            />
            <img
              ref={imgRef}
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="relative w-full h-full object-contain z-10"
              crossOrigin="anonymous"
            />
          </div>
          <div className="text-center mt-4">
            <div className="text-gray-500 text-xl">
              #{pokemon.id.toString().padStart(3, "0")}
            </div>
            <div className="text-4xl font-bold">{pokemon.name}</div>
            <div className="text-xl text-gray-600">{pokemon.genus}</div>
            <div className="w-full mt-2 px-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {pokemon.types.map((t, idx) => {
                  const name = t.type.name;
                  const typeImg = getTypeIconSrc(name);
                  return (
                    <div
                      key={idx}
                      className="flex items-center text-white font-medium 
                                 rounded-md p-1 px-2"
                      style={{
                        backgroundColor: typeStyles[name.toLowerCase()],
                      }}
                    >
                      <img src={typeImg} alt={name} className="w-4 h-4 mr-2" />
                      <span className="uppercase">{name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="order-3 flex flex-col justify-between gap-6 mt-12">
          <div>
            <h2 className="text-center text-xl font-semibold">Base Stats</h2>
            <StatsChart
              stats={pokemon.stats}
              elColour={elColour}
              darkMode={darkMode}
            />
            <div
              className={`text-center mt-3 p-2 rounded-md font-medium ${
                darkMode
                  ? "bg-gray-700 text-gray-200"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Total: {totalStats}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="w-full flex justify-center items-end gap-2 sm:gap-8 flex-nowrap px-2 sm:px-6 pb-6 mt-8 overflow-x-auto">
        {pokemon.id > 1 && <AdjacentPokemon id={pokemon.id} direction="prev" />}

        {pokemon.id > 1 && pokemon.id < 905 && (
          <span className="text-gray-400 text-lg font-semibold">|</span>
        )}

        {pokemon.id < 905 && (
          <AdjacentPokemon id={pokemon.id} direction="next" />
        )}
      </div>
    </>
  );
}
