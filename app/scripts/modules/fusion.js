/**
 * Created by Zashy on 7/13/2015.
 */
var randomPokemon = require('./../modules/randomPokemon.js');

function init(){
	document.getElementById('generate').addEventListener('click', generate, false);
}

function generate() {
	var pokemons = randomPokemon.getPokemon();
	console.log(JSON.stringify(pokemons));
}

function loadFusion(pokemon1, pokemon2){
	// once we have the two pokemon numbers, time to update the page
}

init();

module.exports = {
	generate: generate
};