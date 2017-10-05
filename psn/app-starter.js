var prompt = require('prompt');
prompt.start(); // Lets you prompt the user for info

var _pet_name = null;
var _mothersMaidenName = null;

console.log('What is the name of your first pet??');
// Prompt (which is Async) works like this:
prompt.get(['pet_name'], function (err, result) {
  if (err) { // Handle error
    return err;
  }

});
