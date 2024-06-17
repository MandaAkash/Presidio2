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
          <Route path="/login" element={!loggedIn&&<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/buyer" element={loggedIn?(<Buyer/>):(<PostProperty/>)} />
          <Route path="/manage" element={loggedIn?(<ManageProperties />):(<PostProperty/>)} />
          <Route path="/property" element={loggedIn?(<PostProperty/>):(<PostProperty/>)}/>
          <Route path="/register" element={!loggedIn?(<RegisterUser />):(<PostProperty/>)} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
