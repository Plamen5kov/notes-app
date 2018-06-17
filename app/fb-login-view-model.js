let Observable = require("tns-core-modules/data/observable").Observable;
let facebookLib = require("nativescript-facebook");
let frameModule = require("tns-core-modules/ui/frame");
let appSettings = require("tns-core-modules/application-settings");
let http = require("tns-core-modules/http");
const FACEBOOK_GRAPH_API_URL = "https://graph.facebook.com/v2.9";

function _navigate(path) {
  let topmost = frameModule.topmost();
  topmost.navigate({
    moduleName: path,
    clearHistory: true
  });
}

function onLogin(eventData) {
  if (eventData.error) {
    alert("Error during login: " + eventData.error.message);
  } else {
    appSettings.setString("access_token", eventData.loginResponse.token);
    getUserInfo().then(
      function(data) {
        _navigate("main-page");
        console.log("successfully gathered user info");
      },
      function(err) {
        alert("Error getting user info: " + err);
      }
    );
  }
}

function login() {
  facebookLib.fbLogin((err, fbData) => {
    if (err) {
      alert("Error during login: " + err.message);
    } else {
      appSettings.setString("access_token", fbData.token);
      this._navigate("home-page");
    }
  });
}

function getCurrentAccessToken() {
  let accessToken = facebookLib.getCurrentAccessToken();

  alert("Current access token: " + JSON.stringify(accessToken, null, "\t"));
}

function getLoginViewModel() {
  let loginViewModel = new Observable();

  loginViewModel.onLogin = onLogin;
  loginViewModel.login = login;
  loginViewModel.getCurrentAccessToken = getCurrentAccessToken;

  return loginViewModel;
}

function getUserInfo() {
  return new Promise(function(resolve, reject) {
    const fbAccessToken = appSettings.getString("access_token");
    let userInfo = {
      userName: "",
      userId: "",
      avararUrl: ""
    };

    if (fbAccessToken) {
      http
        .getJSON(FACEBOOK_GRAPH_API_URL + "/me?access_token=" + fbAccessToken)
        .then(
          res => {
            userInfo.userName = res.name;
            userInfo.userId = res.id;

            // Get logged in user's avatar
            // ref: https://github.com/NativeScript/NativeScript/issues/2176
            console.log(
              FACEBOOK_GRAPH_API_URL +
                "/" +
                userInfo.userId +
                "/picture?type=large&redirect=false&access_token=" +
                fbAccessToken
            );
            http
              .getJSON(
                FACEBOOK_GRAPH_API_URL +
                  "/" +
                  userInfo.userId +
                  "/picture?type=large&redirect=false&access_token=" +
                  fbAccessToken
              )
              .then(
                res => {
                  userInfo.avatarUrl = res.data.url;
                  appSettings.setString("avatar_url", userInfo.avatarUrl);
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

exports.getLoginViewModel = getLoginViewModel;

// put in action bar later
// <ActionBar title="My App" icon="" class="action-bar">
//     <ActionItem tap="onFbLogIn" ios.systemIcon="16" android.systemIcon="ic_subtract" ios.position="right" text="login">
//         <Image src="{{avatarUrl}}" class="avatar" height="30" padding="4"/>
//     </ActionItem>
//     <ActionItem tap="onAdd" ios.systemIcon="16" android.systemIcon="ic_add" ios.position="right" text="+"></ActionItem>
// </ActionBar>

// put in main page - on navigated to (attach to view model)
// if (avatarUrl) {
//   vm.avatarUrl = avatarUrl;
// } else {
//   vm.avatarUrl =
//     "https://scontent.fsof2-1.fna.fbcdn.net/v/t39.2365-6/17639236_1785253958471956_282550797298827264_n.png?_nc_cat=0&oh=f25ef350129d60efef163a5b78fca5ce&oe=5B9EDAEA";
// }

// put in main page - onFbLogin tap
// function onFbLogIn(args) {
//   if (appSettings.getString("access_token")) {
//     appSettings.clear();
//     Frame.topmost().navigate("main-page");
//   } else {
//     Frame.topmost().navigate("fb-login-page");
//   }
// }
// exports.onFbLogIn = onFbLogIn;
