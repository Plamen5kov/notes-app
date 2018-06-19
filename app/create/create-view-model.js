const { Observable } = require("data/observable");

class CreateViewModel extends Observable {
  constructor() {
    super();
    this.title = "";
    this.content = "";
  }
}

exports.CreateViewModel = CreateViewModel;
