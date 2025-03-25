import {useState, useEffect} from 'react';
import {api} from '../services/api';

export const useDogsData = () => {
    const [dogs, setDogs] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            
            try {
                const response = await api.getDogBreeds();
                setDogs(response);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                console.error(err);
                setLoading(false);
            }
        }
        fetchData();
    }
    , [dogs]);
    return {dogs, loading, error};
}