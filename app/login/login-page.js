const { LoginViewModel } = require("~/login/login-view-model");
const { topmost } = require("tns-core-modules/ui/frame");
let facebookApi = require("./facebook/fb-login-api");
var CONSTANTS = require("~/shared/constants.json");
var firebaseApi = require("~/login/firebase/firebase-api");
var utils = require("~/shared/utils");

const {
  loaderShow,
  loaderHide,
  showSuccess,
  showError
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

  if (utils.userIsSignedIn()) {
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
  console.log(require("~/shared/utils"));
  loaderShow();
  facebookApi.login().then(function(data) {
    _navigate("home/home-page");
    loaderHide();

    showSuccess("Successfully logged in with facebook!");
  });
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
