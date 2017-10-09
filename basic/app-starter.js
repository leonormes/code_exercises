var prompt = require('prompt');
prompt.start(); // Lets you prompt the user for info

var _runningTotal = 0;
var _userBudget = null;

function getAmount(){
  console.log('Enter amount (whole pounds)');
  prompt.get(['amount'], function (err, result) {
    if (err) {
      return err;
    }


    // getAmount(); <-- to run continue running
  });
}

getAmount();
