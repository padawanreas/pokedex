import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { COLOR } from "../Pokedex/TypeColors";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoIosStats } from "react-icons/io";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import Stats from "./Stats";
import PokemonEvolutions from "../Evolutions/PokemonEvolutions";
import About from "./About";

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState([]);
  const [activeComponent, setActiveComponent] = useState("About");
  const { id } = useParams();
  useEffect(() => {
    async function getPokemon() {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      response = await response.json();

      setPokemon(response);
    }

    getPokemon();
  }, [id]);
  console.log(pokemon);

  /*
  function capitalizeFirstLetter(string) {
    return string && string.charAt(0).toUpperCase() + string.slice(1);
  }

  const displayTexts =
    pokemon.abilities &&
    pokemon.abilities.map((ability, index) => (
      <li
        key={index}
        className="bg-slate-300	text-white mr-1 rounded-lg py-0 px-2 font-bold mt-2"
      >
        {ability.ability.name}
      </li>
    ));
*/
  return (
    <div
      className="profil w-screen min-h-screen relative pb-10"
      style={{
        background: COLOR.LINEAR_GRAD(
          pokemon.types && pokemon.types[0].type.name
        ),
      }}
    >
      <div>
        <div className="image relative w-auto h-60 sm:h-80 pokemon-picture pl-96 ">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            alt={pokemon.name}
            className="w-63 ml-20 py-2 "
          />
        </div>
        <div className="profil-content px-8 sm:px-1 py-6 bg-white rounded-3xl min-h-[60%] max-w-3xl shadow-xl m-auto ">
          <nav className="mt-8  flex justify-center">
            <ul className=" font-semibold text-black ">
              <div className=" mt-40 flex ">
                <li
                  onClick={() => setActiveComponent("About")}
                  className="flex items-center sm:pb-2 sm:pr-8 hover:text-red-600 text-xl"
                >
                  <AiOutlineInfoCircle />
                  Abouts
                </li>
                <li
                  onClick={() => setActiveComponent("Stats")}
                  className="flex items-center sm:pb-2 sm:pr-8 hover:text-red-600 text-xl"
                >
                  <IoIosStats />
                  Stats
                </li>
                <li
                  onClick={() => setActiveComponent("Evolutions")}
                  className="flex items-center sm:pb-2 sm:pr-8 hover:text-red-600 text-xl"
                >
                  <MdKeyboardDoubleArrowUp />
                  Evolutions
                </li>
              </div>
            </ul>
          </nav>
          <div>
            {activeComponent === "About" && (
              <About
                height={pokemon.height}
                weight={pokemon.weight}
                abilities={pokemon.abilities}
              />
            )}
            {activeComponent === "Stats" && <Stats stats={pokemon.stats} />}
            {activeComponent === "Evolutions" && <PokemonEvolutions />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
