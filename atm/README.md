# Cash Machine

This is the big one!! :)

## Task
Make a command-line cash machine.

## Spec
The cash machine will:
1. Have a process where the user enters a card number and PIN
2. The process will then compare against the **collection** of users provided. (A collection is an array of objects)
3. If either the card number or PIN doesn't match then the user should be informed and the process restarted
4. The user gets 3 attempts before the system withholds the card, prompts the user and exits (going back to the start of the whole process)
5. If the user is successful in authenticating then they go through to a screen that asks them if they would like another service (0 = No, 1 = balance, 2 = withdraw).
6. 0 will cause an exit
7. 1 will show the user's balance
8. 2 will prompt a user for an amount then, if the user has insufficient funds - tell them; if the user has sufficient funds then decrement their balance by that amount
9. The process will repeatedly offer another service until 0 is entered, then the process resets to the beginning
