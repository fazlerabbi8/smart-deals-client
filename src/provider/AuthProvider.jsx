import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import auth from "../firebase/firebase.init";



export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) =>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  }

  const googleLogin = () =>{
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }

  const logoutUser  = () =>{
    setLoading(true)
    return signOut(auth);
  }
  const AuthInfo = {
    signInUser,
    currentUser,
    createUser,
    setCurrentUser,
    logoutUser,
    loading,
    googleLogin,
  };

  // observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>{
         setCurrentUser(user)
         setLoading(false)
    })

    return () =>{
        unsubscribe();
    }
  }, []);
  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;