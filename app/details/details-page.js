const { DetailsViewModel } = require("./details-view-model");
const { topmost } = require("tns-core-modules/ui/frame");
const {
  loaderShow,
  loaderHide,
  showSuccess,
  showError
} = require("~/shared/utils");
const dialogs = require("ui/dialogs");
const { addNote, delNote, updateNote } = require("~/shared/firebase-helper");

let detailsViewModel;
function onNavigatingTo(args) {
  const page = args.object;
  const note = args.context;

  detailsViewModel = new DetailsViewModel(note);
  page.bindingContext = detailsViewModel;
}

function goBack() {
  topmost().goBack();
}

function saveNote() {
  if (detailsViewModel.title && detailsViewModel.content) {
    // save to database
    updateNote({
      key: detailsViewModel.key,
      title: detailsViewModel.title,
      content: detailsViewModel.content
    }).then(
      res => {
        // show success toast
        showSuccess("Successfully saved note!");

        // navigate to home/home-page
        goBack();
      },
      err => {
        console.log(err);
        showError(err);
      }
    );
  } else {
    showError("Just delete the note!");
  }
}

function deleteNote() {
  //delete note from firebase
  delNote(detailsViewModel.key).then(() => {
    //navigate to home page
    goBack();
  });
}

function goBack() {
  topmost().navigate({
    moduleName: "home/home-page"
  });
}

exports.saveNote = saveNote;
exports.deleteNote = deleteNote;
exports.goBack = goBack;
exports.onNavigatingTo = onNavigatingTo;
