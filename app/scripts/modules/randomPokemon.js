/**
 * Created by Zashy on 7/14/2015.
 */
// Includes
var randomOrgAPI = require('./../utility/randomOrgAPI.js');

// variables
var count = 0,
	pokemon = null,
	pokemonData = null,
	recursionCount = 0,
	status = -1,
	error = 'oops :c',
	newData = false;

// constants
var NEW_SET_LIMIT =         4,  // limit at which to pull down a new set of pokemon
	POKEMON_SET_SIZE =      10, // size of data to request (WARNING: Demo data only has 10 records)
	POKEMON_MIN =           1,
	POKEMON_MAX =           721,
	RECURSION_TIMEOUT =     5,  // timeout to declare recursive wait function in error
	STATUS_READY =          0,
	STATUS_WAITING =        1,
	STATUS_ERROR =          2;

function init(){
	count = window.localStorage.getItem('randomOrg_Count');
	if(count == null){
		randomOrgAPI.requestNewRandomSet(POKEMON_SET_SIZE, POKEMON_MIN, POKEMON_MAX);
	}else{
		count = parseInt(count);
		if(count <= NEW_SET_LIMIT) {
			randomOrgAPI.requestNewRandomSet(POKEMON_SET_SIZE, POKEMON_MIN, POKEMON_MAX);
		}
	}
	setTimeout(requestWait, 500);
}

/* request a pokemon number (or pair?) can return an error
	return: {   pokemon1: #,
				pokemon2: #,
				error:    ''}
 */

function getPokemon(){
	var result = {
		pokemon1:   -1,
		pokemon2:   -1,
		status:     status,
		error:      'init'
	};
	switch(result.status){
		case STATUS_WAITING:
			result.error = 'ERROR: Data is not ready, something terrible is wrong! D:';
			break;
		case STATUS_ERROR:
			result.error = 'ERROR: Timeout waiting for data exceeded. =/';
			break;
		case STATUS_READY:
			if(pokemon == null){
				pokemon = JSON.parse(pokemonData);
				newData = false;
			}
			console.log(JSON.stringify(pokemon));
			if(newData == true){
				newData = false;
				console.log(pokemonData);
				console.log(count);
				// fancy append magic
				var pokemonTemp = JSON.parse(pokemonData),
					countTemp = POKEMON_SET_SIZE+count; //new count
				// need to take the last few numbers off of pokemon, and add them to the end of pokemonData
				for(i = POKEMON_SET_SIZE; i < countTemp; ++i){
					// we create a new array element on the data, and set it to the latest value on pokemon
					pokemonTemp[i] = popPokemon();
				}
				// pokemonTemp is now our combined array
				pokemon = pokemonTemp;
				count = countTemp;
				// save to localStorage
				window.localStorage.setItem('randomOrg_Result', JSON.stringify(pokemon));
			}else{/*pokemon and count are correct*/}
			result.pokemon1 = popPokemon();
			result.pokemon2 = popPokemon();
			if(status != STATUS_WAITING && count < NEW_SET_LIMIT){
				randomOrgAPI.requestNewRandomSet(POKEMON_SET_SIZE, POKEMON_MIN, POKEMON_MAX);
				setTimeout(requestWait, 500);
			}
			result.error = 'none';
			break;
	}
	return result;
}

function popPokemon(){
	var result = pokemon[count-1];
	count--;
	return result;
}

function requestWait(){
	status = STATUS_WAITING;
	if(recursionCount <= RECURSION_TIMEOUT) {
		recursionCount++;
		if (parseInt(window.localStorage.getItem('randomOrg_Count')) > NEW_SET_LIMIT) {
			// data is ready
			status = STATUS_READY;
			pokemonData = window.localStorage.getItem('randomOrg_Result');
			//count = window.localStorage.getItem('randomOrg_Count');
			newData = true;
		}else{
			setTimeout(requestWait, 500);
		}
	}else {
		status = STATUS_ERROR;
	}
}

init();

module.exports = {
	getPokemon: getPokemon
};