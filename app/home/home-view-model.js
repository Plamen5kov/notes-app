var Observable = require("data/observable").Observable;
let appSettings = require("tns-core-modules/application-settings");
let fbLoginModel = require("login/facebook/fb-login-view-model");

class HomeViewModel extends Observable {
  constructor() {
    super();
    console.log("CREATED MAIN VIEW MODEL");
    this.avatarUrl = appSettings.getString("avatar_url");
    // get user token to authenticate against firebase db
    // fetch all entries from firebase db for that user
  }

  onAvatarTap() {
    fbLoginModel.logout();
  }
}

exports.HomeViewModel = HomeViewModel;
