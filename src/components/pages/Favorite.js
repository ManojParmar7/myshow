import { useContext, useEffect, useState } from "react";
import { Container, Grid, Pagination, Card, CardMedia, CardContent, Typography, IconButton, Rating, PaginationItem, Box } from "@mui/material";
import ShowsContext from "../../context/shows/showsContext";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import {  Button } from "@mui/material";
import {  toast } from 'react-toastify';

const ShowPage = () => {
    const authId = JSON.parse(localStorage.getItem("auth")) || [];
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorite")) || []);
const handleToggleFavorite = (item) => {

      const existFev = favorites && favorites.findIndex((show) => show.id === item.id);
    const favorite = JSON.parse(localStorage.getItem("favorite")) || [];

      if (existFev !== -1) {
        favorite && favorite.splice(existFev, 1);
      } 

      toast.error("Removed from Favorites!");
      setFavorites(localStorage.setItem('favorite',JSON.stringify(favorite))
      )
    };
    const favorite = JSON.parse(localStorage.getItem("favorite")) || [];

  const showsContext = useContext(ShowsContext);
  const { loading } = showsContext;
  const [currentPage, setCurrentPage] = useState(1);
  const showsPerPage = 10;

  

  const indexOfLastShow = currentPage * showsPerPage;
  const indexOfFirstShow = indexOfLastShow - showsPerPage;
  const currentShows = favorite.slice(indexOfFirstShow, indexOfLastShow);


useEffect(()=>{
   
},[favorites])
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
    <Container sx={{ maxWidth: 'lg', paddingTop: 4, paddingBottom: 4 }}>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          <Grid container spacing={3}>



            {currentShows && currentShows.map((item) => (

item && item.userId == authId.id ?

                <Grid item xs={12} sm={6} md={4}>
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
          color="primary"
          type="submit"
          style={{ marginTop: '8px', marginBottom:'10px'}}
          onClick={()=>handleToggleFavorite(item)}
        >
          Remove
        </Button>
        
      </Card>
    </Grid>      
    :""
    
    
    
    ))}
          </Grid>
          <Pagination
    count={Math.ceil(currentShows.length / showsPerPage)}
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

export default ShowPage;
