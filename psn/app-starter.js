var prompt = require('prompt');
prompt.message = '?';
prompt.colors = false;
prompt.start(); // Lets you prompt the user for info

var _pet_name = null;
var _mothersMaidenName = null;

// Prompt (which is Async) works like this:
prompt.get([{
  name: 'pet_name',
  description: 'your first pets name',
  type: 'string'},
{
  name: 'maidenName',
  description: 'Mothers maiden name',
  type: 'string'
}], function (err, result) {
  if (err) { // Handle error
    return err;
  }
  console.log('Your porn star name is: ' + result.pet_name + ' '
   + result.maidenName)

});
