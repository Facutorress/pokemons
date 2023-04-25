
import Card from "../Cards/Card";

const Cards = ({pokemons}) => {
  
  return(<div> 
    {pokemons.map(pokemon=> (<Card key={pokemon.id} id={pokemon.id} name={pokemon.name} image={pokemon.image} type={pokemon.type}  />))}
  </div>)
};

export default Cards;
