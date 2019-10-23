const userInput = {};

const validSignUp = {
    firstname: 'Aphrodice',
    lastname: 'Izabayo',
    email: 'izabayoaphrodis@gmail.com',
    password: 'thisismehere',
};
const invalidSignUp = {
    firstname: 'Aphrodice',
    lastname: 'izabayo',
    email: 'aphrodis@kepler.org',
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
userInput.invalidSignUp = invalidSignUp;
userInput.emailExists = emailExists;
userInput.wrongUser = wrongUser;
userInput.validUserSignIn = validUserSignIn;
userInput.wrongUserPassword = wrongUserPassword;
userInput.wrongUserEmail = wrongUserEmail;

export default userInput;
