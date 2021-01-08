
import { Box, Text } from "rebass";
import { CgProfile } from "react-icons/cg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import Loading from "./Loading";
import firebase from 'firebase';
export const Layout = ({ children }) => {
  const { logout,token, uuid } = useContext(AuthContext);
  const [doc, setDoc] = useState(null)


  useEffect(() => {
   token && uuid &&  loadProfile()
  },[uuid,token])

  async function loadProfile() {
    const db = await firebase.firestore();
    const doc = await db.collection('Users').doc(uuid).get()
    if(!doc.exists){
      
    } else {
     setDoc(doc.data())
     console.log(doc.data())
     
    }
  }
  const [profileHover, setProfileHover] = useState(false);
  const [tokenCheck, setTokenCheck] = useState()
  const router = useRouter() 
  useEffect(() => {
    console.log(router.isFallback)
   router && !token && router.pathname !== '/' && router.pathname !== '/login' && router.push('/login')
   router && !token && router.pathname !== '/' && router.pathname !== '/login'  ? setTokenCheck(false) : setTokenCheck(true)
},[token,router])

  const [score, setScore] = useState();
 
  return (
    <Box
 
      sx={{
        minHeight: "100vh",
        position: "fixed",

        width: '100vw',
        backgroundImage:
          "linear-gradient(180.2deg, #2B85D8 0.83%, #EDB3D7 51.19%, #EDD0AB 100.56%)",
        backgroundBlendMode: "darken",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 3,
        overflow: 'hidden',
        userSelect: 'none',
        zIndex: 0,
      }}
    >
  

      {tokenCheck ?<> <Box
          sx={{
            
            position: "fixed",
            top: '7px',
            borderRadius: "12px 12px 12px 12px",
            background: "rgba(255, 255, 255,1)",
            display: router.pathname === '/' ? "none" : router.pathname === '/login' ? "none" : "grid",
            gridTemplateColumns: "50% 50%",
            alignItems: "center",
            height: 'auto',
            alignSelf: 'flex-start',
            width: "91%",
            px: 3,
            userSelect: 'element',
            zIndex: profileHover ? 4 : 2
          }}
          fontSize={3}
        >
          <Box>
            <Text onClick={() => router.push('/home')}
              sx={{
                textDecoration: "underline",
                textAlign: "left",
                textDecorationColor: "white",
                textUnderlineOffset: 2,
                textDecorationThickness: 3,
                fontWeight: 800,
                transition: 'all 300ms ease',
                fontSize: 5,
                cursor: 'pointer',
                ":hover":{
                  color: "black",
                backgroundClip: 'text'
                }
              }}
            >
              E I T
            </Text>
          </Box>
          <Box>
            <CgProfile
              style={{
                cursor: "pointer",
                textDecoration: "underline",
                textDecorationThickness: 4,
                textDecorationColor: "white",
                fontSize: 32,
                textAlign: "right",
                float: "right",
                fontWeight: 100,
                transform: profileHover ? 'rotate(360deg)' : 'rotate(0deg)',
                transition: 'transform 1s ease'
              }}
              onClick={() => setProfileHover(!profileHover)}
            />
          </Box>
          <Box></Box>
          <Box
            sx={{
              visibility: profileHover ? "visible" : "hidden",
              width: "100%",
              height: profileHover ? "auto" : 0,
              fontSize: 3,
              transform: profileHover ? "" : "translateY(-5vh)",
              transition: "all 300ms ease",
              opacity: profileHover ? 1 : 0,
              textAlign: "right",
            }}
          >
            <Text  onClick={() => setProfileHover(false)}>
              <Link href="/profile">
                <a>{doc && doc.firstName ? doc.firstName + "'s Account" : doc && doc.displayName && doc.displayName}</a>
              </Link>
            </Text>
            <Text  onClick={() => setProfileHover(false)}>
              <Link href="/profile">
                <a>Score: {doc && doc.score ? doc.score : 0}</a>
              </Link>
            </Text>
            <Text onClick={() => setProfileHover(false)}  sx={{ cursor: "pointer" }} onClick={() => logout()}>
              Sign Out
            </Text>
          </Box>
        </Box> <Box
        sx={{
          mt: router.pathname !== '/' && router.pathname !== '/login' && 60,
          minHeight: "98vh",
          
          maxHeight: "98vh",
          background: "rgba(255, 255, 255,1)",
          position: "relative",
          borderRadius: "12px 12px 12px 12px",
          overflowY: "scroll",
          width: "95%",
          display: "flex",
          justifyContent: "center",
          flexDirection: 'column',
          color: "#2C2C2E",
          userSelect: 'element',
          zIndex: 3,
          p: 4,
          
          "::-webkit-scrollbar": {
            width: 6,
            py: 1,
          },
          "::-webkit-scrollbar-thumb": {
            background: "#2C2C2E20",
            maxHeight: 20,
            borderRadius: '0px 200px 0px 0px',
          },
          
        }}
      >
       
        {children}
     
        <Box sx={{height: 40, width: '100%'}} />
      </Box></> : <Loading width={'100%'} height={'100%'} />}
    </Box>
  );
};

export default Layout;
