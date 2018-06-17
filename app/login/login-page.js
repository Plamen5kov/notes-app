const { topmost } = require("tns-core-modules/ui/frame");
const { LoginViewModel } = require("./login-view-model");

function onNavigatingTo(args) {
  if (args.isBackNavigation) {
    return;
  }

  const page = args.object;
  page.bindingContext = new LoginViewModel();
}

function fbSignIn() {
  signUp();
}

function signUp() {
  require("./facebook/fb-login-view-model").login();
  //   topmost().navigate({
  //     moduleName: "login/facebook/fb-login-page",
  //     animated: true,
  //     transition: { name: "curl" }
  //   });
}

exports.onNavigatingTo = onNavigatingTo;
exports.fbSignIn = fbSignIn;
exports.signUp = signUp;
