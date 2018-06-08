function onNavigatingTo(args) {}
const Frame = require("ui/frame");
function onNavBtnTap(args) {
  Frame.topmost().goBack();
}
function saveNote(args) {
  var tvContent = args.object.parent.getViewById("tv_content");
  Frame.topmost().navigate({
    moduleName: "main-page"
  });
}

exports.saveNote = saveNote;
exports.onNavBtnTap = onNavBtnTap;
exports.onNavigatingTo = onNavigatingTo;
