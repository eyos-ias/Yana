// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, deleteApp } from 'firebase/app';
import { initializeFirestore, getFirestore } from 'firebase/firestore';

import { getAuth, setPersistence, inMemoryPersistence } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDLziOtkXv6X5foWXyY9WjQIZAlpGpMy-Q',
	authDomain: 'yana-99cc9.firebaseapp.com',
	projectId: 'yana-99cc9',
	storageBucket: 'yana-99cc9.appspot.com',
	messagingSenderId: '283325457647',
	appId: '1:283325457647:web:832b10e37567a7d8bae71a',
	measurementId: 'G-6KG4G5ED8M'
};

// Initialize Firebase
let firebaseApp;
if (!getApps().length) {
	firebaseApp = initializeApp(firebaseConfig);
} else {
	firebaseApp = getApp();
	deleteApp(firebaseApp);
	firebaseApp = initializeApp(firebaseConfig);
}


// Initialize Firestore
//const firestore = initializeFirestore(firebaseApp);

// Export Firestore instance
export const db = getFirestore(firebaseApp);
console.log(db)
export const auth = getAuth(firebaseApp);
