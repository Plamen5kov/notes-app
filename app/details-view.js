const Frame = require("ui/frame");
function onNavigatingTo(args) {
  const page = args.object;
  console.log(args);
  var detailsLabel = page.getViewById("details_info");
  detailsLabel.text = args.context.info.title;
  console.log(detailsLabel);
}
function onNavBtnTap(args) {
  Frame.topmost().goBack();
}
exports.onNavBtnTap = onNavBtnTap;

exports.onNavigatingTo = onNavigatingTo;
