import React from "react";
import { Link } from "react-router-dom";
import pokemon from "../../img/pokemon-logo.png";
//import pokeball from "../../img/pokeball.png";
//import "./header.css";
function Nav() {
  return (
    <header>
      <div className="bg-red-600 flex justify-between items-center px-10 py-2">
        <Link to="/">
          <img src={pokemon} alt="pokemon" className="logo w-40" />
        </Link>
      </div>
    </header>
  );
}

export default Nav;
