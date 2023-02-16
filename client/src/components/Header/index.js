import React from 'react';
import { redirect } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div
        onClick={() => redirect("/")}>
          <h1>Welcome to JATTLE-BOTS</h1>
      </div>
    </header>
  );
};

export default Header;
