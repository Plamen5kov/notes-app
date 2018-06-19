const { LoginViewModel } = require("~/login/login-view-model");
const { facebookLogin } = require("~/login/facebook/fb-login-api");
const {
  firebaseInit,
  firebaseLogin
} = require("~/login/firebase/firebase-api");
const {
  loaderShow,
  loaderHide,
  showSuccess,
  showError,
  userIsSignedIn,
  navigateToPath
} = require("~/shared/utils");

function onNavigatingTo(args) {
  if (args.isBackNavigation) {
    return;
  }

  firebaseInit();

  if (userIsSignedIn()) {
    navigateToPath("home/home-page");
    return;
  }

  const page = args.object;
  page.bindingContext = new LoginViewModel();
}

function signIn() {
  signUp();
}

function signUp() {
  loaderShow();
  navigateToPath("home/home-page");
  loaderHide();
}

function fbSignIn() {
  facebookLogin().then(
    function(data) {
      navigateToPath("home/home-page");
      loaderHide();

      showSuccess("Successfully logged in!");
    },
    err => {
      loaderHide();
      showError("Failed to login with facebook. Err: " + err);
    }
  );
}

function googleSignIn() {
  loaderShow();
  firebaseLogin().then(function(data) {
    navigateToPath("home/home-page");
    loaderHide();
    showSuccess("Successfully logged in with google!");
  });
}

exports.googleSignIn = googleSignIn;
exports.onNavigatingTo = onNavigatingTo;
exports.fbSignIn = fbSignIn;
exports.signIn = signIn;
exports.signUp = signUp;
