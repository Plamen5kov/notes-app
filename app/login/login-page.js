const { topmost } = require('tns-core-modules/ui/frame');
const { LoginViewModel } = require('./login-view-model');

function onNavigatingTo(args) {
    if (args.isBackNavigation) {
        return;
    }

    const page = args.object;
    page.bindingContext = new LoginViewModel();
}

function signIn() {
    signUp();
}

function signUp() {
    topmost().navigate({ 
        moduleName: 'home/home-page', 
        animated: true, 
        transition: { name: 'curl' } 
    });
}

exports.onNavigatingTo = onNavigatingTo;
exports.signIn = signIn;
exports.signUp = signUp;