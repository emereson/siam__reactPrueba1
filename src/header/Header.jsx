import React from 'react';
import { Link } from 'react-router-dom';
import './headerStyle.css';

const Header = () => {
  return (
    <div className="header__container">
      <Link to="/">Todas Las personas </Link>

      <Link to="/addPerson">Agregar Personas </Link>
    </div>
  );
};

export default Header;
