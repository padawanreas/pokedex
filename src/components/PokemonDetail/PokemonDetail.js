import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import PokemonEvolutions from "../Evolutions/PokemonEvolutions";
import Evolution from "../Evolutions/Evolutions";

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState([]);
  const [evolutionChain, setEvolutionChain] = useState([]);

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
      <div className="stat" key={stat.id}>
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
    <div className="detail px-10 pt-6 ">
      <div className="title flex bg-green-400">
        <h1>{pokemon.name}</h1>
        <p className="ml-3">#{pokemon.id}</p>
      </div>
      <div className="content flex justify-between">
        <p>height: {pokemon.height} cm</p>
        <div className="abilities">
          <h2>Abilities:</h2>
          <ul>
            {pokemon.abilities &&
              pokemon.abilities.map((ability, index) => (
                <li key={index}>{ability.ability.name}</li>
              ))}
          </ul>
        </div>

        <div className="stats w-2/6">
          <h1>stats</h1>
          <div className="stat-container">{listStat}</div>
        </div>
      </div>
      <PokemonEvolutions />
    </div>
  );
};

export default PokemonDetail;
