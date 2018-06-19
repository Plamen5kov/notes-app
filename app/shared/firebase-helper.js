const firebase = require("nativescript-plugin-firebase");
const { getLoggedUser } = require("~/shared/utils");

class FirebaseHelper {
  static get notesRoute() {
    return "/notes";
  }

  static addNote({ title, content }) {
    return new Promise(function(resolve, reject) {
      const userId = getLoggedUser().id;
      firebase
        .push(FirebaseHelper.notesRoute + "/" + userId, {
          title,
          content,
          createdAt: firebase.ServerValue.TIMESTAMP,
          author: getLoggedUser().id
        })
        .then(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  static getNotes() {
    return new Promise(function(resolve, reject) {
      const userId = getLoggedUser().id;
      let onQueryEvent = function(result) {
        // note that the query returns 1 match at a time
        // in the order specified in the query
        if (!result.error) {
          resolve(result.value);
        } else {
          console.log(result);
          reject(result.error);
        }
      };

      firebase.query(onQueryEvent, FirebaseHelper.notesRoute + "/" + userId, {
        singleEvent: true,
        orderBy: {
          type: firebase.QueryOrderByType.CHILD,
          value: "createdAt"
        }
      });
    });
  }
}

exports.addNote = FirebaseHelper.addNote;
exports.getNotes = FirebaseHelper.getNotes;
