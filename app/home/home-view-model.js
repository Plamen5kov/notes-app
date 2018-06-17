var Observable = require("data/observable").Observable;

class HomeViewModel extends Observable {
    constructor() {
        super();
        console.log("CREATED MAIN VIEW MODEL");

        // get user token to authenticate against firebase db
        // fetch all entries from firebase db for that user       
    }
}

exports.HomeViewModel = HomeViewModel;