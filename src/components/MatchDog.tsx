import {useState} from 'react';
import { Box, Button, Modal, Typography } from "@mui/material";
import { api, Dog } from '../services/api';
import DogCard from './DogCard';

interface MatchDogProps {
  favoriteDogs: string[];
}
const MatchDog = ({favoriteDogs}: MatchDogProps) => {
  const [open, setOpen] = useState(false);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);

  const handleOpen = async () => {
    try {
      const matchResult = await api.postDogMatch(favoriteDogs);
      const [matchedDogDetails] = await api.getDogs([matchResult.match]);
      setMatchedDog(matchedDogDetails);
      setOpen(true);
    } catch (err) {
      console.error('Failed to match dog', err);
    }
  }
  const handleClose = () => {
    setOpen(false);
    setMatchedDog(null);
  }
  return (
    <div>
      
      <Button sx={{backgroundColor: '#33a7c0', color: 'white', padding: 2}} onClick={() => handleOpen()}>Match me!</Button>
      <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
        sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, backgroundColor: '#d4ddce', p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', overlay: 'none'}}
        
        >
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center'}}>
          {favoriteDogs.length === 0 && (
            <Typography id="modal-modal-description" sx={{color: '##335368'}}>You need to favorite some dogs first!</Typography>
          )}
          {matchedDog && (
            <>
          <Typography variant='h5' id="modal-modal-description" sx={{color:'#335368'}}>Congratulations! You have matched with {matchedDog.name}!</Typography>
          <DogCard dog={matchedDog} isFavorite={true} onFavorite={() => {}} />
          <Button onClick={() => handleClose()}>Close</Button>
          </>
          )}
          </Box>
          </Box>
      </Modal>
    </div>
  );
}

export default MatchDog;