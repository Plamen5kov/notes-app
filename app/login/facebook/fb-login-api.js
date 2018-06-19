const { login, logout } = require("nativescript-facebook");
const {
  getString,
  setString,
  clear
} = require("tns-core-modules/application-settings");
const { getJSON } = require("tns-core-modules/http");
const CONSTANTS = require("~/shared/constants.json");

function facebookLogin() {
  return new Promise(function(resolve, reject) {
    login((err, fbData) => {
      if (err) {
        alert("Error during login: " + err.message);
      } else {
        setString(CONSTANTS.FACEBOOK_ACCESS_TOKEN, fbData.token);
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

function facebookLogout() {
  return new Promise(function(resolve, reject) {
    logout((err, data) => {
      if (err) {
        alert("Error during logout: " + err.message);
        reject(err);
      } else {
        clear();
        resolve(data);
      }
    });
  });
}

function getUserInfo() {
  return new Promise(function(resolve, reject) {
    const fbAccessToken = getString(CONSTANTS.FACEBOOK_ACCESS_TOKEN);
    let userInfo = {
      userName: "",
      userId: "",
      avatarUrl: ""
    };

    if (fbAccessToken) {
      getJSON(
        CONSTANTS.FACEBOOK_GRAPH_API_URL + "/me?access_token=" + fbAccessToken
      ).then(
        res => {
          userInfo.userName = res.name;
          setString(CONSTANTS.CURRENT_USER_NAME, userInfo.userName);

          userInfo.userId = res.id;
          setString(CONSTANTS.ID, userInfo.userId);

          getJSON(
            CONSTANTS.FACEBOOK_GRAPH_API_URL +
              "/" +
              userInfo.userId +
              "/picture?type=large&redirect=false&access_token=" +
              fbAccessToken
          ).then(
            res => {
              userInfo.avatarUrl = res.data.url;
              setString(CONSTANTS.CURRENT_AVATAR_URL, userInfo.avatarUrl);
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

exports.facebookLogin = facebookLogin;
exports.facebookLogout = facebookLogout;
