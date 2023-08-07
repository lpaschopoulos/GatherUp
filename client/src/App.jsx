import React, { useState } from 'react';
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import Form from "./components/Form/Form";
import Account from "./components/Account/Account"
import UserContext from './Context/context';
import "./App.css"


function App() {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
});

  return (
    <UserContext.Provider value={{ user: loggedInUser, setUser: setLoggedInUser }}>

    <Router>
      <div className="App">
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/account/:userId" element={<Account />} />
            <Route path="/create/:userId" element={<Form />} />
            <Route path="/edit-event/:eventId" element={<Form />} />
          </Routes>
        </div>
      </div>
    </Router>
    </UserContext.Provider>

  );
}


export default App;
