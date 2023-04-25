import { useEffect, useState } from "react";
import Cards from "../../Components/Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  getTypes,
  filterPokemons,
  sortPokemons,
} from "../../Redux/actions";
import SearchBar from "./Searchbar";
import styles from "./Home.module.css";

function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 12;
  const filteredPokemons = useSelector((state) => state.filteredPokemons);
  const [filtroAplicado, setFiltroAplicado] = useState(false);
  const [filtrarTipo, setFiltrarTipo] = useState("ALL");
  const [filtrarOrigen, setFiltrarOrigen] = useState("ALL");
  const [sortType, setSortType] = useState("NONE");
  const [sortDirection, setSortDirection] = useState("ASC");
  const isSearching = useSelector((state) => state.isSearching);

  const aplicarFiltrosYOrden = () => {
    dispatch(filterPokemons(filtrarTipo, filtrarOrigen));
    dispatch(sortPokemons(sortType, sortDirection));
  };

  const handleTipoChange = (e) => {
    setFiltrarTipo(e.target.value);
    setFiltroAplicado(e.target.value !== "ALL" || filtrarOrigen !== "ALL");
    aplicarFiltrosYOrden();
  };

  const handleOrigenChange = (e) => {
    setFiltrarOrigen(e.target.value);
    setFiltroAplicado(filtrarTipo !== "ALL" || e.target.value !== "ALL");
    aplicarFiltrosYOrden();
  };

  const handleSortByAttack = (event) => {
    setSortType(event.target.value === "ALL" ? "ALL" : "ATTACK");
    setSortDirection(event.target.value === "ALL" ? "NONE" : event.target.value);
    aplicarFiltrosYOrden();
  };
  
  const handleSortAlphabetically = (event) => {
    setSortType(event.target.value === "ALL" ? "ALL" : "ALPHABET");
    setSortDirection(event.target.value === "ALL" ? "NONE" : event.target.value);
    aplicarFiltrosYOrden();
  };
  

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
  }, [dispatch]);

  useEffect(() => {
    if (pokemons.length > 0) {
      dispatch(filterPokemons(filtrarTipo, filtrarOrigen));
      dispatch(sortPokemons(sortType, sortDirection));
    }
  }, [dispatch, filtrarTipo, filtrarOrigen, sortType, sortDirection]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexUltimoPokemon = currentPage * pokemonsPerPage;
  const indexPrimerPokemon = indexUltimoPokemon - pokemonsPerPage;
  const pagePokemons = pokemons.slice(indexPrimerPokemon, indexUltimoPokemon);
  const displayPokemons = filtroAplicado ? filteredPokemons : pagePokemons;

  return (
    <>
      <div className={styles.container}>
        <nav className={styles.filters}>
          <select className={styles.select} onChange={handleTipoChange}>
          <option value="ALL">ALL</option>
          {types.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
          </select>
          <select className={styles.select} onChange={handleOrigenChange}>
          <option value="ALL">ALL</option>
          <option value="Created">Created</option>
          <option value="API">API</option>
          </select>
          <label>Ataque</label>
          <select className={styles.select} onChange={handleSortByAttack}>
          <option value="ALL">ALL</option>
          <option value="ASC">Ascendente</option>
          <option value="DESC">Descendente</option>
          </select>
          <label>Alfabeticamente</label>
          <select className={styles.select} onChange={handleSortAlphabetically}>
          <option value="ALL">ALL</option>
          <option value="ASC">Ascendente</option>
          <option value="DESC">Descendente</option>
          </select>
        </nav>
        <div>
          <SearchBar />
        </div>
        {!isSearching && (
          <div>
            <Cards pokemons={displayPokemons} />
          </div>
        )}
        {!isSearching && (
          <div className={styles.pagination}>
            {currentPage > 1 && (
              <button onClick={() => handlePageChange(currentPage - 1)}>
                Anterior
              </button>
            )}
            <span>Página {currentPage}</span>
            <button onClick={() => handlePageChange(currentPage + 1)}>
              Siguiente
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
