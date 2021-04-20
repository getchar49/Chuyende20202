import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
//
//  var config = {
//    apiKey: "AIzaSyB3NVuO8DQHcvr6sAWbbEVClYzyxiV9nnQ",
//    authDomain: "react-slack-clone-5f19f.firebaseapp.com",
//    databaseURL: "https://react-slack-clone-5f19f.firebaseio.com",
//    projectId: "react-slack-clone-5f19f",
//    storageBucket: "react-slack-clone-5f19f.appspot.com",
//    messagingSenderId: "880398799219",
//    appId: "1:880398799219:web:cd0ecd00338efa0281b506",
//    measurementId: "G-9CSYLBTGTW"
//  };
//firebase.initializeApp(config);
//<!-- The core Firebase JS SDK is always required and must be listed first -->
//<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js"></script>
//
//<!-- TODO: Add SDKs for Firebase products that you want to use
//     https://firebase.google.com/docs/web/setup#available-libraries -->
//<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-analytics.js"></script>

//<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyCiawN8X_OPnRwWKIwtMMpLKS-nCZ0x-04",
authDomain: "chuyende20202.firebaseapp.com",
projectId: "chuyende20202",
storageBucket: "chuyende20202.appspot.com",
messagingSenderId: "726890515785",
appId: "1:726890515785:web:a6ff97a6eb51feeaea5e98",
measurementId: "G-XMMQ15N6FR"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
//  firebase.analytics();
//</script>

export default firebase;
