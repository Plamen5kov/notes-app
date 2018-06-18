const { CreateViewModel } = require('./create-view-model');
const { topmost } = require('tns-core-modules/ui/frame');

let vm;

function onNavigatingTo(args) {
  const page = args.object;

  vm = new CreateViewModel();
  page.bindingContext = vm;
}

function save() {
  // save to database
  // show success toast
  // navigate to home/home-page
  console.log(vm.title, vm.content);
}

function discard() {
  // show dialog to confirm
  // navigate to home/home-page
}

exports.onNavigatingTo = onNavigatingTo;
exports.discard = discard;
exports.save = save;
