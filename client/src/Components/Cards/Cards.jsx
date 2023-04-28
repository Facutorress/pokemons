import React from "react";
import Card from "../Cards/Card";
import styles from "./Cards.module.css";

const Cards = ({pokemons}) => {
  return (
    <div className={styles.container}> 
      {pokemons.map(pokemon => (
        <Card key={pokemon.id} id={pokemon.id} name={pokemon.name} image={pokemon.image} type={pokemon.type}  />
      ))}
    </div>
  );
};

export default Cards;
