function onNavigatingTo(args) {}
const Frame = require("ui/frame");
function onNavBtnTap(args) {
  Frame.topmost().goBack();
}
exports.onNavBtnTap = onNavBtnTap;
exports.onNavigatingTo = onNavigatingTo;
