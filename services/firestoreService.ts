
import { UserProfile } from '../types';

// Mock implementation of Firestore services

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
    console.log(`Getting profile for user: ${uid}`);
    const storedUser = localStorage.getItem('user');
    if(storedUser) {
        const user = JSON.parse(storedUser);
        if(user.uid === uid) return user;
    }
    return null;
}

export const createUserProfile = async (user: UserProfile): Promise<void> => {
    console.log("Creating user profile in Firestore:", user);
    // In a real app, this would be:
    // await firestore.collection('users').doc(user.uid).set(user, { merge: true });
    localStorage.setItem('user', JSON.stringify(user));
}
