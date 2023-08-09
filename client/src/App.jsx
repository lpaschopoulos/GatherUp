import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import Form from "./components/Form/Form";
import Account from "./components/Account/Account"
import UserContext from './Context/context';
import HomePage from "./HomePage/HomePage";
import EventDetail from "./components/Details/EventDetail";
import "./App.css"


function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Call the endpoint to get user data using the token:
      axios.post("http://localhost:3636/user/verify", { token })
        .then(response => {
            console.log("User fetched from server:", response.data);
            setLoggedInUser(response.data);
        })
        .catch(err => {
            console.error("Failed to fetch user:", err);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user: loggedInUser, setUser: setLoggedInUser }}>

    <Router>
      <div className="App">
        <NavBar />
        <div className="content">
          <Routes>
          <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/account/:userId" element={<Account />} />
            <Route path="/create/:userId" element={<Form />} />
            <Route path="/edit-event/:eventId" element={<Form />} />
            <Route path="/events/:eventId" element={<EventDetail/>} />

          </Routes>
        </div>
      </div>
    </Router>
    </UserContext.Provider>

  );
}


export default App;
