import { GET_POKEMONS, GET_POKEMON_BY_NAME, GET_TYPES,GET_POKEMON,FILTER_POKEMONS, SORT_POKEMONS,TOGGLE_SEARCHING_POKEMON,CLEAR_POKEMON_NAME } from "./actions"


const initialState = {pokemons:[],pokemon:[],pokemonName:[],types:[],filteredPokemons: [], isSearching: false,pokemonsOrderAll: [],}

const rootReducer=(state = initialState, action)=>{

  switch(action.type){
    case GET_POKEMONS:
      return {...state, pokemons: action.payload,pokemonsOrderAll: action.payload}
    case GET_POKEMON:
      return{...state, pokemon: action.payload}
      case GET_POKEMON_BY_NAME:
        return{...state, pokemonName: action.payload}
        case GET_TYPES:
          return{...state, types: action.payload}  

case FILTER_POKEMONS:
  let filteredPokemons

  filteredPokemons = state.pokemons.filter((pokemon) => {
    let includeByType = true;
    let includeByOrigin = true;
    if (action.filterType !== "ALL") {
      includeByType = pokemon.type.includes(action.filterType);
    }

    if (action.filterOrigin === "Created") {
      includeByOrigin = pokemon.created === true;
    } else if (action.filterOrigin === "API") {
      includeByOrigin = pokemon.created === false;
    }
    return includeByType && includeByOrigin;
  });
  return {
    ...state,
    filteredPokemons,
  };
  case SORT_POKEMONS:
  const sortedFilteredPokemons = [...state.filteredPokemons];
  let sortedPokemons;

  const sortFunction = (sortType, sortDirection) => {
    if (sortType === "ATTACK") {
      return sortDirection === "ASC"
        ? (a, b) => a.attack - b.attack
        : (a, b) => b.attack - a.attack;
    } else if (sortType === "ALPHABET") {
      return sortDirection === "ASC"
        ? (a, b) => a.name.localeCompare(b.name)
        : (a, b) => b.name.localeCompare(a.name);
    }
  };

  if (action.sortType !== "ALL") {
    sortedFilteredPokemons.sort(sortFunction(action.sortType, action.sortDirection));
    sortedPokemons = [...state.pokemons].sort(sortFunction(action.sortType, action.sortDirection));
  } else {
    // Restablecer la lista a su estado original cuando sortType es "ALL"
    sortedPokemons = [...state.pokemonsOrderAll];
  }

  return {
    ...state,
    filteredPokemons: sortedFilteredPokemons,
    pokemons: sortedPokemons,
  };

  
    case TOGGLE_SEARCHING_POKEMON:
      return {
        ...state,
        isSearching: action.payload,
      };
      case CLEAR_POKEMON_NAME:
      return {
        ...state,
        pokemonName: [],
      };
    default:
      return{...state}
  }
}
export default rootReducer;