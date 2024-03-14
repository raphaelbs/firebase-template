import {
  CollectionReference,
  DocumentReference,
  collection,
  doc,
  setDoc,
  query,
  where,
  limit,
  getDocs,
} from "@firebase/firestore";
import { firestore } from "../firebase";
import { User } from "../../../../shared/example";

export const usersCol = () =>
  collection(firestore, "users") as CollectionReference<User>;

export const userDoc = (userUid: string) =>
  doc(firestore, "users", userUid) as DocumentReference<User>;

export class EmailAlreadyExistsError extends Error {
  constructor() {
    super("Email already exists");
    this.name = "EmailAlreadyExistsError";
  }
}

function createUser(email: string) {
  // This is a mock function that simulates creating a user
  // For instance, you can replace this with a call to the Firebase Authentication API
  return Promise.resolve({ user: { uid: "mock-uid" } });
}

export const addUser = async (user: User): Promise<void> => {
  if (await checkIfEmailExists(user.email)) {
    throw new EmailAlreadyExistsError();
  }
  const userCredential = await createUser(user.email);
  const userRef = userDoc(userCredential.user.uid);
  await setDoc(userRef, user);
};

export const fetchUsers = async () => {
  const usersRef = usersCol();
  const querySnapshot = await getDocs(usersRef);
  const users: (User & { uid: string })[] = [];
  querySnapshot.forEach((doc) => {
    users.push({
      uid: doc.id,
      ...doc.data(),
    });
  });
  return users;
};

export const checkIfEmailExists = async (email: string): Promise<boolean> => {
  const usersRef = usersCol();
  const q = query(usersRef, where("email", "==", email), limit(1));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    // Email already exists
    return true;
  }
  return false;
};
