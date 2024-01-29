
import React, { useState, useContext } from "react";
import { TextField, Button } from "@mui/material";
import ShowsContext from "../context/shows/showsContext";
import AlertsContext from "../context/alerts/alertsContext";
import Alert from "./Alert";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const showsContext = useContext(ShowsContext);
  const { searchShows } = showsContext;

  const { alert, setAlert } = useContext(AlertsContext);

  const onSearchHandler = (e) => {
    e.preventDefault();

    if (searchTerm === "") {
      setAlert("Please enter something", "danger");
    } else {
      searchShows(searchTerm);
    }
  };

  return (
    <div className="mt-2">
      {alert ? <Alert message={alert.message} type={alert.type} /> : null}
      <form className="searchbar__form" onSubmit={onSearchHandler}>
        <TextField
          type="text"
          label="Search For Tv Show"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginTop: '10px' }}

        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: '8px', marginBottom:'10px'}}
        >
          SEARCH
        </Button>
      </form>
    </div>
  );
};

export default Searchbar;

