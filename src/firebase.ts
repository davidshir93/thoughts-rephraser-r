import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// your firebase config here
const firebaseConfig = {
	apiKey: 'AIzaSyCAqpGeNtZ3nLtfHwWkNpO4ijWe6mtep14',
	authDomain: 'thoughts-rephraser.firebaseapp.com',
	projectId: 'thoughts-rephraser',
	storageBucket: 'thoughts-rephraser.appspot.com',
	messagingSenderId: '814246135597',
	appId: '1:814246135597:web:8a5f058427e85bd2fc75a4',
	measurementId: 'G-09G13KERG7',
};
//init firebase app
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

//init services
const auth = getAuth();

export {
	app,
	db,
	auth,
	createUserWithEmailAndPassword,
	updateProfile,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
};
