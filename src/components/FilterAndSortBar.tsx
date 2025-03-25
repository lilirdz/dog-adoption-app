import  { useState } from "react";
import { Typography,  FormControl, InputLabel, Select, MenuItem, Stack, SelectChangeEvent } from "@mui/material";
import { useDogsData } from "../hooks/useFetchDogData";



interface FilterAndSortBarProps {
  handleBreedChange: (breeds: string[]) => void;
  handleSortChange: (sortOrder: 'asc' | 'desc') => void;
}


const FilterAndSortBar = ({handleBreedChange, handleSortChange}: FilterAndSortBarProps) => {

    const dogsData = useDogsData();
    const { dogs: breeds, loading } = dogsData;

  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const onBreedChange = (event: SelectChangeEvent<string[]>) => {
    const newSelectedBreeds = event.target.value as string[];
    setSelectedBreeds(newSelectedBreeds);
    handleBreedChange(newSelectedBreeds);
  };

 const onSortChange = (event: SelectChangeEvent<string>) => {
  const newSortOrder = event.target.value as 'asc' | 'desc';
  setSortOrder(newSortOrder);
  handleSortChange(newSortOrder);
};

    if (loading) {
        return <div>Loading...</div>;
    };
    
  return (
    <Stack direction="row" spacing={12} sx={{justifyContent: 'center', marginBottom: 6, color: '#335368'}}>
      <Stack direction="column" spacing={2}>
        <Typography variant="h6">Filter by Breed</Typography>
        
        <FormControl sx={{ m: 1, width: 150, backgroundColor: 'white' }}>
          <InputLabel id="breed">Breeds</InputLabel>
          <Select id="breed-select" onChange={onBreedChange} value={selectedBreeds}  label="Breed" >
            {breeds.map((breed) => (
                <MenuItem value={breed}>{breed}</MenuItem>
            ))}
          </Select>
        </FormControl>
        </Stack>
        <Stack direction="column" spacing={2}>
        <Typography variant="h6">Sort by Order</Typography>
        
        <FormControl sx={{ m: 1, width: 150, backgroundColor: 'white' }}>
          <InputLabel id="sort">Sort</InputLabel>
          <Select id="sort-select" labelId="sort-select-label" value={sortOrder} onChange={onSortChange} label="Sort">
            <MenuItem value="asc" >Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
}

export default FilterAndSortBar;