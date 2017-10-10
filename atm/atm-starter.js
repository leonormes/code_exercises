const R = require('ramda'); // Helps with {}s and []s http://ramdajs.com/docs/#find
const prompt = require('prompt');
const colors = require("colors/safe");
const users = require('./usersObject');
const schema = require('./schema');

prompt.message = null;
prompt.delimiter = colors.green(":");

const state = {
	currentUser: {},
	stage: 0,
	attempts: 0,
	cardNo: null,
	pin: null
}

const choices = {
	'0': function exit() {
		console.log(colors.magenta('Goodbye ' + state.currentUser.name));
		setBalanceOnDB();
		resetState();
		loop()
	},
	'1': function displayBalance() {
		if (state.currentUser.authenticated) {
			console.log(colors.magenta('Your current balance is £' + state.currentUser.balance))
			getUserChoice();
		} else {
			console.log(colors.red('You need to re-authenticate'))
			loop();
		}
	},
	'2': function withdrawCash() {
		if (state.currentUser.authenticated) {
			getUserInput(schema.withdraw)
				.then((amount) => {
					if (!checkBalance(amount)) {
						console.log(colors.red('You do not have enough funds available for this transaction'));
					} else {
						state.currentUser.balance -= amount.amount;
						console.log(colors.magenta('Your new balance is £' + state.currentUser.balance));
					}
					getUserChoice();
				})

		} else {
			console.log(colors.red('You need to re-authenticate'))
			loop();
		}
	},
}


function loop() {
	prompt.start();
	switch (state.stage) {
		case 0:
			getUserInput(schema.card)
				.then((cardNumber) => {
					return findUser(parseInt(cardNumber.cardNumber))
				})
				.then((cardNumber) => {
					state.cardNo = parseInt(cardNumber.cardNumber);
					state.stage = 1;
					return loop();
				})
				.catch((err) => {
					console.log(err);
					resetState();
					return loop();
				})
			break;
		case 1:
			getUserInput(schema.pin)
				.then((pin) => {
					state.pin = parseInt(pin.pin);
					state.stage = 2;
					return loop();
				})
			break;

		case 2:
			//Validate the card and input
			findUser(state.cardNo)
				.then((userData) => {
					return validatePin(userData, state.pin);
				})
				.then((userData) => {
					state.currentUser = userData;
					state.stage = 3;
					return loop();
				})
				.catch((e) => {
					console.log(colors.red("Incorrect pin number", e));
					failedAuth();
					return loop();
				});
			break;
		case 3:
			getUserChoice();
		default:
			break;
	}
}

function failedAuth() {

	state.stage = 1
	state.attempts++;
	state.pin = null;
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
		prompt.get(type, function (err, result) {
			if (err) {
				return reject(err);
			} else {
				return resolve(result);
			}
		})
	})
}

function findUser(cardNumber) {
	return new Promise((resolve, reject) => {
		let user = R.find(R.propEq('cardNumber', cardNumber))(users);
		if (user === undefined) {
			return reject(colors.red('Error: Unknown Card'));
		} else {
			return resolve(user);
		}
	});
}

function getUserPin(userData) {
	return getUserInput(schema.pin)
		.then((pin) => {
			validatePin(pin)
		})
}

function validatePin(user, pin) {
	return new Promise((resolve, reject) => {
		if (user.pin === parseInt(pin)) {
			user.authenticated = true;
			resolve(user);
		} else {
			reject(colors.red('Pin Incorrect'));
		}
	});
}

function checkBalance(requestedAmount) {
	return requestedAmount.amount < state.currentUser.balance;
}

function setBalanceOnDB() {
	const dbref = R.findIndex(R.propEq('cardNumber', state.currentUser.cardNumber))(users);
	state.currentUser.balance = users[dbref].balance
	return;
}

function resetState() {
		state.currentUser = {};
		state.stage = 0
		state.attempts = 0;
		state.cardNo = null;
		state.pin = null;
}

loop()
