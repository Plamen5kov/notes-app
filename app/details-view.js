function onNavigatingTo(args) {
  const page = args.object;
  console.log(args);
  var detailsLabel = page.getViewById("details_info");
  detailsLabel.text = args.context.info.title;
  console.log(detailsLabel);
}

exports.onNavigatingTo = onNavigatingTo;
