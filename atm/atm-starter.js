var R = require('ramda'); // Helps with {}s and []s http://ramdajs.com/docs/#find
var prompt = require('prompt');

var users = [
  {
    name: 'Leon',
    card_number: 01234567,
    pin: 3324,
    balance: 1433,
    accLocked: false,
    authenticated: false
  },
  {
    name: 'Toby',
    card_number: 88875654,
    pin: 1232,
    balance: 133,
    accLocked: false,
    authenticated: false
  }
]

prompt.start(); // Lets you prompt the user for info

// Dummy Users


// Prompt (which is Async) works like this:
prompt.get(['username', 'password'], function(err, result) {
    if (err) { // Handle error
        return err;
    }

});
