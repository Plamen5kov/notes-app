const { LoginViewModel } = require("~/login/login-view-model");
let fbApi = require("./facebook/fb-login-api");
const { topmost } = require("tns-core-modules/ui/frame");
const CONSTANTS = require("~/shared/constants.json");
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

  if (fbApi.userIsSignedIn()) {
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
  }, (err) => {
    loaderHide();
    showError('Failed to login with facebook. Err: ' + err);
  });
}

function signIn() {
  signUp();
}

function signUp() {
  _navigate('home/home-page');
}

exports.onNavigatingTo = onNavigatingTo;
exports.fbSignIn = fbSignIn;
exports.signIn = signIn;
exports.signUp = signUp;
