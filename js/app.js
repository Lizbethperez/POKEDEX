/* elementos que usaremos
const form = document.getElementById('form');
const searchWords = document.getElementById('search-words');
const responseContainerApi = document.getElementById('container-response-api');
const responseContainerInfoPokemon=document.getElementById("container-info-pokemon");
let searchedText;



//a nuestro form le damos el evento submit
form.addEventListener('submit', function (event){
  event.preventDefault();
  responseContainerApi.innerHTML='';
  responseContainerInfoPokemon.innerHTML='';
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

function addPokemon(){
  console.log(this.responseText);
  const data = JSON.parse(this.responseText);
  console.log(data);
  //console.log(article);
  let imagesPokemons = document.createElement('img');
  imagesPokemons.className= 'img-responsive';
  imagesPokemons.style.width='15em';
  let picture = data.sprites.front_default;
  imagesPokemons.src= picture;
  responseContainerApi.appendChild(imagesPokemons);
  printAllInfoPokemon(addName(data),addHabilities(data),addType(data));
}

 const printAllInfoPokemon=(addName,addHabilities,addType)=>{
  let t="<div id='container-response-api'class='col s10 offset-s2'></div>"
  let printName=responseContainerInfoPokemon.appendChild(addName);
 let printHabilities= responseContainerInfoPokemon.appendChild(addHabilities);
  let printType=responseContainerInfoPokemon.appendChild(addType);
 
  
 }

 const addName=(data)=>{
  let infoName= document.createElement('li');
  let namePokemon = data.name;
  console.log(namePokemon);
  infoName.innerText = 'name: ' + namePokemon;
  return infoName;
 }

 const addHabilities=(data)=>{
  let li = document.createElement('li');
  const pokemon = [];
  for (let i=0; i < data.abilities.length; i++ ){
    pokemon.push(data.abilities[i].ability.name);
    console.log(data.abilities);

  }
  console.log(pokemon);
  li.innerText = 'habilidades: ' + pokemon;
  return li;

 }
 const addType =(data)=>{
  let type = document.createElement('li');
  let typesPokemon = data.types[0].type.name;
  console.log(typesPokemon);
  type.innerText = 'type: ' + typesPokemon;
  return type;

 }
*/

$(document).ready(function () {
  const responseContainerInfoPokemon = $('#container-info-pokemon');
  ajaxAllPokemons();
  $("#submit-btn").click(function (event) {
    event.preventDefault();
    console.log("entro");
    $("#container-response-api").empty();
    const searchWords = $("#search-words").val();
    ajaxPokemon(searchWords);
  });

  const ajaxPokemon = (searchWords) => {
    $.ajax({
      url: 'https://pokeapi.co/api/v2/pokemon/' + searchWords,
      type: 'GET',
      datatype: 'json',
    })
      .done(function (response) {
        //console.log(response);
        const data = (response);
        addPokemon(data);
      })
      .fail(function () {
        console.log("error");
      })
  }
  function ajaxAllPokemons() {
    $.ajax({
      url: 'https://pokeapi.co/api/v2/pokemon/',
      type: 'GET',
      datatype: 'json',
    })
      .done(function (response) {
        //console.log(response);
        const data = (response);
        console.log("todos los pokemons");
        console.log(data);
        addAllPokemos(data);
      })
      .fail(function () {
        console.log("error");
      })
  }
  
  function addPokemon(data) {
    const responseContainerApi = $('#container-response-api');
    console.log(data);
    let imagesPokemons = document.createElement('img');
    imagesPokemons.className = 'img-responsive';
    imagesPokemons.style.width = '15em';
    let image = data.sprites.front_default;
    imagesPokemons.src = image;
    responseContainerApi.append(imagesPokemons);
    printAllInfoPokemon(addName(data), addHabilities(data), addType(data));
  }
  const printAllInfoPokemon = (addName, addHabilities, addType) => {
    let responseContainerInfoPokemon = $("#container");
    let ulElementContainer=document.createElement('ul');
    ulElementContainer.id="container-info-pokemon";
    ulElementContainer.className="col s10 offset-s2";
    ulElementContainer.append(addName);
    ulElementContainer.append(addHabilities);
    ulElementContainer.append(addType);
    responseContainerInfoPokemon.append(ulElementContainer);
  }

  const addName = (data) => {
    let infoName = document.createElement('li');
    let namePokemon = data.name;
    infoName.innerText = 'name: ' + namePokemon;
    return infoName;
  }

  const addHabilities = (data) => {
    let li = document.createElement('li');
    const pokemon = [];
    for (let i = 0; i < data.abilities.length; i++) {
      pokemon.push(data.abilities[i].ability.name);
    }
    console.log(pokemon);
    li.innerText = 'habilidades: ' + pokemon;
    return li;
  }
  const addType = (data) => {
    let type = document.createElement('li');
    let typesPokemon = data.types[0].type.name;
    console.log(typesPokemon);
    type.innerText = 'type: ' + typesPokemon;
    return type;
  }

  function addAllPokemos(data){
    let containerAllPokemos=$("#containerAllPikachu");
    for (let i = 0; i < data.results.length; i++) {
      let getPokemonInformation=data.results[i].name;
      let getPokemonUrl=data.results[i].url;
      let containerInformationPokemon=document.createElement('div');
      let containerImagePokemon=document.createElement('img');
      containerImagePokemon.src=getPokemonUrl;
      containerAllPokemos.append(containerImagePokemon);
      containerInformationPokemon.append(getPokemonInformation);
      containerAllPokemos.append(containerInformationPokemon);
    }
  }
});