var R = require('ramda'); // Helps with {}s and []s http://ramdajs.com/docs/#find
var prompt = require('prompt');
const users = require('./usersObject');

let currentUser = {};
const card = {
    properties: {
        cardNumber: {
            description: 'Please enter your 8 digit card number:',
            required: true,
            pattern: /^(\d{8})$/,
            message: '8 digits only'
        }
    }
}
const pin = {
    properties: {
        pin: {
            description: 'Please enter your 4 digit pin',
            pattern: /^(\d{4})$/,
            message: '4 digit pin only',
            hidden: true,
            replace: '*',
            required: true
        },
    }
}
getNumber(card)
    .then((cardNumber) => {
        validateCard(cardNumber)
    })
    getNumber(pin).then((pinNumber) => {
        validatePin(pinNumber)
    })

function getNumber(type) {
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

function validateCard(result) {
    let cn = R.find(R.propEq('card_number', parseInt(result.cardNumber)))(users);
    if (cn === undefined) {
        console.log('Unknown card');
        getNumber(card);
    } else {
        currentUser = cn;
        return;
    }
}

function validatePin(pin) {
    console.log(pin)
}
