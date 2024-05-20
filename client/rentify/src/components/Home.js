import React from 'react';
import Login from './Login';
import PostProperty from './postProperty';

function Home({loggedIn, setLoggedIn}) {
  const handleLogout = () => {
    setLoggedIn(true);
  };

  return (
    <div>
      {!loggedIn ? (<Login setLoggedIn={setLoggedIn} />) : (<PostProperty handleLogout={handleLogout} />)}
    </div>
  );
}

export default Home;
