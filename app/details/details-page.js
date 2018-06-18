const { DetailsViewModel } = require("./details-view-model");
const { topmost } = require("tns-core-modules/ui/frame");

let vm;

function onNavigatingTo(args) {
  const page = args.object;
  const note = args.context;

  vm = new DetailsViewModel();
  page.bindingContext = vm;
}

function goBack() {
  topmost().goBack();
}

exports.goBack = goBack;
exports.onNavigatingTo = onNavigatingTo;
