const { Observable } = require("data/observable");
const CONSTANTS = require("~/shared/constants.json");

class DetailsViewModel extends Observable {
  constructor(note) {
    super();
  }
}

exports.DetailsViewModel = DetailsViewModel;
