const { LoadingIndicator } = require("nativescript-loading-indicator");
const {
  Feedback,
  FeedbackType,
  FeedbackPosition
} = require("nativescript-feedback");
let appSettings = require("tns-core-modules/application-settings");
var CONSTANTS = require("~/shared/constants.json");

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
    var FeedbackPlugin = require("nativescript-feedback");
    var feedback = new FeedbackPlugin.Feedback();
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
  return !!appSettings.getString(CONSTANTS.CURRENT_USER_NAME);
}

feedback = new Feedback();

class UserHelper {
  static getUserData() {
    return {
      id: ""
    };
  }

  static getLoggedUser() {
    return {
      id: appSettings.getString(CONSTANTS.ID)
    };
  }
}

function logout() {
  
}

exports.logout = logout;
exports.userIsSignedIn = userIsSignedIn;
exports.loaderShow = Loader.loaderShow;
exports.loaderHide = Loader.loaderHide;
exports.showSuccess = FeedbackHelper.feedbackSuccess;
exports.showError = FeedbackHelper.feedbackError;

exports.getUserData = UserHelper.getUserData;
exports.getLoggedUser = UserHelper.getLoggedUser;
