import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
      apiKey: "AIzaSyC8nMUXaliMi41d8RJPgxUuaNwUWZSQs_Y",
      authDomain: "bookshop-management.firebaseapp.com",
      projectId: "bookshop-management",
      storageBucket: "bookshop-management.appspot.com",
      messagingSenderId: "374728188281",
      appId: "1:374728188281:web:66eb0fc691ca1306cd8fa8"
      };
      
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const storage = firebase.storage();
export {storage};
export  {firestore} ;
export default fire;