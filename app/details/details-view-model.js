const { Observable } = require("data/observable");
const CONSTANTS = require("~/shared/constants.json");

class DetailsViewModel extends Observable {
  constructor(note) {
    super();
    this.title = note.title;
    this.content = note.content;
    this.key = note.key;
  }
}

exports.DetailsViewModel = DetailsViewModel;
