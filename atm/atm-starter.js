var R = require('ramda'); // Helps with {}s and []s http://ramdajs.com/docs/#find
var prompt = require('prompt');
prompt.start(); // Lets you prompt the user for info

// Dummy Users


// Prompt (which is Async) works like this:
prompt.get(['username', 'password'], function(err, result) {
    if (err) { // Handle error
        return err;
    }

});
