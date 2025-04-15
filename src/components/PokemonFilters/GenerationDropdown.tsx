import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { generations } from "@/types/constants";

interface GenerationDropdownProps {
  selectedGeneration: string;
  onGenerationChange: (e: SelectChangeEvent) => void;
}

const GenerationDropdown: React.FC<GenerationDropdownProps> = ({
  selectedGeneration,
  onGenerationChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="generation-select-label">Generation</InputLabel>
      <Select
        labelId="generation-select-label"
        id="generation-select"
        value={selectedGeneration}
        label="Generation"
        onChange={onGenerationChange}
      >
        <MenuItem value="All Generations">All Generations</MenuItem>
        {generations.map((gen) => (
          <MenuItem key={gen.generation} value={gen.generation.toString()}>
            {`Gen ${gen.generation} (${gen.start} - ${
              gen.start + gen.count - 1
            })`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GenerationDropdown;
