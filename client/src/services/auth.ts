import { useEffect, useState } from "react";
import {
  User,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

/**
 * Simple hook to handle Firebase user authentication
 * @returns [the user - if authenticated, the login function, the logout function]
 */
export function useFirebaseUser(): [
  User | null | undefined,
  (email: string, password: string) => Promise<void>,
  () => Promise<void>
] {
  const [user, setUser] = useState<User | null | undefined>();

  useEffect(() => {
    // Check if user is already signed in
    const unsubscribe = auth.onAuthStateChanged(setUser);

    return () => unsubscribe();
  }, []);

  const handleEmailLogin = async (email: string, password: string) => {
    // Enable session persistence
    await auth.setPersistence(browserLocalPersistence);

    // Sign in with Email
    const result = await signInWithEmailAndPassword(auth, email, password);

    // Retrieve user and token from the result
    const user = result.user;
    setUser(user);

    // Use the token for authentication
    console.log("Logged in. ID Token:", user.uid);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return [user, handleEmailLogin, handleLogout];
}
