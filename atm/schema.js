const colors = require("colors/safe");
const schema = {
    card: {
        properties: {
            cardNumber: {
                description: colors.green('Please enter your 8 digit card number'),
                required: true,
                pattern: /^(\d{8})$/,
                message: '8 digits only'
            }
        }
    },
    pin: {
        properties: {
            pin: {
                description: colors.green('Please enter your 4 digit pin'),
                pattern: /^(\d{4})$/,
                message: colors.bgRed('4 digit pin only'),
                hidden: true,
                replace: '*',
                required: true
            },
        }
    }
}

module.exports = schema;
