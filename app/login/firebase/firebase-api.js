const { setString, clear } = require("tns-core-modules/application-settings");
const CONSTANTS = require("~/shared/constants.json");
const {
  login,
  logout,
  init,
  LoginType
} = require("nativescript-plugin-firebase");

let firebaseInitialized = false;

function firebaseInit() {
  if (!firebaseInitialized) {
    console.log("init firebase");
    init({
      persist: true,

      onMessageReceivedCallback: function(message) {
        alert("Push message received");
        alert("Pesho sends his regards!");
        console.log("Title: " + message.title);
        console.log("Body: " + message.body);
        // if your server passed a custom property called 'foo', then do this:
        console.log("Value of 'foo': " + message.data.foo);
      }
    });
    firebaseInitialized = true;
  }
}

function firebaseLogin() {
  return new Promise(function(resolve, reject) {
    login({
      type: LoginType.GOOGLE
    }).then(
      function(result) {
        setString(CONSTANTS.CURRENT_USER_NAME, result.name);
        setString(CONSTANTS.CURRENT_AVATAR_URL, result.profileImageURL);
        setString(CONSTANTS.ID, result.uid);
        resolve(true);
      },
      function(errorMessage) {
        reject(errorMessage);
      }
    );
  });
}

function firebaseLogout() {
  return new Promise(function(resolve, reject) {
    logout().then(
      () => {
        resolve(true);
        clear();
      },
      error => {
        reject(error);
      }
    );
  });
}

exports.firebaseInit = firebaseInit;
exports.firebaseLogin = firebaseLogin;
exports.firebaseLogout = firebaseLogout;
