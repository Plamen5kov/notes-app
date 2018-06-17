const { LoginViewModel } = require("~/login/login-view-model");
let fbApi = require("./facebook/fb-login-api");
var frameModule = require("tns-core-modules/ui/frame");
var CONSTANTS = require("~/shared/constants.json");

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

function signUp() {
  fbApi.login().then(function(data) {
    _navigate("home/home-page");
  });
}

exports.onNavigatingTo = onNavigatingTo;
exports.fbSignIn = fbSignIn;
exports.signUp = signUp;
