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
                message: colors.red('4 digit pin only'),
                hidden: true,
                replace: '*',
                required: true
            },
        }
    },
    service: {
        properties: {
            service: {
                description: colors.green('Please enter a choice'),
                pattern: /^(0|1|2)$/,
                message: colors.red('1 of the options please'),
                require: true
            }
        }
    },
    withdraw: {
        properties: {
            amount: {
                description: colors.green('Please enter an amount'),
                type: number,
                required: true

            }
        }
    }
}

module.exports = schema;
