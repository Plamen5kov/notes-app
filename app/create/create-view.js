const { CreateViewModel } = require("./create-view-model");
const { topmost } = require("tns-core-modules/ui/frame");
const {
  loaderShow,
  loaderHide,
  showSuccess,
  showError,
} = require("~/shared/utils");
const dialogs = require("ui/dialogs");
const { addNote } = require("~/shared/firebase-helper");

let vm;

function onNavigatingTo(args) {
  const page = args.object;

  vm = new CreateViewModel();
  page.bindingContext = vm;
}

function save() {
  if (vm.title && vm.content) {
    // save to database
    addNote({ title: vm.title, content: vm.content }).then((res) => {
      // show success toast
      showSuccess("Successfully saved note!");

      // navigate to home/home-page
      goBack();
    }, (err) => {
      console.log(err);
      showError(err);
    });
  } else {
    showError("You need to fill out both the title and content!");
  }
}

function discard() {
  // show dialog to confirm
  dialogs
    .confirm("Note will be discarded! Are you sure?")
    .then(function (discard) {
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

exports.onNavigatingTo = onNavigatingTo;
exports.discard = discard;
exports.save = save;
