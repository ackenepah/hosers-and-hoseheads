import Rebase from 're-base';
import * as firebase from 'firebase';
// Initialize Firebase
var app = firebase.initializeApp({
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
});

var base = Rebase.createClass(app.database());

export const rebaseAuth = app.auth();
export default base;
