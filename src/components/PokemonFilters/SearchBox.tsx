import React from "react";
import TextField from "@mui/material/TextField";

interface SearchBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange }) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      placeholder="Search by Pokémon name..."
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchBox;
