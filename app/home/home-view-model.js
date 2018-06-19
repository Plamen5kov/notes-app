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
  constructor(page) {
    super();
    this.avatarUrl = getString(CONSTANTS.CURRENT_AVATAR_URL);
    this.userName = getString(CONSTANTS.CURRENT_USER_NAME) || "public user";
    this.notes = [];
    this.isEmpty = true;

    getNotes().then(
      res => {
        for (let prop in res) {
          this.set('isEmpty',false);
          this.notes.push({
            key: prop,
            title: res[prop].title,
            shortContent: truncateContent(res[prop].content),
            content: res[prop].content
          });
        }
        console.log(this.notes);
        page.getViewById("lv_notes").refresh();
      },
      err => {
        console.log(err);
      }
    );
  }
}

exports.HomeViewModel = HomeViewModel;
