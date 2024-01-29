/*eslint-disable */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Card, CardMedia, CardContent, Typography, IconButton, Rating } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import {  toast } from 'react-toastify';

const ListItem = ({ image, name, rating, id }) => {
  const authId = JSON.parse(localStorage.getItem("auth")) || [];
  const handleToggleFavorite = () => {
    const favorite = JSON.parse(localStorage.getItem("favorite")) || [];
    const existFev = favorite.findIndex((show) => show.id === id);

    if (existFev !== -1) {
      favorite.splice(existFev, 1);
      toast.error("Removed from Favorites!");

    } else {

      const newShow = {
        id: id,
        userId: authId.id,
        name: name,
        image: image,
        rating: rating,
      };

      favorite.push(newShow);
      toast.success("Add to Favorites!");

    }

    localStorage.setItem('favorite', JSON.stringify(favorite));
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
