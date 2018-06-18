const { LoadingIndicator } = require("nativescript-loading-indicator");
const { Feedback, FeedbackType, FeedbackPosition } = require("nativescript-feedback");

let loader, feedback;

class Loader {
    static loaderShow(message) {
        loader = new LoadingIndicator();
        message = message || 'Loading...';
        const options = {
            message
        }

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

feedback = new Feedback();

class UserHelper {
    static getUserData() {
        return {
            id: ''
        };
    }

    static getLoggedUser() {
        return {
            id: ''
        }
    }
}

exports.loaderShow = Loader.loaderShow;
exports.loaderHide = Loader.loaderHide;
exports.showSuccess = FeedbackHelper.feedbackSuccess;
exports.showError = FeedbackHelper.feedbackError;

exports.getUserData = UserHelper.getUserData;
exports.getLoggedUser = UserHelper.getLoggedUser;