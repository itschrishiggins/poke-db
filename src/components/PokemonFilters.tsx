import React from "react";
import { Stack } from "@mui/material";
import SearchBox from "./PokemonFilters/SearchBox";
import GenerationDropdown from "./PokemonFilters/GenerationDropdown";
import TypeDropdown from "./PokemonFilters/TypeDropdown";
import SortDropdown from "./PokemonFilters/SortDropdown";
import type { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  searchItem: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedType: string;
  onTypeChange: (e: SelectChangeEvent) => void;
  selectedGeneration: string;
  onGenerationChange: (e: SelectChangeEvent) => void;
  selectedSort: string;
  onSortChange: (e: SelectChangeEvent) => void;
}

export default function PokemonFilters({
  searchItem,
  handleSearchChange,
  selectedType,
  onTypeChange,
  selectedGeneration,
  onGenerationChange,
  selectedSort,
  onSortChange,
}: Props) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{ mb: 4 }}
      alignItems="stretch"
    >
      <SearchBox value={searchItem} onChange={handleSearchChange} />
      <GenerationDropdown
        selectedGeneration={selectedGeneration}
        onGenerationChange={onGenerationChange}
      />
      <TypeDropdown selectedType={selectedType} onTypeChange={onTypeChange} />
      <SortDropdown selectedSort={selectedSort} onSortChange={onSortChange} />
    </Stack>
  );
}
