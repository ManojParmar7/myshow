/*eslint-disable */
import React, { useContext, useEffect, useState } from "react";
import { Container, Grid, Typography, Pagination, Card, CardMedia, CardContent, Rating, PaginationItem, Box, Button } from "@mui/material";
import ShowsContext from "../../context/shows/showsContext";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';

const FavoritePage = () => {
  const showsContext = useContext(ShowsContext);
  const { loading, favorite, removeFromFavorites ,auth} = showsContext;

  const [currentPage, setCurrentPage] = useState(1);
  const showsPerPage = 10;

  const indexOfLastShow = currentPage * showsPerPage;
  const indexOfFirstShow = indexOfLastShow - showsPerPage;
  const currentShows = favorite && favorite.slice(indexOfFirstShow, indexOfLastShow);

  useEffect(() => {
    localStorage.setItem('favorite', JSON.stringify(favorite));
  }, [favorite]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleToggleFavorite = (item) => {
    removeFromFavorites(item.id);
    toast.error("Removed from Favorites!");
  };

  return (
    <>
      <Container sx={{ maxWidth: 'lg', paddingTop: 4, paddingBottom: 4 }}>
        <Typography variant="h4" gutterBottom>
          Favorite Shows
        </Typography>
        {loading ? (
          <Loader />
        ) : (
          <Box>
            {currentShows && currentShows.length == 0 ? (
              <Typography variant="h6" align="center" color="textSecondary" gutterBottom>
                No favorite shows found.
              </Typography>
            ) : (
              <Grid container spacing={3}>
                {currentShows && currentShows.map((item) => (
                  item && item.userId == auth.id ? (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                      <Card className="show-card">
                        <Link to={`/singleshow/${item.id}`} className="listitem">
                          <CardMedia component="img" height="140" image={item.image} alt={item.name} />
                        </Link>

                        <CardContent>
                          <Typography variant="h6">{item.name}</Typography>
                          <Rating name={`rating-${item.id}`} value={item.rating / 2} max={10} precision={0.5} readOnly />
                        </CardContent>

                        <Button
  variant="contained"
  color="error"
  type="submit"
  className="error-button"  // Use the class name from the CSS file
  onClick={() => handleToggleFavorite(item)}
  startIcon={<DeleteIcon />}
>
  Remove
</Button>
                      </Card>
                    </Grid>
                  ) : ""
                ))}
              </Grid>
            )}
            <Pagination
              count={Math.ceil(currentShows && currentShows.length / showsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              renderItem={(item) => <PaginationItem component="div" {...item} />}
              sx={{
                justifyContent: 'center',
                marginTop: 2,
                marginBottom: 4,
              }}
            />
          </Box>
        )}
      </Container>
    </>
  );
};

export default FavoritePage;
