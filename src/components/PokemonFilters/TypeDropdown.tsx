import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { pokemonTypes } from "@/types/constants";

interface TypeDropdownProps {
  selectedType: string;
  onTypeChange: (e: SelectChangeEvent) => void;
}

const TypeDropdown: React.FC<TypeDropdownProps> = ({
  selectedType,
  onTypeChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="typeSelectIDLabel">Type</InputLabel>
      <Select
        labelId="typeSelectIDLabel"
        id="typeSelectID"
        value={selectedType}
        label="Select type"
        onChange={onTypeChange}
      >
        {pokemonTypes.map((pokemonType) => (
          <MenuItem key={pokemonType} value={pokemonType}>
            {pokemonType}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TypeDropdown;
