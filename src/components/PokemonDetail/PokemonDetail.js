import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState([]);
  useEffect(() => {
    async function getPokemon() {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      response = await response.json();
      setPokemon(response);
    }

    getPokemon();
  }, [id]);
  console.log(pokemon);

  const listStat =
    pokemon.stats &&
    pokemon.stats.map((stat, index) => (
      <div className="stat">
        <p key={index}>{stat.stat.name} </p>

        <ProgressBar
          key={stat.id}
          completed={stat.base_stat}
          bgColor={stat.base_stat > 50 ? "green" : "red"}
          animateOnRender={true}
        />
      </div>
    ));
  return (
    <div className="detail">
      <h1>{pokemon.name}</h1>
      <p>height: {pokemon.height} cm</p>
      <div className="stats">
        <h1>stats</h1>
        <div className="stat-container">{listStat}</div>
      </div>
    </div>
  );
};

export default PokemonDetail;
