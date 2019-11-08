const userInput = {};

const validSignUp = {
    firstname: 'Aphrodice',
    lastname: 'Izabayo',
    email: 'izabayoaphrodisce@gmail.com',
    password: 'thisismehere',
};

const validUserSignUp = {
    firstname: 'aaaaa',
    lastname: 'bbbbbbb',
    email: 'abcd@gmail.com',
    password: 'uuuuuu',
};
const invalidSignUp = {
    firstname: 'Aphrodice',
    email: 'aphrodis@kepler.org',
    password: 'thisismehere',
};
const emailExists = {
    firstname: 'Aphrodice',
    lastname: 'lastname',
    email: 'izabayoaphrodis@gmail.com',
    password: 'anotherpassword',
};
const wrongUser = {
    email: 'izabayo1@kepler.org',
    password: 'iamheretoo',
};
const validUserSignIn = {
    email: 'izabayoaphrodis@gmail.com',
    password: 'thisismehere',
};
const wrongUserPassword = {
    email: 'izabayoaphrodis@gmail.com',
    password: 'incorrectpassword',
};
const wrongUserEmail = {
    email: 'wrongemail@gmail.com',
    password: 'thisismehere',
};

userInput.validSignUp = validSignUp;
userInput.validUserSignUp = validUserSignUp;
userInput.invalidSignUp = invalidSignUp;
userInput.emailExists = emailExists;
userInput.wrongUser = wrongUser;
userInput.validUserSignIn = validUserSignIn;
userInput.wrongUserPassword = wrongUserPassword;
userInput.wrongUserEmail = wrongUserEmail;

export default userInput;
