
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPokemon } from "../../Redux/actions";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./Detail.module.css";

function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPokemon(id));
  }, [dispatch, id]);

  const {
    name,
    image,
    type,
    hp,
    attack,
    speed,
    defense,
    weight,
    height,
    created,
  } = useSelector((state) => state.pokemon);
  return (
    <div className={styles.container}>
      <video autoPlay loop muted className={styles.backgroundVideo}>
    <source src="https://assets.pokemon.com//assets/cms2-es-es/img/misc/virtual-backgrounds/sword-shield/pokemon-in-the-wild.mp4" type="video/mp4" />
  </video>
      <div className={styles.detail}>
        <Link to="/Home">
        <button className={styles.closeButton}>
          X
        </button>
        </Link>
        <img src={image} alt={name} />
        <p>ID: {id}</p>
        <p>Nombre: {name}</p>
        <p>
  Tipo:
  {type &&
    type.map((t) => (
      <p key={t} className="type-item">{t}</p>
    ))}
</p>
        <p>HP: {hp}</p>
        <p>Ataque: {attack}</p>
        <p>Defensa: {defense}</p>
        <p>Velocidad: {speed}</p>
        <p>Peso: {weight}</p>
        <p>Altura: {height}</p>
        <p>{created}</p>
      </div>
    </div>
  );
};

export default Detail;