const { Observable } = require("data/observable");
let appSettings = require("tns-core-modules/application-settings");
const CONSTANTS = require("~/shared/constants.json");
const { getNotes } = require('~/shared/firebase-helper');

class HomeViewModel extends Observable {
  constructor() {
    super();
    this.avatarUrl = appSettings.getString(CONSTANTS.CURRENT_AVATAR_URL);
    this.userName = appSettings.getString(CONSTANTS.CURRENT_USER_NAME);
    // get user token to authenticate against firebase db
    // fetch all entries from firebase db for that user
    getNotes();
  }
}

exports.HomeViewModel = HomeViewModel;
