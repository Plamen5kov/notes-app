const { CreateViewModel } = require("./create-view-model");
const { topmost } = require("tns-core-modules/ui/frame");
const {
  loaderShow,
  loaderHide,
  showSuccess,
  showError
} = require("~/shared/utils");
var dialogs = require("ui/dialogs");

let vm;

function onNavigatingTo(args) {
  const page = args.object;

  vm = new CreateViewModel();
  page.bindingContext = vm;
}

function save() {
  if (vm.title || vm.content) {
    // save to database

    // show success toast
    showSuccess("successfully saved note!");

    // navigate to home/home-page
    goBack();
  } else {
    showError("you need to have title or content!");
  }

  console.log(vm.title, vm.content);
}

function discard() {
  // show dialog to confirm
  dialogs.confirm("Your message").then(function(discard) {
    if (discard) {
      // navigate to home/home-page
      goBack();
    }
  });
}

function goBack() {
  topmost().navigate({
    moduleName: "home/home-page"
  });
}
exports.goBack = goBack;
exports.onNavigatingTo = onNavigatingTo;
exports.discard = discard;
exports.save = save;
