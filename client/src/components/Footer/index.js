import React from 'react';
import { Link } from 'react-router-dom';
import { redirect } from 'react-router-dom';

import Auth from '../../utils/auth';

function Navbar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    redirect("/login")
  };
  
  if (Auth.loggedIn()) {
    return (
      <>
        <Link to="/me">
          {Auth.getProfile().data.username}'s profile
        </Link>
        <button onClick={logout}>
          Logout
        </button>
      </>
    );
  }
  // If logged out show login controls
  return (
    <>
      <Link to="/login">
        Login
      </Link>
      <Link to="/signup">
        Signup
      </Link>
    </>
  )
}

export default Navbar;
