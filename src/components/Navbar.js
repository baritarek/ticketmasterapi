import React from 'react';
import logo from '../images/logo.png';
// import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <a href='/'>
        <img alt='ticketmaster-logo' src={logo} />
      </a>
      <div className='links'>
        <a href='/events'>Events</a>
        <a href='/attractions'>Attractions</a>
        <a href='/venues'>Venues</a>
      </div>
    </nav>
  );
};

export default Navbar;
