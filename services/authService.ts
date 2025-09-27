
import { UserProfile } from '../types';

// Mock implementation of Firebase auth services

export const signInWithGoogle = async (): Promise<UserProfile> => {
  console.log("Signing in with Google...");
  // In a real app, this would use firebase.auth().signInWithPopup(provider)
  const mockUser: UserProfile = {
    uid: 'mock-uid-12345',
    displayName: 'Alex Doe',
    email: 'alex.doe@example.com',
    photoURL: 'https://picsum.photos/seed/alex/100/100',
  };
  localStorage.setItem('user', JSON.stringify(mockUser));
  // We reload to trigger the onAuthStateChanged listener in useAuth
  window.location.reload(); 
  return mockUser;
};

export const signOutUser = async (): Promise<void> => {
  console.log("Signing out...");
  // In a real app, this would use firebase.auth().signOut()
  localStorage.removeItem('user');
   window.location.reload();
};
