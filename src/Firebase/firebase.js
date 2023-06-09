import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	onAuthStateChanged,
} from 'firebase/auth';
import { toast } from 'react-toastify';

const firebaseConfig = {
	apiKey: 'AIzaSyB-3e0urCAKgAFYJOU697uVOuk2Yv5sYwY',
	authDomain: 'quizerrs.firebaseapp.com',
	projectId: 'quizerrs',
	storageBucket: 'quizerrs.appspot.com',
	messagingSenderId: '358887523280',
	appId: '1:358887523280:web:225d5e6d3371e451af6fd5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const dbStore = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
	try {
		const res = await signInWithPopup(auth, googleProvider);
		const user = res.user;
	} catch (err) {
		toast.error('Auth failed, try signing in again', {
			position: toast.POSITION.TOP_CENTER,
		});
	}
};

export { db, dbStore, auth, signInWithGoogle, onAuthStateChanged };
