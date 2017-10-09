var prompt = require('prompt');
prompt.message = '?';
var schema ={
  properties: {
    year: {
      description: 'Year of Birth (YYYY)',
      pattern: /^\d{4}$/,
      message: 'needs to be of the format YYYY',
      required: true
    }
  }
}
prompt.start(); // Lets you prompt the user for info

prompt.get(schema, function(err, result) {
  console.log(result)
})
