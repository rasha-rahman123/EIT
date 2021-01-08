import { createContext, useEffect, useState } from "react";
import firebase from 'firebase'
import Router from "next/router";
import axios from "axios";


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loadingAuthState, setLoadingAuthState] = useState(true);
    const [token, setToken] =  useState(typeof window !== 'undefined' && localStorage.getItem("token"));
    const [uuid, setUuid] = useState(null)
useEffect(() => {
    user && firebase.auth().currentUser.getIdToken()
    .then((idToken) => {
      // idToken can be passed back to server.
      localStorage.setItem("token", idToken)
      setToken(idToken)
     
    })
    .catch((error) => {
      // Error occurred.
    });

    if(user != null) {
        setUuid(user.uid)
    }
},[user])
useEffect(() => {
    !user && firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoadingAuthState(false);
      user && setUuid(user.uid)
   });

   
  
}, [user]);


// useEffect(() => {
 
//   token && axios('/api/sites',{
//     params: {token: token}
//   }).then(data => console.log(data))
// },[token])

function logout() {
    firebase.auth().signOut();
    setUser(null)
    localStorage.removeItem('token')
    //set the token back to original state
    setToken(null)
    Router.push("/");
}

function login(email, pass) {
  setLoadingAuthState(true)
    return firebase
    .auth()
    .signInWithEmailAndPassword(email, pass)
    .then(res => {
      setUser(res);
      setLoadingAuthState(false);
      Router.push("/home");
   })
    .catch(error => {
    console.log(error.message);
    alert(error.message);
   });
}

useEffect(() => {
  const unsub = firebase.auth().onAuthStateChanged(() => {
    setUser(false);
    setLoadingAuthState(false)
    return false;
  })

  return () => unsub()
}, [])
return (
    <AuthContext.Provider
     value={{
          user,
          authenticated: user !== null,
          setUser,
          loadingAuthState,
          token,
          logout,
          login,
          uuid
    }}>
      {children} 
   </AuthContext.Provider>
  );
}
