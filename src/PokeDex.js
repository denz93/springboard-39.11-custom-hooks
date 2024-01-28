import React, { useState } from "react";
import {v1 as uuid} from "uuid";
import axios from "axios";
import PokemonSelect from "./PokemonSelect";
import PokemonCard from "./PokemonCard";
import "./PokeDex.css";
import { useAxios } from "./hooks";

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
function PokeDex() {
  const [pokemon, makeRequest, clearPokemon] = useAxios({
    url: 'https://pokeapi.co/api/v2/pokemon/{name}',
    onFilter: (d) => {
      const {sprites, name, stats} = d
      return {front: sprites.front_default, back: sprites.back_default, name, stats: stats.map(({base_stat, stat}) => ({name: stat.name, value: base_stat})), id: uuid()}
    }
  })

  const addPokemon = async name => {
    makeRequest({name})
  };
  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        <PokemonSelect add={addPokemon} clear={clearPokemon}/>
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map(cardData => (
          <PokemonCard
            key={cardData.id}
            front={cardData.front}
            back={cardData.back}
            name={cardData.name}
            stats={cardData.stats.map(stat => ({
              value: stat.base_stat,
              name: stat.name
            }))}
          />
        ))}
      </div>
    </div>
  );
}

export default PokeDex;
