"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { PokemonDetails as PokemonDetailsType } from "@/types/pokemon";
import ClientNavBar from "@/components/ClientNavBar";
import PokemonDetails from "@/components/PokemonDetails";
import { preferredVersions } from "@/utils/constants";
import Head from "next/head";

export default function PokemonDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [pokemon, setPokemon] = useState<PokemonDetailsType | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored) setDarkMode(stored === "true");
  }, []);

  const toggleDark = () => {
    setDarkMode((prev) => {
      localStorage.setItem("darkMode", (!prev).toString());
      return !prev;
    });
  };

  useEffect(() => {
    if (!id || isNaN(Number(id))) return;

    const fetchDetails = async () => {
      try {
        const [pokemonRes, speciesRes] = await Promise.all([
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
        ]);

        if (!pokemonRes.ok || !speciesRes.ok) {
          throw new Error("Failed to fetch Pokémon data");
        }

        const pokemonData = await pokemonRes.json();
        const speciesData = await speciesRes.json();

        const genus = speciesData?.genera?.find(
          (entry: { language: { name: string }; genus: string }) =>
            entry.language.name === "en"
        )?.genus;

        const flavor = speciesData?.flavor_text_entries?.find(
          (entry: {
            language: { name: string };
            version: { name: string };
            flavor_text: string;
          }) =>
            entry.language.name === "en" &&
            preferredVersions.includes(entry.version.name)
        )?.flavor_text;

        const nameEn = speciesData?.names?.find(
          (entry: { language: { name: string }; name: string }) =>
            entry.language.name === "en"
        )?.name;

        const abilityRes = await fetch(pokemonData.abilities[0].ability.url);
        const abilityData = await abilityRes.json();
        const abilityFlavor = abilityData.flavor_text_entries?.find(
          (entry: { language: { name: string }; flavor_text: string }) =>
            entry.language.name === "en"
        )?.flavor_text;

        const result: PokemonDetailsType = {
          id: pokemonData.id,
          name: nameEn,
          rawName: pokemonData.name,
          image: pokemonData.sprites.other["official-artwork"].front_default,
          types: pokemonData.types,
          height: pokemonData.height,
          weight: pokemonData.weight,
          abilities: pokemonData.abilities,
          stats: pokemonData.stats,
          sprites: pokemonData.sprites,
          flavor_text: flavor,
          genus,
          abilityFlavor,
        };

        setPokemon(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!pokemon) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <Head>
        <title>{pokemon.name} – PokéDB</title>
      </Head>

      <div
        className={
          darkMode
            ? "dark bg-gray-900 text-white min-h-screen flex flex-col"
            : "bg-[#f7f8fc] text-black min-h-screen flex flex-col"
        }
      >
        <ClientNavBar
          src={pokemon.image}
          darkMode={darkMode}
          toggleDarkMode={toggleDark}
        />

        <div className="flex-1 flex flex-col items-center justify-center">
          <PokemonDetails pokemon={pokemon} darkMode={darkMode} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
