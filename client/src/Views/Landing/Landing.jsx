import { Link } from "react-router-dom/cjs/react-router-dom.min";
import styled from "../Landing/Landing.module.css"

function Landing() {

  return (
    <div className={styled.background}>
      <div className={styled.centered}>
        <Link to="/Home">
          <button className={styled.boton}>Home</button>
        </Link>
      </div>
    </div>
  )
}

export default Landing;
