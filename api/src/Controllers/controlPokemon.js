const axios = require ("axios")
const {Pokemon,Type} = require("../db")


const createPokemon = async (pokemon) => {
  const { name, image, hp, attack, defense, speed, height, weight, types } = pokemon;
   
  if (!name || !image || !hp || !attack || !defense || !speed || !height || !weight || !types) {
    throw new Error("Faltan datos");
  }
    
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/; 
  if (!urlRegex.test(image)) {
    throw new Error("Debes insertar una URL válida en la propiedad Image");
  }

  if (!Array.isArray(types)) {
    throw new Error("La propiedad Types debe ser un array");
  } 
  
  const newPokemon = await Pokemon.create({
    name, image, hp, attack, defense, speed, height, weight,created: true
  }); 
  
  for (const typeName of types) {
    const type = await Type.findOne({ where: { name: typeName } });
    if (type) {
      await newPokemon.addType(type);
    }
  }
  return newPokemon; 
};
const getPokemons = async () => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=150`);
  const pokemonRequests = response.data.results.map((pok) => axios.get(pok.url));
  const pokemonResponses = await Promise.all(pokemonRequests);
  const pokemonsFromApi = pokemonResponses.map((res) => {
    const {id, name, sprites, types, weight, stats, height} = res.data;
    return {
      id,  
      name,
      image: sprites.other.home.front_default,
      type: types.map((t) => t.type.name),
      hp: stats[0].base_stat,
      attack: stats[1].base_stat,
      defense: stats[2].base_stat,
      speed: stats[5].base_stat,
      weight,
      height,
      created: false
    }; 
  });  
  const pokemonsFromDb = await Pokemon.findAll({
    include: { model: Type, attributes: ["name"] },
  });

  const transformedPokemonsFromDb = pokemonsFromDb.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.image,
    type: pokemon.types.map((t) => t.name),
    hp: pokemon.hp,
    attack: pokemon.attack,
    defense: pokemon.defense,
    speed: pokemon.speed,
    weight: pokemon.weight,
    height: pokemon.height, 
    created: pokemon.created 
  }));
  console.log(pokemonsFromDb)
  // Combinar los Pokémons de la API y los de la base de datos
  const allPokemons = [...pokemonsFromApi, ...transformedPokemonsFromDb];

  return allPokemons;
};

const getPokemonByName = async(name)=>{
  const lowerName= name.toLowerCase()
  const dbResults = await Pokemon.findAll({
    where: {
      name: lowerName
    },
  })
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${lowerName}`);
  const {id,sprites, types, weight, stats, height } = response.data;
  const pokemonApi = {
    id,
    name,
    image: sprites.other.home.front_default,
    type: types.map((t) => t.type.name),
    hp: stats[0].base_stat,
    attack: stats[1].base_stat,
    defense: stats[2].base_stat,
    speed: stats[5].base_stat,
    weight,
    height,
    created: false
  };
  const allResults = [pokemonApi,...dbResults]

  if (allResults.length === 0) {
    throw new Error("No se encontraron Pokemon");
  }
  return allResults; 
};

 
const getPokemonById = async (id) => {
  const  response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const { name, sprites, types, weight, stats, height } = response.data;
  return {
    id,
    name,
    image: sprites.other.home.front_default,
    type: types.map((t) => t.name),
    hp: stats[0].base_stat,
    attack: stats[1].base_stat,
    defense: stats[2].base_stat,
    speed: stats[5].base_stat,
    weight,
    height,
    created: false
  };
  
}

const getPokemonByPk = async (id) => {
  const encontrado = await Pokemon.findByPk(id, { include: { model: Type, attributes: ["name"] } });

  if (!encontrado) {
    throw new Error("El pokemon que buscas no está en la base de datos");
  }
  const pokemonWithTypes = {
    id: encontrado.id,
    name: encontrado.name,
    image: encontrado.image,
    hp: encontrado.hp,
    attack: encontrado.attack,
    defense: encontrado.defense,
    speed: encontrado.speed,
    weight: encontrado.weight,
    height: encontrado.height,
    created: encontrado.created,
    type: encontrado.Types.map((t) => t.name) 
  };

  return pokemonWithTypes;
};

       

module.exports= {getPokemonById,getPokemonByName,createPokemon,getPokemonByPk,getPokemons};