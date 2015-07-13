/**
 * Created by Zashy on 7/13/2015.
 */
var keyUtil = require('./../utility/keyUtil.js');

var pokemon1 = 1,
	pokemon2 = 2;

var randomOrgAPI = keyUtil.getRandomOrgAPIKey();

function processRandomResult(){
}

var xhr = new XMLHttpRequest(),
	data = {
		"apiKey": '',
		"n":      10,
		"min":    1,
		"max":   721
	};
xhr.onreadystatechange = processRandomResults;

httpRequest.open('POST', 'https://api.random.org/json-rpc/1/invoke', true);
httpRequest.send(data);