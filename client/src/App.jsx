import React from "react";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import Form from "./components/Form/Form";
import "./App.css"


function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="content">
          {/* Rest of your content goes here */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create/:userId" element={<Form />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
