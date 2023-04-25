import { useState,useEffect } from "react";
import{ validate, postData }from "./validate"
import { getTypes } from "../../Redux/actions";
import { useSelector,useDispatch } from "react-redux";
import styles from "./Form.module.css";
function Form () {
  const dispatch= useDispatch()
  const types=useSelector((state) => state.types); 

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

const [form,setForm]= useState({
  name:"",
  image:"",
  types:"",
  hp:"",
  attack:"",
  defense:"",
  speed:"",
  weight:"",
  height:""
})
const [errors, setErrors]= useState({
  name:"",
  image:"",
  types:"",
  hp:"",
  attack:"",
  defense:"",
  speed:"",
  weight:"",
  height:""
})

const handleSubmit = async (event) => {
  event.preventDefault();
  if (validate(form,errors,setErrors)) {
    try {
      await postData(form);
      setForm({
        name:"",
        image:"",
        types:[],
        hp:"",
        attack:"",
        defense:"",
        speed:"",
        weight:"",
        height:""
      });
    } catch (error) {
      console.error(error);
    }
  }
};
const changeHandler=(event)=>{
const property = event.target.name
let value = event.target.value
if (property === "types") {
  if (event.target.checked) {
    value = [...form.types, event.target.value];
  }}
setForm({...form,[property]:value})
validate({...form,[property]:value}, errors, setErrors)
}
return (
  <form onSubmit={handleSubmit} className={styles.formContainer}>
    <div className={styles.formRow}>
      <label htmlFor="name" className={styles.label}>Name:</label>
      <input type="text" id="name" name="name" value={form.name} onChange={changeHandler} className={styles.input} />
      {errors.name && <span className={styles.error}>{errors.name}</span>}
    </div>
    <div className={styles.formRow}>
      <label htmlFor="image" className={styles.label}>Image:</label>
      <input type="text" id="image" name="image" value={form.image} onChange={changeHandler} className={styles.input} />
      {errors.image && <span className={styles.error}>{errors.image}</span>}
    </div>
    <div className={styles.formRow}>
      <label htmlFor="hp" className={styles.label}>HP:</label>
      <input type="number" id="hp" name="hp" value={form.hp} onChange={changeHandler} className={styles.input} />
      {errors.hp && <span className={styles.error}>{errors.hp}</span>}
    </div>
    <div className={styles.formRow}>
      <label htmlFor="attack" className={styles.label}>Attack:</label>
      <input type="number" id="attack" name="attack" value={form.attack} onChange={changeHandler} className={styles.input} />
      {errors.attack && <span className={styles.error}>{errors.attack}</span>}
    </div>
    <div className={styles.formRow}>
      <label htmlFor="defense" className={styles.label}>Defense:</label>
      <input type="number" id="defense" name="defense" value={form.defense} onChange={changeHandler} className={styles.input} />
      {errors.defense && <span className={styles.error}>{errors.defense}</span>}
    </div>
    <div className={styles.formRow}>
      <label htmlFor="speed" className={styles.label}>Speed:</label>
      <input type="number" id="speed" name="speed" value={form.speed} onChange={changeHandler} className={styles.input} />
      {errors.speed && <span className={styles.error}>{errors.speed}</span>}
    </div>
    <div className={styles.formRow}>
      <label htmlFor="weight" className={styles.label}>Weight:</label>
      <input type="number" id="weight" name="weight" value={form.weight} onChange={changeHandler} className={styles.input} />
      {errors.weight && <span className={styles.error}>{errors.weight}</span>}
    </div>
    <div className={styles.formRow}>
      <label htmlFor="height" className={styles.label}>Height:</label>
      <input type="number" id="height" name="height" value={form.height} onChange={changeHandler} className={styles.input} />
      {errors.height && <span className={styles.error}>{errors.height}</span>}
    </div>
    <div className={styles.checkboxContainer}>
      {types.map((type) => {
        return (
          <label key={type.id} className={styles.checkboxLabel}>
            <input type="checkbox" name="types" value={type.name} onChange={changeHandler} />
            {type.name}
          </label>
        );
      })}
    </div>
<div className={styles.formRow}>
        <button type="submit" className={styles.submitBtn}>Create</button>
      </div>
    </form>
  );
};

export default Form;