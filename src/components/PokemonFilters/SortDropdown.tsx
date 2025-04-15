import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

interface SortDropdownProps {
  selectedSort: string;
  onSortChange: (e: SelectChangeEvent) => void;
}

export default function SortDropdown({
  selectedSort,
  onSortChange,
}: SortDropdownProps) {
  return (
    <FormControl fullWidth>
      <InputLabel id="sort-dropdown-label">Sort By</InputLabel>
      <Select
        labelId="sort-dropdown-label"
        value={selectedSort}
        label="Sort By"
        onChange={onSortChange}
      >
        <MenuItem value="idAsc">ID (Ascending)</MenuItem>
        <MenuItem value="idDesc">ID (Descending)</MenuItem>
        <MenuItem value="nameAsc">Name (A - Z)</MenuItem>
        <MenuItem value="nameDesc">Name (Z - A)</MenuItem>
      </Select>
    </FormControl>
  );
}
