let appSettings = require("tns-core-modules/application-settings");
var CONSTANTS = require("~/shared/constants.json");
var firebase = require("nativescript-plugin-firebase");

function login() {
  return new Promise(function(resolve, reject) {
    firebase
      .login({
        type: firebase.LoginType.GOOGLE
      })
      .then(
        function(result) {
          appSettings.setString(CONSTANTS.CURRENT_USER_NAME, result.name);
          appSettings.setString(
            CONSTANTS.CURRENT_AVATAR_URL,
            result.profileImageURL
          );
          appSettings.setString(CONSTANTS.ID, result.uid);
          // JSON.stringify(result);
          resolve(true);
        },
        function(errorMessage) {
          console.log(errorMessage);
          reject(errorMessage);
        }
      );
  });
}

function logout() {
  return new Promise(function(resolve, reject) {
    firebase.logout().then(
      () => {
        resolve(true);
        appSettings.clear();
      },
      error => {
        reject(error);
      }
    );
  });
}

exports.login = login;
exports.logout = logout;
