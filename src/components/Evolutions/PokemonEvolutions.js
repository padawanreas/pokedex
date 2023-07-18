import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const PokemonEvolutions = ({ match }) => {
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const data = response.data;
        setPokemon(data);

        const speciesResponse = await axios.get(data.species.url);
        const evolutionChainResponse = await axios.get(
          speciesResponse.data.evolution_chain.url
        );
        const evolutionChainData = evolutionChainResponse.data.chain;
        extractEvolutions(evolutionChainData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  const extractEvolutions = (chainData) => {
    const evolutions = [];
    let currentEvolution = chainData;

    while (currentEvolution) {
      const evolutionDetails = {
        name: currentEvolution.species.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
          currentEvolution.species.url.split("/")[6]
        }.png`,
      };
      evolutions.push(evolutionDetails);
      currentEvolution = currentEvolution.evolves_to[0];
    }

    setEvolutionChain(evolutions);
  };

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap w-full">
      {evolutionChain.map((evolution) => (
        <div key={evolution.name}>
          <h3>{evolution.name}</h3>
          <img
            src={evolution && evolution.image}
            alt={evolution.name}
            className="w-1/4"
          />
        </div>
      ))}
    </div>
  );
};

export default PokemonEvolutions;
