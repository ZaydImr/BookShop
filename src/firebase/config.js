import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/analytics'


var firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const storage = firebase.storage();

const analytics = firebase.analytics();
//console.log(analytics);
analytics.logEvent('select_content', {
      content_type: 'image',
      content_id: 'P12453',
      items: [{ name: 'Kittens' }]
});


export {storage};
export  {firestore} ;
export default fire;