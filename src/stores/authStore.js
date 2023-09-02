
import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut
} from 'firebase/auth';
import { writable } from 'svelte/store';
import { auth } from '../lib/firebase/firebase';

export const authStore = writable({
	isLoading: false,
	currentUser: null
});

export const authHandlers = {
	signUp: async (email, password) => {
		await createUserWithEmailAndPassword(auth, email, password);
		localStorage.setItem('email', email);
	},
	login: async (email, password) => {
		await signInWithEmailAndPassword(auth, email, password);
		localStorage.setItem('email', email);
	},
	logOut: async () => {
		await signOut(auth);
	},
	resetPassword: async (email) => {
		await sendPasswordResetEmail(auth, email);
	}
};
