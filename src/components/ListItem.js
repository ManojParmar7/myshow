import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {Grid, Card, CardMedia, CardContent, Typography, IconButton, Rating } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { toast } from 'react-toastify';
import ShowsContext from "../context/shows/showsContext";

const ListItem = ({ image, name, rating, id }) => {
  const { addToFavorites, removeFromFavorites, favorite ,auth} = useContext(ShowsContext);


  const handleToggleFavorite = () => {
    const updatedFavorites = favorite.filter((show) => show.id !== id || show.userId !== auth.id);
  
    if (updatedFavorites.length === favorite.length) {
      // If the length is the same, it means the show wasn't in favorites, so we add it
      const newShow = {
        id: id,
        userId: auth.id,
        name: name,
        image: image,
        rating: rating,
      };
      addToFavorites(newShow);
      toast.success("Added to Favorites!");
    } else {
      // If the length is different, it means the show was in favorites, so we update the favorites list
      removeFromFavorites(id);
      toast.error("Removed from Favorites!");
    }
  };
  

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className="show-card">
        <Link to={`/singleshow/${id}`} className="listitem">
          <CardMedia component="img" height="140" image={image} alt={name} />
        </Link>

        <CardContent>
          <Typography variant="h6">{name}</Typography>
          <Rating name={`rating-${id}`} value={rating / 2} max={10} precision={0.5} readOnly />
          <IconButton onClick={handleToggleFavorite} aria-label="add to favorites">
            <Favorite />
          </IconButton>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ListItem;

