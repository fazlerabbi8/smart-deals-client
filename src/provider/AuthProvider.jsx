import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import auth from "../firebase/firebase.init";



// eslint-disable-next-line react-refresh/only-export-components
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
         if(user){
          const loggedUser = {email: user.email};
          fetch('http://localhost:5000/token', {
            method: 'POST',
            headers: {
              'Content-type':'application/json'
            },
            body:JSON.stringify(loggedUser)
          })
          .then(res => res.json())
          .then(data => {
            console.log(data.token)
            localStorage.setItem("access-token", data.token);
          })
         }
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