import React from "react";
import { Routes, Route } from "react-router-dom";
import Pokedex from "../Pokedex/Pokedex";
import PokemonDetail from "../PokemonDetail/PokemonDetail";

function RouteConfigs() {
  return (
    <Routes>
      <Route path="/" element={<Pokedex />} />
      <Route path=":id" element={<PokemonDetail />} />
    </Routes>
  );
}

export default RouteConfigs;
