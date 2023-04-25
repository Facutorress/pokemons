import axios from "axios";

const validate = (form, errors, setErrors) => {
  const typesError = !form.types ? "Debe ingresar al menos un tipo" : form.types.length > 35 ? "Los tipos no pueden tener más de 35 caracteres" : "";
  const nameError = !form.name ? "El nombre es requerido" : form.name.length > 35 ? "El nombre no puede tener más de 35 caracteres" : "";
  const imageError = !form.image ? "La imagen es requerida" : !/^https?:\/\/\S+$/.test(form.image) ? "La URL de la imagen no es válida" : "";
  const positiveNumberError = (value) => isNaN(value) || value <= 0 ? `El valor debe ser un número positivo` : "";
  setErrors({
    ...errors,
    name: nameError,
    image: imageError,
    types: typesError,
    hp: positiveNumberError(form.hp),
    attack: positiveNumberError(form.attack),
    defense: positiveNumberError(form.defense),
    speed: positiveNumberError(form.speed),
    weight: positiveNumberError(form.weight),
    height: positiveNumberError(form.height)
  });

  for (let key in errors) {
    if (errors[key] !== "") {
      return false;
    }
  }
  return true;
};
const postData = async (form)=>{
  console.log(form)
 await axios.post("http://localhost:3001/pokemons",form)
  .then((response) => {
    alert("Todo ok");
  })
  .catch((error) => {
    alert(error);
  });
}



export {postData, validate};