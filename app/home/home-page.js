const { HomeViewModel } = require("./home-view-model");
const { topmost } = require("tns-core-modules/ui/frame");
const { logoutUser } = require("~/shared/utils");
const { facebookLogout } = require("~/login/facebook/fb-login-api");
let homeViewModel;

function onNavigatingTo(args) {
  const page = args.object;
  homeViewModel = new HomeViewModel(page);
  page.bindingContext = homeViewModel;
}

function onItemTap(args) {
  topmost().navigate({
    moduleName: "details/details-page",
    context: homeViewModel.notes[args.index],
    animated: true,
    transition: {
      name: "curl"
    }
  });
}

function logout(args) {
  logoutUser();
  topmost().navigate({ moduleName: "login/login-page" });
}

function add(args) {
  topmost().navigate({ moduleName: "create/create-page" });
}

exports.logout = logout;
exports.add = add;
exports.onNavigatingTo = onNavigatingTo;
exports.onItemTap = onItemTap;
