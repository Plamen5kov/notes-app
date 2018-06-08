const ObservableArray = require("tns-core-modules/data/observable-array")
  .ObservableArray;
const Observable = require("tns-core-modules/data/observable").Observable;

const colors = ["red", "green", "blue"];
debugger;
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
  debugger;
  const page = args.object;
  const vm = new Observable();
  var notesList = page.findViewById("lv_notes");
  console.log(notesList);
  notesList.refresh();

  vm.set("myItems", colors);
  vm.set("mySecondItems", secondArray);

  page.bindingContext = vm;
}

module.export = onNavigatingTo;
