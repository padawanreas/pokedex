import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GiBodyHeight } from "react-icons/gi";
import { FaBalanceScaleLeft } from "react-icons/fa";

function About(props) {
  const { height, weight, abilities } = props;
  const { id } = useParams();
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );
        setPokemon(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonData();
  }, [id]);
  //console.log(pokemon);

  return (
    <>
      <div className="text-left  px-10 py-3">
        <p>
          {pokemon.flavor_text_entries &&
            pokemon.flavor_text_entries[8].flavor_text}
        </p>
        <p>
          {pokemon.flavor_text_entries &&
            pokemon.flavor_text_entries[0].flavor_text}
        </p>
      </div>
      <div className="flex justify-around ">
        <div className="imc flex justify-around  py-3  w-2/4 rounded-lg  shadow-gray-400 shadow-xl">
          <div className="height">
            <h3 className="flex items-center font-bold">
              <GiBodyHeight style={{ marginRight: "6px" }} />
              Height
            </h3>
            <p className="text-center "> {height * 10}cm</p>
          </div>
          <div className="weight">
            <h3 className="flex items-center font-bold">
              <FaBalanceScaleLeft style={{ marginRight: "6px" }} />
              Weight
            </h3>
            <p className="text-center ">{weight / 10}kg</p>
          </div>
        </div>
      </div>
      <div className="more px-10 pt-10">
        <h2 className="font-bold text-xl mb-3">more info</h2>
        <div className="abilities flex mb-3 ">
          <h3 className="w-28">Abilities</h3>
          {abilities &&
            abilities.map((abi, i) => (
              <button
                key={i}
                className="bg-gray-300 ml-4 rounded-md px-3 font-semibold "
              >
                {abi.ability.name}
              </button>
            ))}
        </div>
        <div className="habitat flex mb-3">
          <h3 className="w-28">habitat</h3>
          <button className="bg-gray-300 ml-4 rounded-md px-3 font-semibold ">
            {pokemon.habitat ? pokemon.habitat.name : ""}
          </button>
        </div>
        <div className="grown flex mb-3">
          <h3 className="w-28">Growth rate</h3>
          <button className="bg-gray-300 ml-4 rounded-md px-3 font-semibold">
            {pokemon.growth_rate ? pokemon.growth_rate.name : ""}
          </button>
        </div>
        <div className="grown flex mb-3">
          <h3 className="w-28">Capture rate</h3>
          <p className=" ml-2 rounded-md px-3 font-semibold">
            {pokemon.capture_rate}%
          </p>
        </div>
        <div className="happiness flex mb-3">
          <h3 className="mr-2">Base hapiness</h3>
          <p className=" ml-1 rounded-md px-3 font-semibold">
            {pokemon.base_happiness}
          </p>
        </div>
        <div className="eggs flex mb-3">
          <h3 className="w-28">Egg groups</h3>
          {pokemon.egg_groups &&
            pokemon.egg_groups.map((egg, i) => (
              <button
                key={i}
                className="bg-gray-300 ml-4 rounded-md px-3 font-semibold"
              >
                {egg.name}
              </button>
            ))}
        </div>
        <div className="genre flex">
          <h3 className="w-28">Genre</h3>
          <p className="font-semibold ml-4">
            {pokemon.gender_rate === -1 ? "Male" : "Female"}
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
