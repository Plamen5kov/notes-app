const ObservableArray = require("tns-core-modules/data/observable-array")
  .ObservableArray;
const Observable = require("tns-core-modules/data/observable").Observable;
const Frame = require("ui/frame");

const colors = ["red", "green", "blue"];
const secondArray = new ObservableArray([
  {
    title: "The Da Vinci Code"
  },
  {
    title: "Harry Potter and the Chamber of Secrets"
  },
  {
    title: "The Alchemist"
  },
  {
    title: "The Godfather"
  },
  {
    title: "Goodnight Moon"
  },
  {
    title: "The Hobbit"
  }
]);
function onNavigatingTo(args) {
  const page = args.object;
  const vm = new Observable();
  var notesList = page.getViewById("lv_notes");
  console.log(notesList);
  notesList.refresh();

  vm.set("myItems", colors);
  vm.set("mySecondItems", secondArray);

  page.bindingContext = vm;
}

exports.onNavigatingTo = onNavigatingTo;
