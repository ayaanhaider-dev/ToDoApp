import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail // Add this import statement
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyC-F5rDiUwLzMMuA-QuL2q77yBI5C8EfY8",
  authDomain: "todoapp-ayaan.firebaseapp.com",
  projectId: "todoapp-ayaan",
  storageBucket: "todoapp-ayaan.appspot.com",
  messagingSenderId: "351849336513",
  appId: "1:351849336513:web:fe72a771273c79f9730e40",
  measurementId: "G-QQN670R5HW",
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseFirestore = getFirestore(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const querySnapshot = await getDocs(collection(firebaseFirestore, `users/${user.uid}/todos`));
        const todosData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTodos(todosData);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    if (user) {
      fetchTodos();
    }
  }, [user]);

  const createTodo = async (text) => {
    try {
      const newTodo = { text, completed: false };
      const todoRef = await addDoc(
        collection(firebaseFirestore, `users/${user.uid}/todos`),
        newTodo
      );
      setTodos((prevTodos) => [...prevTodos, { id: todoRef.id, ...newTodo }]);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await deleteDoc(
        doc(firebaseFirestore, `users/${user.uid}/todos`, todoId)
      );
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateTodo = async (todoId, updates) => {
    try {
      await updateDoc(
        doc(firebaseFirestore, `users/${user.uid}/todos`, todoId),
        updates
      );
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId ? { ...todo, ...updates } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const signupUserWithEmailAndPassword = (userName, email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const signinUserWithEmailPassword = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const signInWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  const logoutUser = () => signOut(firebaseAuth);

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      console.log("Password reset email sent successfully!");
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  };

  const isLoggedIn = !!user;

  return (
    <FirebaseContext.Provider
      value={{
        user,
        todos,
        createTodo,
        deleteTodo,
        updateTodo,
        signupUserWithEmailAndPassword,
        signinUserWithEmailPassword,
        signInWithGoogle,
        logoutUser,
        resetPassword,
        isLoggedIn,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
