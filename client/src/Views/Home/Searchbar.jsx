import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getPokemonByName,
  toggleSearchingPokemon,
  clearPokemonName,
} from "../../Redux/actions";
import { useSelector } from "react-redux";
import Card from "../../Components/Cards/Card";
import styles from "./Searchbar.module.css";

export default function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const pokemonName = useSelector((state) => state.pokemonName);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(getPokemonByName(name));
    dispatch(toggleSearchingPokemon(true));
  };
 const handleChange = (event) => {
  setName(event.target.value);
  if (!event.target.value) {
    dispatch(toggleSearchingPokemon(false));
  }
};
  const handleReset = () => {
    dispatch(toggleSearchingPokemon(false));
    dispatch(clearPokemonName());
    setName("");
  };
  return (
    <>
      <div className={styles.container}>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <input
            className={styles.inputField}
            type="text"
            id="search"
            name="search"
            placeholder="Buscar..."
            value={name}
            onChange={handleChange}
          />
          <button className={styles.searchButton} type="submit">
            Buscar
          </button>
          <button className={styles.resetButton} type="button" onClick={handleReset}>
            Restablecer
          </button>
        </form>
      </div>
      {pokemonName.map((pokemon) => (
        <div className={styles.cardsContainer} key={pokemon.id}>
          <Card
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            type={pokemon.type}
          />
        </div> 
      ))}
    </>
  );
}