const { HomeViewModel } = require("./home-view-model");
const Page = require("tns-core-modules/ui/page").Page;
let frameModule = require("tns-core-modules/ui/frame");
let fbLoginModel = require("~/login/facebook/fb-login-api");

function onNavigatingTo(args) {
  const page = args.object;

  page.bindingContext = new HomeViewModel();
}

function onItemTap(args) {}

function onAdd(args) {}

function onAvatarTap(args) {
  fbLoginModel.logout().then(function(data) {
    frameModule.topmost().navigate({ moduleName: "login/login-page" });
  });
}

exports.onAvatarTap = onAvatarTap;
exports.onAdd = onAdd;
exports.onNavigatingTo = onNavigatingTo;
