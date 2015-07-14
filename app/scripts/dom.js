/**
 * Created by Zashy on 7/12/2015.
 */
var $ = require('jquery');

function append(html){
    $('body').append(html);
}

module.exports = {
    append: append
};

var response = '{"jsonrpc":"2.0","result":{"random":{"data":[420,289,161,113,487,720,50,702,418,317],"completionTime":"2015-07-14 18:15:55Z"},"bitsUsed":95,"bitsLeft":249905,"requestsLeft":999,"advisoryDelay":0},"id":"pokefusion"}';