let Observable = require("tns-core-modules/data/observable").Observable;
let facebookLib = require("nativescript-facebook");
let appSettings = require("tns-core-modules/application-settings");
let http = require("tns-core-modules/http");
var CONSTANTS = require("~/shared/constants.json");

function login() {
  return new Promise(function(resolve, reject) {
    facebookLib.login((err, fbData) => {
      if (err) {
        alert("Error during login: " + err.message);
      } else {
        appSettings.setString(CONSTANTS.FACEBOOK_ACCESS_TOKEN, fbData.token);
        getUserInfo().then(
          function(data) {
            console.log("successfully gathered user info");
            resolve(data);
          },
          function(err) {
            alert("Error getting user info: " + err);
            reject(err);
          }
        );
      }
    });
  });
}

function getCurrentAccessToken() {
  let accessToken = facebookLib.getCurrentAccessToken();

  alert("Current access token: " + JSON.stringify(accessToken, null, "\t"));
}

function getUserInfo() {
  return new Promise(function(resolve, reject) {
    const fbAccessToken = appSettings.getString(
      CONSTANTS.FACEBOOK_ACCESS_TOKEN
    );
    let userInfo = {
      userName: "",
      userId: "",
      avatarUrl: ""
    };

    if (fbAccessToken) {
      http
        .getJSON(
          CONSTANTS.FACEBOOK_GRAPH_API_URL + "/me?access_token=" + fbAccessToken
        )
        .then(
          res => {
            userInfo.userName = res.name;
            appSettings.setString(
              CONSTANTS.CURRENT_USER_NAME,
              userInfo.userName
            );

            userInfo.userId = res.id;
            appSettings.setString(CONSTANTS.ID, userInfo.userId);

            http
              .getJSON(
                CONSTANTS.FACEBOOK_GRAPH_API_URL +
                  "/" +
                  userInfo.userId +
                  "/picture?type=large&redirect=false&access_token=" +
                  fbAccessToken
              )
              .then(
                res => {
                  userInfo.avatarUrl = res.data.url;
                  appSettings.setString(
                    CONSTANTS.CURRENT_AVATAR_URL,
                    userInfo.avatarUrl
                  );
                  resolve(userInfo);
                },
                function(err) {
                  reject(err);
                  alert("Error getting user info: " + err);
                }
              );
          },
          function(err) {
            reject(err);
            alert("Error getting user info: " + err);
          }
        );
    }
  });
}

function logout() {
  return new Promise(function(resolve, reject) {
    facebookLib.logout((err, data) => {
      if (err) {
        alert("Error during logout: " + err.message);
        reject(err);
      } else {
        appSettings.clear();
        resolve(data);
      }
    });
  });
}

exports.login = login;
exports.logout = logout;
