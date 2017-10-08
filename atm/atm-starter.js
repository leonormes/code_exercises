const R = require('ramda'); // Helps with {}s and []s http://ramdajs.com/docs/#find
const prompt = require('prompt');
const colors = require("colors/safe");
const users = require('./usersObject');
const schema = require('./schema');

prompt.message = null;
prompt.delimiter = colors.green(":");

let currentUser = {};

const choices = {
    '0': function exit() {
        console.log(colors.magenta('Goodbye ' + currentUser.name));
        init()
    },
    '1': function displayBalance() {
        if(currentUser.authenticated) {
        console.log(colors.magenta('Your current balance is $' + currentUser.balance))
        getUserChoice();
    } else {
        console.log(colors.red('You need to re-authenticate'))
        init();
    }
    },
    '2': function withdrawCash() {
        if(currentUser.authenticated) {
          getUserInput()
          .then((amount) => {
            if(!checkBalance(amount)) {
              console.log(colors.red('You do not have enough funds available for this transaction'));
              getUserChoice();
            } else {
              currentUser
            }
          })

        getUserChoice();
    } else {
        console.log(colors.red('You need to re-authenticate'))
        init();
    }
    },
}
init()

function init() {
    currentUser = {};
    getUserInput(schema.card)
        .then((cardNumber) => {
            findUser(cardNumber)
        })
        .then(() => {
            getUserInput(schema.pin)
                .then((pin) => {
                    validatePin(pin)
                })
                .then(() => {
                    getUserChoice(currentUser);
                })
        })
}

function getUserChoice() {
    console.log(colors.green('0 - Exit, 1 - Show Balance, 2 - Withdraw Cash'));
    getUserInput(schema.service)
        .then((choice) => {
            choices[choice.service]();
        });
}

function getUserInput(type) {
    return new Promise((resolve, reject) => {
        prompt.start();
        prompt.get(type, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    })
}

function findUser(cardNumber) {
    let user = R.find(R.propEq('cardNumber', parseInt(cardNumber.cardNumber)))(users);
    if (user === undefined) {
        console.log(colors.red('Unknown card'));
        getUserInput(schema.card);
    } else {
        currentUser = user;
        return;
    }
}

function validatePin(pin) {
    if (currentUser.pin === parseInt(pin.pin)) {
        currentUser.authenticated = true
    } else {
        console.log(colors.red('Pin incorrect'))
        getUserInput(schema.pin)

    }
}

function checkBalance(requestedAmount) {
  return requestedAmount < currentUser.balance;
}
