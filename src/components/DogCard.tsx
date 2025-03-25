
import CardMedia from '@mui/material/CardMedia';
import  {Card, CardContent, IconButton, Typography, List, ListItem}  from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Dog } from "../services/api";

interface DogCardProps {
    dog: Dog;
    isFavorite: boolean;
    onFavorite: (dogId: string) => void;
}

function DogCard({ dog, isFavorite, onFavorite }: DogCardProps) {
   
   
    return (
        <Card id={dog.id} sx={{ width: 400, height: 'auto'}}>
            <CardMedia component='img' height={250} image={dog.img} title={`${dog.name} - ${dog.breed}`} sx={{objectFit: 'cover'}} />
            <CardContent >
                <Typography variant="h5" component="div" sx={{textAlign: 'center'}}>
                    {dog.name}
                </Typography>
                <List>
                    <ListItem>
                    Breed: {dog.breed}
                    </ListItem>
                    <ListItem>
                    Age: {dog.age} years old
                    </ListItem>
                    <ListItem>
                    Zip Code: {dog.zip_code}
                    </ListItem>
                </List>
                
                <IconButton aria-label="add to favorites"  sx={{display: 'flex', justifyContent: 'flex-start', '&:hover': {backgroundColor: 'white'}}} onClick={() => onFavorite(dog.id)} >
                    {isFavorite ? <FavoriteIcon sx={{color: '#f8656b'}} /> : <FavoriteBorderIcon sx={{color: '#f8656b'}} />}
                    
                </IconButton>
            </CardContent>  
        </Card>
    )
}
export default DogCard;


