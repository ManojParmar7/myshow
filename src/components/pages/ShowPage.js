/*eslint-desable*/
import { useContext, useEffect, useState } from "react";
import { Container, Grid, Pagination, PaginationItem, Box } from "@mui/material";
import ShowsContext from "../../context/shows/showsContext";
import Searchbar from "../../components/Searchbar";
import ListItem from "../../components/ListItem";
import Loader from "../../components/Loader";
import NoImage from "../../components/images/download.jpg"
const ShowPage = () => {
  const showsContext = useContext(ShowsContext);
  const { loading, shows, getAllShows } = showsContext;


  const [currentPage, setCurrentPage] = useState(1);
  const showsPerPage = 10;

  useEffect(() => {
    getAllShows();
    // eslint-disable-next-line
  },[]);

  const sortedShows = [...shows].sort((a, b) => {
    const nameA = a.show ? a.show.name : a.name;
    const nameB = b.show ? b.show.name : b.name;
    return nameA.localeCompare(nameB);
  });

  const indexOfLastShow = currentPage * showsPerPage;
  const indexOfFirstShow = indexOfLastShow - showsPerPage;
  const currentShows = sortedShows.slice(indexOfFirstShow, indexOfLastShow);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Container sx={{ maxWidth: 'lg', paddingTop: 4, paddingBottom: 4 }}>
        <Searchbar />
        {loading ? (
          <Loader />
        ) : (
          <Box>
            <Grid container spacing={3}>
              {currentShows.map((item) => (
                item && item.show ? (
                  <ListItem
                    key={item && item.show.id}
                    id={item && item.show.id}
                    image={
                      item && item.show.image
                        ? item && item.show.image.medium
                        : {NoImage}
                    }
                    name={item && item.show.name}
                    rating={
                      item && item.show.rating.average
                        ? item && item.show.rating.average
                        : "No rating"
                    }
                  />
                ) : (
                  <ListItem
                    key={item && item.id}
                    id={item && item.id}
                    image={
                      item && item.image
                        ? item && item.image.medium
                        : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                    }
                    name={item && item.name}
                    rating={
                      item && item.rating.average
                        ? item && item.rating.average
                        : "No rating"
                    }
                  />
                )
              ))}
            </Grid>
            <Pagination
              count={Math.ceil(sortedShows.length / showsPerPage)}
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
