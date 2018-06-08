const ObservableArray = require("tns-core-modules/data/observable-array")
  .ObservableArray;
const Observable = require("tns-core-modules/data/observable").Observable;
const Frame = require("ui/frame");

const colors = ["red", "green", "blue"];
const vm = new Observable();
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

  var notesList = page.getViewById("lv_notes");
  console.log(notesList);
  //   notesList.refresh();

  vm.set("myItems", colors);
  vm.set("mySecondItems", secondArray);

  page.bindingContext = vm;
}

function onItemTap(args) {
  var payload = "asdklajls;djkas";
  var itemContent = vm.get("mySecondItems").getItem(args.index);
  var navigationContext = {
    moduleName: "details-view",
    context: {
      info: itemContent
    }
  };
  Frame.topmost().navigate(navigationContext);
}

function onAdd(args) {
  var navigationContext = {
    moduleName: "add-view",
    context: {
      info: "asdasdlhaj"
    }
  };
  Frame.topmost().navigate(navigationContext);
}

exports.onAdd = onAdd;
exports.onItemTap = onItemTap;
exports.onNavigatingTo = onNavigatingTo;
