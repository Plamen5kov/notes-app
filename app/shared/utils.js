const { LoadingIndicator } = require("nativescript-loading-indicator");
const {
  Feedback,
  FeedbackType,
  FeedbackPosition
} = require("nativescript-feedback");
const { clear, getString } = require("tns-core-modules/application-settings");
const CONSTANTS = require("~/shared/constants.json");
const { topmost } = require("tns-core-modules/ui/frame");

let loader, feedback;

class Loader {
  static loaderShow(message) {
    loader = new LoadingIndicator();
    message = message || "Loading...";
    const options = {
      message
    };

    loader.show(options);
  }

  static loaderHide() {
    loader.hide();
  }
}

class FeedbackHelper {
  static feedbackSuccess(message) {
    let FeedbackPlugin = require("nativescript-feedback");
    let feedback = new FeedbackPlugin.Feedback();
    feedback.show({
      title: "Success",
      message: message || "Success"
    });
    console.log(feedback);
  }

  static feedbackError(message) {
    feedback.error({
      title: message || "Something went wrong..."
    });
  }
}

function userIsSignedIn() {
  return !!getString(CONSTANTS.CURRENT_USER_NAME);
}

feedback = new Feedback();

class UserHelper {
  static getUserData() {
    return {
      id: "public"
    };
  }

  static getLoggedUser() {
    return {
      id: getString(CONSTANTS.ID) || "public"
    };
  }
}

function _navigate(path) {
  topmost().navigate({
    moduleName: path,
    clearHistory: true
  });
}

function logoutUser() {
  clear();
}

exports.navigateToPath = _navigate;
exports.logoutUser = logoutUser;
exports.userIsSignedIn = userIsSignedIn;
exports.loaderShow = Loader.loaderShow;
exports.loaderHide = Loader.loaderHide;
exports.showSuccess = FeedbackHelper.feedbackSuccess;
exports.showError = FeedbackHelper.feedbackError;

exports.getUserData = UserHelper.getUserData;
exports.getLoggedUser = UserHelper.getLoggedUser;
