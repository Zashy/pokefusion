/* Oh god here be pokedex */
var pokemons = [],
	xhr = new XMLHttpRequest();

function init(){
	readJSON();
}

function readJSON(){
	var url='./resources/pokedex.json';
	xhr.onreadystatechange = processResponse;
	xhr.open('GET', url, true);
	xhr.send();
}

function processResponse(){
	var response = xhr.response;
	if(xhr.readyState == 4) { // done
		if (xhr.status == 200) {
			// success
			pokemons = JSON.parse(response);
		} else {
			//error
			console.log('error: json not found; '+response);
		}
	}
}

function getPokemonName(pokedexNumber){
	if(pokemons.length == 0){
		return 'error';
	}
	return pokemons[pokedexNumber-1].name;
}

function getImageLink(pokedexNumber){
	if(pokemons.length == 0){
		return 'error';
	}
	var result = pokemons[pokedexNumber-1].img;
	if(result === 'err'){
		result = './images/MissingNo..png';
	}
	return result;
}

function getBulbapediaLink(pokemonName){
	if(pokemons.length == 0){
		return 'error';
	}
	return 'http://bulbapedia.bulbagarden.net/wiki/'+pokemonName;
}

init();

module.exports = {
	getPokemonName: getPokemonName,
	getBulbapediaLink: getBulbapediaLink,
	getImageLink: getImageLink
};
