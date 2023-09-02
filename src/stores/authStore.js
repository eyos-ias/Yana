
import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut
} from 'firebase/auth';
import { writable } from 'svelte/store';
import { auth } from '../lib/firebase/firebase';

export const authStore = writable({
	isLoading: true,
	currentUser: null
});

export const authHandlers = {
	signUp: async (email, password) => {
		await createUserWithEmailAndPassword(auth, email, password);
	},
	login: async (email, password) => {
		await signInWithEmailAndPassword(auth, email, password);
	},
	logOut: async () => {
		await signOut();
	},
	resetPassword: async (email) => {
		await sendPasswordResetEmail(auth, email);
	}
};
