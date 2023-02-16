import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NavTabs from './components/NavTabs';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <Header />
      <Outlet />
      <NavTabs />
      <Footer />
    </>
  );
}

export default App;
