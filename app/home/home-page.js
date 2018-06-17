const { HomeViewModel } = require('./home-view-model');
const { topmost } = require('tns-core-modules/ui/frame');

function onNavigatingTo(args) {
  const page = args.object;

  page.bindingContext = new HomeViewModel();
}

function onItemTap(args) {

}

function onAdd(args) {

}

exports.onAdd = onAdd;
exports.onNavigatingTo = onNavigatingTo;
