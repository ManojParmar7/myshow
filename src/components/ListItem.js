import React, { useContext,useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, Rating } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { toast } from 'react-toastify';
import ShowsContext from "../context/shows/showsContext";

const ListItem = ({ image, name, rating, id }) => {
  const { addToFavorites, removeFromFavorites, favorite, auth } = useContext(ShowsContext);

  const isFavorite = favorite.some((show) => show.id === id && show.userId === auth.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(id);
      toast.error("Removed from Favorites!");
    } else {
      const newShow = {
        id: id,
        userId: auth.id,
        name: name,
        image: image,
        rating: rating,
      };
      addToFavorites(newShow);
      toast.success("Added to Favorites!");
    }
  };
  useEffect(() => {    localStorage.setItem('favorite', JSON.stringify(favorite));
}, [favorite, auth]);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className="show-card">
        <Link to={`/singleshow/${id}`} className="listitem">
          <CardMedia component="img" height="140" image={image} alt={name} />
        </Link>

        <CardContent>
          <Typography variant="h6">{name}</Typography>
          <Rating name={`rating-${id}`} value={rating / 2} max={10} precision={0.5} readOnly />
          <IconButton onClick={handleToggleFavorite} aria-label="add to favorites" color={isFavorite ? "error" : "default"}>
            <Favorite />
          </IconButton>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ListItem;
