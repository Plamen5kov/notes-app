const firebase = require('nativescript-plugin-firebase');
const { getLoggedUser } = require('~/shared/utils');

class FirebaseHelper {
    static get notesRoute() { return '/notes' };

    static addNote({ title, content }) {
        firebase.setValue(
            FirebaseHelper.notesRoute,
            {
                title,
                content,
                createdAt: firebase.ServerValue.TIMESTAMP,
                author: getLoggedUser.id
            }
        );
    }

    static getNotes() {
        const user = getLoggedUser();
        if (!user) {
            console.log('User not logged in!');
            return [];
        }

        var onQueryEvent = function (result) {
            // note that the query returns 1 match at a time
            // in the order specified in the query
            if (!result.error) {
                console.log("Event type: " + result.type);
                console.log("Key: " + result.key);
                console.log("Value: " + JSON.stringify(result.value));
            } else {
                console.log(result);
            }
        };

        firebase.query(
            onQueryEvent,
            FirebaseHelper.notesRoute,
            {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value: 'author'
                },
                equalTo: user.id
            }
        );
    }
}

exports.addNote = FirebaseHelper.addNote;
exports.getNotes = FirebaseHelper.getNotes;