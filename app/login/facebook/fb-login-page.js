var EventData = require("data/observable").EventData;
var Page = require("ui/page").Page;
var loginViewModel = require("./fb-login-view-model");

function pageLoaded(args) {
  // Get the event sender
  let page = args.object;
  page.bindingContext = new loginViewModel.getLoginViewModel();
}

exports.pageLoaded = pageLoaded;
