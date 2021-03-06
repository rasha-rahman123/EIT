import { Box, Text } from "rebass";
import { CgProfile } from "react-icons/cg";
import { memo, useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import Loading from "./Loading";
import firebase from "firebase/app";
import axios from "axios";
import Footer from "./Footer";
import { parseCookies } from "nookies";
import Logo from "./Logo";
import { signOut, useSession } from "next-auth/client";

const sendEmail = async (email, message) => {
  
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)

export const Layout = ({ children }) => {
  const logo = useMemo(() => <Logo width={32} animation={false} />);
  const [session] = useSession()


  const router = useRouter();

  


 
  const [profileHover, setProfileHover] = useState(false);


  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "fixed",

        width: "100vw",
        backgroundImage:
          "linear-gradient(180.2deg, #2B85D8 0.83%, #EDB3D7 51.19%, #EDD0AB 100.56%)",
        backgroundBlendMode: "darken",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        overflow: "hidden",
        userSelect: "none",
        zIndex: 0,
      }}
    >
      <Box sx={{width: '95%'}}>
      <Box
            sx={{
              top: "7px",
              borderRadius: "12px 12px 12px 12px",
              background: "rgba(255, 255, 255,1)",
              display:
                router.pathname === "/"
                  ? "none"
                  : router.pathname === "/login"
                  ? "none"
                  : "grid",
              gridTemplateColumns: "75% 25%",
              alignItems: "center",
              height: "auto",
              alignSelf: "flex-start",
              width: "95%",
              px: 3,
              userSelect: "element",
              zIndex: profileHover ? 4 : 2,
              margin: "0 auto",
              transition: "all 300ms ease",
            }}
            fontSize={3}
          >
            <Box>
              <Text
                onClick={() =>
                  session ? router.push("/home") : router.push("/")
                }
                sx={{
                  textAlign: "left",

                  alignItems: "center",
                  display: "flex",
                  fontWeight: 800,
                  transition: "all 300ms ease",
                  fontSize: 5,
                  cursor: "pointer",
                  ":hover": {
                    color: "black",
                    backgroundClip: "text",
                  },
                }}
              >
                {logo}
                <Text ml={1}> E I T </Text>{" "}
                <Box sx={{ display: "inline-block" }}>
                  <Text
                    sx={{
                      display: "flex",
                      fontSize: 1,
                      bg: "red",
                      mx: 1,
                      transform: "scale(0.9) translateY(-1vh)",
                      height: 20,
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      px: 1,
                      borderRadius: 6,
                      color: "white",
                    }}
                  >
                    BETA
                  </Text>
                </Box>
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
                    transform: profileHover ? "rotate(360deg)" : "rotate(0deg)",
                    transition: "transform 1s ease",
                  }}
                  onClick={() => router.push('/profile')}
                />
              </Box>
            
          </Box>
      </Box>
          <Box
            sx={{
              height:
                router.pathname == "/" || router.pathname == "/login"
                  ? "90vh"
                  : "83vh",
              mt: router.pathname !== "/" && router.pathname !== "/login" && 3,

              background: "rgba(255, 255, 255,1)",
              position: "relative",
              borderRadius: "12px 12px 12px 12px",
              overflowY: "scroll",
              width: "95%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              color: "#2C2C2E",
              userSelect: "element",
              zIndex: 3,
              p: 4,

              "::-webkit-scrollbar": {
                width: 6,
                py: 1,
              },
              "::-webkit-scrollbar-thumb": {
                background: "#2C2C2E20",
                maxHeight: 20,
                borderRadius: "0px 200px 0px 0px",
              },
            }}
          >
            {children}
          </Box>
          <Footer />
    </Box>
  )
};

export default Layout;
