var prompt = require('prompt');
prompt.start(); // Lets you prompt the user for info

var money ={
  runningTotal: 0,
  budget: null
}
function setBudget() {
  console.log('Enter a budget:');
  prompt.get(['budget'], function(err, result) {
    if(err) {
      return err
    }
    money.budget = parseInt(result.budget)
    getAmount();
  })

}
function getAmount(){

  console.log('Enter amount (whole pounds)');
  prompt.get(['amount'], function (err, result) {
    if (err) {
      return err;
    }
    money.runningTotal += parseInt(result.amount);
    money.budget -= parseInt(result.amount);
    console.log(money)
    if(money.budget >= 0){
    getAmount();
  } else  {
    console.log('You are out of money dude!')
    return;
  }
  });

}
setBudget();
