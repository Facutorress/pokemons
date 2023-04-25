import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ id, name, image, type }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} />
      <p>Nombre: {name}</p>
      <p>ID: {id}</p>
      <div className={styles.type}>
        <p>Tipo:</p>
        {type.map((t,index) => (
          <p key={index}>{t}</p>
        ))}
      </div>
      <Link to={`/Detail/${id}`}>
        <button className={styles.button}>Detalles</button>
      </Link>
    </div>
  );
};

export default Card;
