const { LoginViewModel } = require("~/login/login-view-model");
let fbApi = require("./facebook/fb-login-api");
var frameModule = require("tns-core-modules/ui/frame");
var CONSTANTS = require("~/shared/constants.json");
const {
  loaderShow,
  loaderHide,
  showSuccess,
  showError
} = require("~/shared/utils");

function _navigate(path) {
  let topmost = frameModule.topmost();
  topmost.navigate({
    moduleName: path,
    clearHistory: true
  });
}

function onNavigatingTo(args) {
  if (args.isBackNavigation) {
    return;
  }
  if (fbApi.userIsSignedIn()) {
    _navigate("home/home-page");
    return;
  }

  const page = args.object;
  page.bindingContext = new LoginViewModel();
}

function fbSignIn() {
  signUp();
}

function signIn() {
  signUp();
}

function signUp() {
  console.log(require("~/shared/utils"));
  loaderShow();
  fbApi.login().then(function(data) {
    _navigate("home/home-page");
    loaderHide();

    showSuccess("Successfully logged in!");
  });
}

exports.onNavigatingTo = onNavigatingTo;
exports.fbSignIn = fbSignIn;
exports.signIn = signIn;
exports.signUp = signUp;
