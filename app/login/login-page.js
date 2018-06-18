const { LoginViewModel } = require("~/login/login-view-model");
const { topmost } = require("tns-core-modules/ui/frame");
let fbApi = require("~/login/facebook/fb-login-api");
var CONSTANTS = require("~/shared/constants.json");
var firebaseApi = require("~/login/firebase/firebase-api");

const {
  loaderShow,
  loaderHide,
  showSuccess,
  showError,
  userIsSignedIn
} = require("~/shared/utils");

const firebase = require("nativescript-plugin-firebase");

let firebaseInitialized = false;

function _navigate(path) {
  topmost().navigate({
    moduleName: path,
    clearHistory: true
  });
}

function onNavigatingTo(args) {
  if (args.isBackNavigation) {
    return;
  }

  if (!firebaseInitialized) {
    firebase.init({
      persist: true
    });
    firebaseInitialized = true;
  }

  if (userIsSignedIn()) {
    _navigate("home/home-page");
    return;
  }

  const page = args.object;
  page.bindingContext = new LoginViewModel();
}

function fbSignIn() {
  fbApi.login().then(function(data) {
    _navigate("home/home-page");
    loaderHide();

    showSuccess("Successfully logged in!");
  }, err => {
    loaderHide();
    showError("Failed to login with facebook. Err: " + err);
  });
}

function signIn() {
  signUp();
}

function signUp() {
  loaderShow();
  _navigate("home/home-page");
  loaderHide();
}

function googleSignIn() {
  loaderShow();
  firebaseApi.login().then(function(data) {
    _navigate("home/home-page");
    loaderHide();
    showSuccess("Successfully logged in with google!");
  });
}

exports.googleSignIn = googleSignIn;
exports.onNavigatingTo = onNavigatingTo;
exports.fbSignIn = fbSignIn;
exports.signIn = signIn;
exports.signUp = signUp;
