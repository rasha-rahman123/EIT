import { createContext, useEffect, useState } from "react";
import firebase from 'firebase'
import Router from "next/router";
import nookies from 'nookies'


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loadingAuthState, setLoadingAuthState] = useState(true);
    const [token, setToken] =  useState(typeof window !== 'undefined' && localStorage.getItem("token"));
    const [uuid, setUuid] = useState(null)
useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user){
        setUser(null)
        nookies.destroy(null,'token')
        return;
      }
      const token = await user.getIdToken(true);
      setUser(user);
      nookies.set(undefined,"token", token, {});

    })
},[user])


// useEffect(() => {
 
//   token && axios('/api/sites',{
//     params: {token: token}
//   }).then(data => console.log(data))
// },[token])

function logout() {
    firebase.auth().signOut();
    setUser(null)

    nookies.destroy(null,'token')
    //set the token back to original state
    setToken(null)
    window.location.assign('/');
}

function login(email, pass) {
  setLoadingAuthState(true)
    return firebase
    .auth()
    .signInWithEmailAndPassword(email, pass)
    .then(res => {
      setUser(res);
      setLoadingAuthState(false);
      window.location.assign('/home')
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
