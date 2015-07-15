/**
 * Created by Zashy on 7/13/2015.
 */
var randomPokemon = require('./randomPokemon.js');
var nationalPokedex = require('./nationalPokedex.js');

function init(){
	document.getElementById('generate').addEventListener('click', generate, false);
}

function generate() {
	var pokemons = randomPokemon.getPokemon();
	console.log(JSON.stringify(pokemons));
	loadFusion(pokemons.pokemon1, pokemons.pokemon2);
}

function loadFusion(pokemon1, pokemon2){
	var html1 = '',
		html2 = '',
		element1 = document.createElement('figure'),
		element2 = document.createElement('figure'),
		pokemon1Name = nationalPokedex.getPokemonName(pokemon1),
		pokemon2Name = nationalPokedex.getPokemonName(pokemon2),
		pokemon1Link = nationalPokedex.getBulbapediaLink(pokemon1Name),
		pokemon2Link = nationalPokedex.getBulbapediaLink(pokemon2Name),
		pokemons = document.getElementsByClassName('pokemon'),
		fusions = document.getElementsByClassName('fusion-fig');

	if(fusions.length != 0){
		pokemons[0].removeChild(fusions[0]);
		// it's gone, so array is now length 1
		pokemons[1].removeChild(fusions[0]);
	}

	html1 += '<a class="th" href="'+pokemon1Link+'"><img src="./images/MissingNo..png" width="100px" height="100px"/></a>' +
			'<figcaption>'+pokemon1Name+'</figcaption>';
	html2 += '<a class="th" href="'+pokemon2Link+'"><img src="./images/MissingNo..png" width="100px" height="100px"/></a>' +
			'<figcaption>'+pokemon2Name+'</figcaption>';

	element1.innerHTML=html1;
	element1.className = 'fusion-fig';
	element2.innerHTML=html2;
	element2.className = 'fusion-fig';
	pokemons[0].appendChild(element1);
	pokemons[1].appendChild(element2);
}

init();

module.exports = {
	generate: generate
};