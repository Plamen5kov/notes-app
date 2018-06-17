var Observable = require("tns-core-modules/data/observable").Observable;
var facebookLib = require("nativescript-facebook");
let frameModule = require("tns-core-modules/ui/frame");
let appSettings = require("tns-core-modules/application-settings");

function _navigate(path) {
  let topmost = frameModule.topmost();
  topmost.navigate({
    moduleName: path,
    clearHistory: true
  });
}

function onLogin(eventData) {
  if (eventData.error) {
    alert("Error during login: " + eventData.error.message);
  } else {
    appSettings.setString("access_token", eventData.loginResponse.token);
    _navigate("main-page");
  }
}

function login() {
  facebookLib.fbLogin((err, fbData) => {
    if (err) {
      alert("Error during login: " + err.message);
    } else {
      appSettings.setString("access_token", fbData.token);
      this._navigate("home-page");
    }
  });
}

function getCurrentAccessToken() {
  let accessToken = facebookLib.getCurrentAccessToken();

  alert("Current access token: " + JSON.stringify(accessToken, null, "\t"));
}

function getLoginViewModel() {
  var loginViewModel = new Observable();

  loginViewModel.onLogin = onLogin;
  loginViewModel.login = login;
  loginViewModel.getCurrentAccessToken = getCurrentAccessToken;

  return loginViewModel;
}

exports.getLoginViewModel = getLoginViewModel;
