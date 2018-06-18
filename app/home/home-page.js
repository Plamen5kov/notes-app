const { HomeViewModel } = require("./home-view-model");
const { topmost } = require("tns-core-modules/ui/frame");
let fbLoginModel = require("~/login/facebook/fb-login-api");

let vm;

function onNavigatingTo(args) {
  const page = args.object;

  vm = new HomeViewModel();
  page.bindingContext = vm;
}

function onItemTap(args) {
  topmost().navigate({
    moduleName: 'details/details-page',
    context: vm.notes[args.index],
    animated: true,
    transition: {
      name: "curl"
    }
  });
}

function logout(args) {
  fbLoginModel.logout().then(function (data) {
    topmost().navigate({ moduleName: "login/login-page" });
  });
}

function add(args) {
  topmost().navigate({ moduleName: "create/create-page" });
}

exports.logout = logout;
exports.add = add;
exports.onNavigatingTo = onNavigatingTo;
exports.onItemTap = onItemTap;
