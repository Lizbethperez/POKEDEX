// elementos que usaremos
const form = document.getElementById('form');
const searchWords = document.getElementById('search-words');
const responseContainer = document.getElementById('container-response-api');
console.log("responseContainer");
let searchedText;

//a nuestro form le damos el evento submit
form.addEventListener('submit', function (e){
  e.preventDefault();
  console.log("hola")
  console.log(responseContainer);
  responseContainer.innerHTML='';
  searchedText= searchWords.value;
  getAllPokemon();
});

//en la funcion getPokemon haremos nuestras peticiones
const getAllPokemon=()=>{
  const articleRequest = new XMLHttpRequest();
  articleRequest.open('GET', `https://pokeapi.co/api/v2/pokemon/${searchedText}`);
  articleRequest.onload = addPokemon;
  articleRequest.onerror = handleError;
  articleRequest.send();
}

const handleError=() =>{
  console.log('Se ha presentado un error');
}

const addPokemon= ()=> {
  const data = JSON.parse(this.responseText);
  console.log(data);

  //console.log(article);

  let imagesPokemons = document.createElement('img');
  imagesPokemons.className= 'img-responsive';
  imagesPokemons.style.width='5em';
  let picture = data.sprites.front_default;
  imagesPokemons.src= picture;
  responseContainer.appendChild(imagesPokemons);


}