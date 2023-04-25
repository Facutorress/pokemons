const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routePokemons = require("./routePokemons")
const routeTypes= require("./routeTypes")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemons",routeTypes)
router.use("/pokemons",routePokemons)

module.exports = router;
