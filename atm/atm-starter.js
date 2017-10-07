const R = require('ramda'); // Helps with {}s and []s http://ramdajs.com/docs/#find
const prompt = require('prompt');
const colors = require("colors/safe");
const users = require('./usersObject');
const schema = require('./schema');

prompt.message = null;
prompt.delimiter = colors.green(":");

let currentUser = {};

getUserInput(schema.card)
    .then((cardNumber) => {
        findUser(cardNumber)
    })
    .then(() => {
        getUserInput(schema.pin)
        .then((pin) => {
            validatePin(pin)
        })
    })

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
    if(currentUser.pin === parseInt(pin.pin)) {
        currentUser.authenticated = true
    } else {
        console.log(colors.red('Pin incorrect'))
        getUserInput(schema.pin)

    }
}
