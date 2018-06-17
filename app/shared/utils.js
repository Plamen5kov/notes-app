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
        feedback.success({
            message: message || "Success"
        });
    }

    static feedbackError(message) {
        feedback.error({
            title: message || "Something went wrong..."
        });
    }
}

feedback = new Feedback();

exports.loaderShow = Loader.loaderShow;
exports.loaderHide = Loader.loaderHide;
exports.feedbackSuccess = FeedbackHelper.feedbackSuccess;
exports.feedbackError = FeedbackHelper.feedbackError;
