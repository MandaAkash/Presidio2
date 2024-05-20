import './App.css';
import React, { useState } from 'react'
import ManageProperties from './components/manageProperty'; 
import RegisterUser from './components/RegisterUser';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Buyer from './components/Buyer';
import PostProperty from './components/postProperty';

function App() {
  const [loggedIn,setLoggedIn]=useState(false)
  return (
    <div className="App" >
      <Router>
        <Routes>
          <Route path='/' element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/buyer" element={<Buyer/>} />
          <Route path="/manage" element={<ManageProperties />} />
          <Route path="/property" element={<PostProperty/>}/>
          <Route path="/register" element={<RegisterUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
