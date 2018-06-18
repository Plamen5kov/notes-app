const { Observable } = require("data/observable");
let appSettings = require("tns-core-modules/application-settings");
const CONSTANTS = require("~/shared/constants.json");

class DetailsViewModel extends Observable {
  constructor(note) {
    super();
  }
}

exports.DetailsViewModel = DetailsViewModel;
