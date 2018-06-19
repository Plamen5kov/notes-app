const { DetailsViewModel } = require("./details-view-model");
const { topmost } = require("tns-core-modules/ui/frame");

function onNavigatingTo(args) {
  const page = args.object;
  const note = args.context;

  page.bindingContext = new DetailsViewModel();
}

function goBack() {
  topmost().goBack();
}

exports.goBack = goBack;
exports.onNavigatingTo = onNavigatingTo;
