import { useEffect, useState } from "react";
import  {api, Dog, SearchDogsResponse } from "../services/api";
import { Box, Button, Stack, Typography } from "@mui/material";
import DogCard from "../components/DogCard";

import FilterAndSortBar from "../components/FilterAndSortBar";
import NavBar from "../components/NavBar";
import MatchDog from "../components/MatchDog";

const DogListPage = () => {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [searchResponse, setSearchResponse] = useState<SearchDogsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [, setBreeds] = useState<string[]>([]);
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [favoriteDogs, setFavoriteDogs] = useState<string[]>([]);

    useEffect(() => {
        const fetchBreeds = async () => {
          try {
            const breedsList = await api.getDogBreeds();
            setBreeds(breedsList);
          } catch (err) {
            setError("Failed to load dog breeds");
          }
        };
        
        fetchBreeds();
      }, []);

    useEffect(() => {
        const fetchDogs = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const searchResult = await api.searchDogs({
                    breeds: selectedBreeds.length > 0 ? selectedBreeds : undefined,
                    sort: `breed:${sortOrder}`,
            });
            setSearchResponse(searchResult);
     // Get details for each dog
     if (searchResult.resultIds.length > 0) {
        const dogDetails = await api.getDogs(searchResult.resultIds);
        setDogs(dogDetails);
      } else {
        setDogs([]);
      }
    } catch (err) {
      setError("Failed to load dogs");
    } finally {
      setIsLoading(false);
    }
  };
  
  fetchDogs();
}, [selectedBreeds, sortOrder]);

const handleBreedChange = (breeds: string[]) => {
    setSelectedBreeds(breeds)
  };

const handleSortChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
  };

  const loadNextPage = async () => {
    if (searchResponse?.next) {
      setIsLoading(true);
      try {
        const nextPage = await api.fetchNextPage(searchResponse.next);
        setSearchResponse(nextPage);
        const dogDetails = await api.getDogs(nextPage.resultIds);
        setDogs(dogDetails);
      } catch (err) {
        setError("Failed to load next page");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFavorite = (dogId: string) => {
    setFavoriteDogs(prev => prev.includes(dogId) ? prev.filter(id => id !== dogId) : [...prev, dogId]);
  };

  

    return (
        <Box sx={{backgroundColor: '#f8f0e5'}}>
            <NavBar />
            <Typography variant="h4" sx={{margin: 4, color: '#335368'}}>Available Dogs</Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6}}>
            {/* Filter by breed: */}
               
                <FilterAndSortBar handleBreedChange={handleBreedChange} handleSortChange={handleSortChange} />
                {/* get matched with a dog */}
                <MatchDog favoriteDogs={favoriteDogs} />
            </Box>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {/* Dog list */}
            <Stack spacing={2} direction={"row"} useFlexGap sx={{flexWrap: 'wrap', justifyContent: 'center'}}>
            {dogs.map((dog) => (
                <DogCard key={dog.id} dog={dog} isFavorite={favoriteDogs.includes(dog.id)} onFavorite={handleFavorite} />
            ))}
            </Stack>
            {/* Pagination */}
            {searchResponse && (
                <div>
                    <Box sx={{margin: 4}}>Showing {dogs.length} of {searchResponse.total} results</Box>
                    <Button disabled={!searchResponse.prev} onClick={() => searchResponse.prev && api.fetchPrevPage(searchResponse.prev)}>Previous</Button>
                    <Button disabled={!searchResponse.next} onClick={loadNextPage}>Next</Button>
                    </div>
            )}
        </Box>
    );
}
export default DogListPage;