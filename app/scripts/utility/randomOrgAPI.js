/**
 * Created by Zashy on 7/14/2015.
 */
var keyUtil = require('./../utility/keyUtil.js');

// function to process the xhr response
//dummy response
var response = '{"jsonrpc":"2.0","result":{"random":{"data":[420,289,161,113,487,720,50,702,418,317],"completionTime":"2015-07-14 18:15:55Z"},"bitsUsed":95,"bitsLeft":249905,"requestsLeft":999,"advisoryDelay":0},"id":"pokefusion"}';
response = JSON.parse(response);
function processRandomResponse(){
	var response = 'error';
	if(xhr.readyState == 4) { // done
		if (xhr.status == 200) {
			// success
			response = xhr.response;
		} else {
			//error
			response = xhr.response;
		}
	}
	console.log(response);
}

// request random integers from the server
// pokemon max = 721
function requestNewRandomSet(number, min, max){
	// impost API key from unversioned file
	var randomOrgAPI = keyUtil.getRandomOrgAPIKey();

	// xhr object, and json-rpc request data
	var xhr = new XMLHttpRequest(),
		data = {
			jsonrpc:    '2.0',
			method:     'generateIntegers',
			params:     {
				apiKey:     randomOrgAPI,
				n:          number,
				min:        min,
				max:        max
			},
			id:         'pokefusion'
		};

	/*
	 The following will request a new set of random integers. API key only allows 1000 requests per month
	 and a max data limit. Will need to do something about this involving storage, for now it's dummy data and javascript random
		optimal request # of numbers: 2000
	xhr.onreadystatechange = processRandomResponse;

	xhr.open('POST', 'https://api.random.org/json-rpc/1/invoke', true);
	xhr.setRequestHeader("Content-Type", "application/json-rpc;charset=UTF-8");
	xhr.responseType = 'json';
	xhr.send(JSON.stringify(data));
	 */
	// dummy code to emulate the xhr request, assume the following data might not exist immediately.
	window.localStorage.setItem('randomOrg_Count', number);
	window.localStorage.setItem('randomOrg_Result', JSON.stringify(response.result.random.data));
}

module.exports = {
	requestNewRandomSet: requestNewRandomSet
};
