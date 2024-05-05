const { initializeApp } = require("firebase/app");

const { getAuth } = require("firebase/auth");
const { get } = require("firebase/database");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.apiId,
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

module.exports = {
  auth,
};
