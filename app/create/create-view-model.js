var Observable = require("data/observable").Observable;

class CreateViewModel extends Observable {
  constructor() {
    super();
    this.title = "";
    this.content = "";
  }
}

exports.CreateViewModel = CreateViewModel;
