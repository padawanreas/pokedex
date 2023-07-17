import React, { useState, useEffect } from "react";
import axios from "axios";
import { COLOR } from "./TypeColors";
import { Link } from "react-router-dom";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const getPokemons = async () => {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
      );
      response.data.results.forEach(async (pokemon) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        setPokemons((state) => {
          state = [...state, poke.data];
          state.sort((a, b) => (a.id > b.id ? 1 : -1));
          return state;
        });
      });
    };
    getPokemons();
  }, []);
  console.log(pokemons);

  return (
    <div className="container pl-32 pt-20 flex flex-wrap">
      {pokemons.map((pokemon, i) => (
        <div key={pokemon.id}>
          <Link to={`${pokemon.name}`}>
            <div
              key={i}
              className="card py-2 px-2 rounded-lg ml-4 mb-4 w-52 "
              style={{
                background: COLOR.LINEAR_GRAD(pokemon.types[0].type.name),
              }}
            >
              <div className="title flex justify-between items-center px-2 text-white">
                <h1 className="font-bold text-2xl">{pokemon.name}</h1>
                <p>#{pokemon.id}</p>
              </div>
              <div className="image">
                <img
                  src={pokemon.sprites.other["official-artwork"].front_default}
                  alt={pokemon.name}
                  className="w-28 ml-10 py-2"
                />
              </div>
              <div className="types ">
                {pokemon.types.map(({ type }, i) => (
                  <button
                    key={i}
                    className="ml-2 text-white rounded-md px-3 py-1 text-xs font-bold"
                    style={{ backgroundColor: COLOR.TYPE(type.name) }}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Pokedex;
