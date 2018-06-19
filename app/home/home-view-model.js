const { Observable } = require("data/observable");
const { getString } = require("tns-core-modules/application-settings");
const CONSTANTS = require("~/shared/constants.json");
const { getNotes } = require("~/shared/firebase-helper");

function truncateContent(content) {
  return (
    content.substring(0, Math.min(150, content.length)) +
    (content.length > 150 ? "..." : "")
  );
}

class HomeViewModel extends Observable {
  constructor() {
    super();
    this.avatarUrl = getString(CONSTANTS.CURRENT_AVATAR_URL);
    this.userName = getString(CONSTANTS.CURRENT_USER_NAME);
    this.notes = [];

    getNotes().then(
      res => {
        for (let prop in res) {
          this.notes.push({
            key: prop,
            title: res[prop].title,
            shortContent: truncateContent(res[prop].content),
            content: res[prop].content
          });
        }
        console.log(this.notes);
      },
      err => {
        console.log(err);
      }
    );
  }
}

exports.HomeViewModel = HomeViewModel;
