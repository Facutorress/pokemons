import axios from "axios"
export const GET_POKEMON ="GET_POKEMON"
export const GET_POKEMONS ="GET_POKEMONS"
export const GET_POKEMON_BY_NAME="GET_POKEMON_BY_NAME"
export const FILTER_POKEMONS = 'FILTER_POKEMONS';
export const GET_TYPES="GET_TYPES"
export const SORT_POKEMONS = "SORT_POKEMONS";
export const TOGGLE_SEARCHING_POKEMON="TOGGLE_SEARCHING_POKEMON"
export const CLEAR_POKEMON_NAME = 'CLEAR_POKEMON_NAME'; 

export const getPokemons =()=>{
  return async function (dispatch) {
    const apiData= await axios.get("http://localhost:3001/pokemons")
    const pokemons= apiData.data
    dispatch({type: GET_POKEMONS, payload: pokemons})
  }
}

export const getPokemon =(id)=>{
  return async function (dispatch) {
    const apiData= await axios.get(`http://localhost:3001/pokemons/${id}`)
    const pokemon= apiData.data
    dispatch({type: GET_POKEMON, payload: pokemon})
  }
}

export const getPokemonByName =(name)=>{
  return async function (dispatch) {
    const apiData= await axios.get(`http://localhost:3001/pokemons/byname?name=${name}`)
    const pokemon= apiData.data
    dispatch({type: GET_POKEMON_BY_NAME, payload: pokemon})
  }
}
export const getTypes= ()=>{
  return async function (dispatch) {
    const apiData= await axios.get(`http://localhost:3001/pokemons/types`)
    const types= apiData.data
    dispatch({type: GET_TYPES, payload: types})
}}
export function filterPokemons(filterType, filterOrigin) {
  return {
    type: FILTER_POKEMONS,
    filterType,
    filterOrigin,
  };
}

export function sortPokemons(sortType, sortDirection) {
  return {
    type: SORT_POKEMONS,
    sortType,
    sortDirection,
  };
}

export function toggleSearchingPokemon (isSearching)  {
  return {type: TOGGLE_SEARCHING_POKEMON,
  payload: isSearching}
};
export function clearPokemonName() {
  return { type: CLEAR_POKEMON_NAME };
}