var R = require('ramda'); // Helps with {}s and []s http://ramdajs.com/docs/#find
var prompt = require('prompt');

var users = [{
    name: 'Leon',
    card_number: 51234567,
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
];
const schema = {
  properties: {
    cardNumber: {
      description: 'Please enter your 8 digit card number:',
      required: true,
      pattern: /^(\d{8})$/,
      message: '8 digits only'
    },
    pin: {
      description: 'Please enter your 4 digit pin',
      pattern: /^(\d{4})$/,
      message: '4 digit pin only',
      hidden: true,
      replace: '*',
      required: true
    },
  },
};
init();
function init() {
  prompt.start();
  prompt.get(schema, function (err, result) {
    if (err) { // Handle error
      return err;
    }
    validateCard(result);
  });
};

function validateCard(result) {
  let cn = R.find(R.propEq('card_number', parseInt(result.cardNumber)))(users);
  if(cn === undefined) {
    console.log('Unknown card');
    init();
  } else {
    validatePin();
  }
}
