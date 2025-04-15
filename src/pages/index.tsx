import { useEffect, useState } from "react";
import type { Pokemon } from "@/types/pokemon";
import type { SelectChangeEvent } from "@mui/material/Select";
import { generations } from "@/types/constants";
import PokemonFilters from "@/components/PokemonFilters";
import PokemonCard from "@/components/PokemonCard";
import NavBar from "@/components/NavBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";

export default function HomePage() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchItem, setSearchItem] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedGeneration, setSelectedGeneration] = useState("1");
  const [selectedSort, setSelectedSort] = useState("idAsc");
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({ palette: { mode: darkMode ? "dark" : "light" } });

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

  const getGenerationInfo = () => {
    const genNumber = parseInt(selectedGeneration);
    return generations.find((g) => g.generation === genNumber);
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        let limit: number, offset: number;
        if (selectedGeneration === "All Generations") {
          limit = 905;
          offset = 0;
        } else {
          const genInfo = getGenerationInfo();
          limit = genInfo ? genInfo.count : 151;
          offset = genInfo ? genInfo.offset : 0;
        }

        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        const data = await res.json();

        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon: { name: string; url: string }) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();

            const speciesRes = await fetch(
              `https://pokeapi.co/api/v2/pokemon-species/${details.id}`
            );
            const speciesData = await speciesRes.json();

            const englishName = speciesData.names.find(
              (n: { language: { name: string }; name: string }) =>
                n.language.name === "en"
            );

            return {
              id: details.id,
              name: englishName?.name || details.name,
              rawName: details.name,
              image: details.sprites.other.showdown.front_default,
              types: details.types.map(
                (t: { slot: number; type: { name: string; url: string } }) =>
                  t.type.name
              ),
            } as Pokemon;
          })
        );

        setPokemonList(detailedPokemon);
      } catch (err) {
        console.error("Failed to fetch Pokémon", err);
      }
    };

    fetchPokemon();
  }, [selectedGeneration]);

  let filteredList = pokemonList.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(searchItem.toLowerCase());
    const matchesType = selectedType
      ? pokemon.types.some(
          (type) => type.toLowerCase() === selectedType.toLowerCase()
        )
      : true;
    return matchesSearch && matchesType;
  });

  filteredList = filteredList.sort((a, b) => {
    switch (selectedSort) {
      case "idAsc":
        return a.id - b.id;
      case "idDesc":
        return b.id - a.id;
      case "nameAsc":
        return a.name.localeCompare(b.name);
      case "nameDesc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <>
      <Head>
        <title>PokéDB – Homepage</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          className={
            darkMode
              ? "dark bg-gray-900 text-white min-h-screen"
              : "bg-white text-black min-h-screen"
          }
        >
          <NavBar
            elColour="#f87171"
            showBackButton={false}
            darkMode={darkMode}
            toggleDarkMode={toggleDark}
          />

          <div className="p-6">
            <PokemonFilters
              searchItem={searchItem}
              handleSearchChange={(e) => setSearchItem(e.target.value)}
              selectedType={selectedType}
              onTypeChange={(e: SelectChangeEvent) =>
                setSelectedType(e.target.value)
              }
              selectedGeneration={selectedGeneration}
              onGenerationChange={(e: SelectChangeEvent) =>
                setSelectedGeneration(e.target.value)
              }
              selectedSort={selectedSort}
              onSortChange={(e: SelectChangeEvent) =>
                setSelectedSort(e.target.value)
              }
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-6 px-3">
              {filteredList.map((pokemon) => (
                <PokemonCard
                  key={pokemon.name}
                  pokemon={pokemon}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
