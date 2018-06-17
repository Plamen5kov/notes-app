var Observable = require("data/observable").Observable;
let appSettings = require("tns-core-modules/application-settings");
var CONSTANTS = require("~/shared/constants.json");

class HomeViewModel extends Observable {
  constructor() {
    super();
    console.log("CREATED MAIN VIEW MODEL");
    this.avatarUrl = appSettings.getString(CONSTANTS.AVATAR_URL);
    // get user token to authenticate against firebase db
    // fetch all entries from firebase db for that user
  }
}

exports.HomeViewModel = HomeViewModel;
