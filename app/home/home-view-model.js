const { Observable } = require("data/observable");
let appSettings = require("tns-core-modules/application-settings");
const CONSTANTS = require("~/shared/constants.json");
const { getNotes } = require('~/shared/firebase-helper');

function truncateContent(content) {
  return (content.substring(0, Math.min(150, content.length)) + (content.length > 150 ? '...' : ''));
}

class HomeViewModel extends Observable {
  constructor() {
    super();
    this.avatarUrl = appSettings.getString(CONSTANTS.AVATAR_URL);
    this.userName = appSettings.getString(CONSTANTS.USER_NAME);
    // get user token to authenticate against firebase db
    // fetch all entries from firebase db for that user
    this.notes = [];

    getNotes().then((res) => {
      for (var prop in res) {
        this.notes.push({
          key: prop,
          title: res[prop].title,
          shortContent: truncateContent(res[prop].content),
          content: res[prop].content
        });
      }
      console.log(this.notes);
    }, (err) => {
      console.log(err);
    });

  }
}

exports.HomeViewModel = HomeViewModel;
