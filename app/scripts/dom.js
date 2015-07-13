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