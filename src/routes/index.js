import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ShowPage from "../components/pages/ShowPage";
import Singlepage from '../components/pages/Singlepage';
import Navbar from '../components/Navbar';
import SignupPage from '../components/pages/SignupPage';
import Login from '../components/pages/LoginPage'
import PrivateRoute from './privateRoutes'; // Import the PrivateRoute component
import Favorite  from '../components/pages/Favorite';

function index() {
  return (
    <BrowserRouter>
          <Navbar />

     <div className="container">
      <Routes>
        
          <Route path="/register" element={<SignupPage/>} />
          <Route path="/login" element={<Login/>} />

          <Route path="/" element={<PrivateRoute />}>

<Route  path="/" element={<ShowPage/>} />
<Route  path="/favorite" element={<Favorite/>} />

          <Route path="/singleshow/:id" element={<Singlepage/>} />
</Route>
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default index