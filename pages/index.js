import Router from "next/router";
import Head from "next/head";
import Image from "next/image";
import { Box, Button, Text } from "rebass";
import Layout from "../components/Layout";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Modal from "react-modal";
import Typist from "react-typist";
import Logo from "../components/Logo";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: 30,
    boxShadow: "0px 0px 3px #00000040, 0px 0px 20px #00000015",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    zIndex: 20,
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#__next");
export default function Home() {
  const { token } = useContext(AuthContext);
  const [queries, setQueries] = useState();
  const [modalOpen, setModalOpen] = useState();
  const [pwa, setPwa] = useState(false);
  const [isApple, setIsApple] = useState();
  const [isMobile, setIsMobile] = useState();
  useEffect(async () => {
    Router && (await setQueries(Router.query));
    Router && queries && queries.signup === "success" && setModalOpen(true);
  }, [Router, queries]);
  useEffect(() => {
    const close = setTimeout(() => {
      setIsApple(false);
      setIsMobile(false);
    }, 7000);
    isApple && close;
  }, [isApple]);

  const logo = useMemo(() => <Logo width={48} animation={true} />,[ ])

  useEffect(() => {
  
    if (
      /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ) {
      setIsMobile(true);
    } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      setIsMobile(true);
      setIsApple(true);
    } else {
      return;
    }
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "100%",

        display: "flex",
        width: "100%",
        flexDirection: "column",
        p: 4,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 4,
          right: 4,
          fontSize: 1,
          color: "brayyy",
        }}
      >
        VERSION 0.0.1
      </Box>
      {/* <Box
        sx={{
          height: 64,
          width: 64,
          bg: "white",
          borderRadius: "50%",
          float: "right",
          display: "block",
          position: "relative",
        }}
      /> */}
      <Text
        sx={{
          fontWeight: 800,
          fontSize: 48,
          lineHeight: "80%",
          color: ['#2B85D7','brayyy'],
          
          position: "relative",
          zIndex: 2,
          justifyContent: 'center',
          alignTracks: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>{logo} Emotional</Box>

       <Box> Intelligence</Box>
      <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>  Trainer  <Box sx={{ display: "inline-block" }}>
          <Text
            sx={{
              display: "flex",
              fontSize: 1,
              bg: "red",
              height: 20,
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              px: 1,
              mx: 2,
              borderRadius: 6,
              color: "white",
            }}
          >
            BETA
          </Text>
        </Box></Box>
       
      </Text>
      <Box
        sx={{
          position: "absolute",
          left: 4,
          bottom: 4,
          boxShadow: 'large'
        }}
      >
        {" "}
        <Image src="/screenie.png" layout="intrinsic" width={500} height={300} />
      </Box>

      {pwa ? (
        <>
          <Text sx={{ mt: 3 }}>
            Welcome to the next best thing for your brain.
          </Text>
          <Text>
            We are currently running as a Progressive Web App which means
            installing our application is super quick and easy.
          </Text>
          <Box
            sx={{
              position: "fixed",
              width: "100vw",
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              left: 0,
            }}
          >
            <Box
              onClick={() => setIsApple(false)}
              sx={{
                width: 200,
                p: 3,
                borderRadius: 10,
                bg: "brayyy",
                opacity: 0.5,
                color: "white",
                textAlign: "center",
              }}
            >
              Apple Users, Click 'Add to Home Screen' to Install
            </Box>
            <Box
              sx={{
                width: 40,
                height: 10,
                bg: "brayyy",
                alignSef: "center",
                borderRadius: "0% 0% 50% 50%",
              }}
            ></Box>
          </Box>
        </>
      ) : (
        <>
          {" "}
          <Box
            sx={{
              position: "fixed",
              width: "100vw",
              bottom: 0,

              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              left: 0,
              zIndex: 15,
              display: isApple ? "flex" : "none",
            }}
          >
            <Box
              sx={{
                width: 200,
                p: 3,
                borderRadius: 10,
                bg: "brayyy",
                color: "white",
                textAlign: "center",
              }}
            >
              Apple Users, Add To Home Screen Here To Install
            </Box>
            <Box
              sx={{
                width: 40,
                height: 10,
                bg: "brayyy",
                alignSef: "center",
                borderRadius: "0% 0% 50% 50%",
              }}
            ></Box>
          </Box>
          <Box
            sx={{
              position: "fixed",
              width: "100vw",
              top: 0,

              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              right: 0,
              zIndex: 15,
              display: isMobile && !isApple ? "flex" : "none",
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 10,
                bg: "brayyy",
                alignSelf: "flex-end",
                mr: 4,
                borderRadius: "50% 50% 0% 0%",
              }}
            ></Box>
            <Box
              sx={{
                width: 200,
                p: 3,
                borderRadius: 10,
                bg: "brayyy",
                color: "white",
                alignSelf: "flex-end",
                textAlign: "center",
              }}
            >
              Android Users, Add To Home Screen Here To Install
            </Box>
          </Box>
          <Box
            width={320}
            height={563}
            sx={{ position: "absolute", right: 0, bottom: 0 }}
          >
            <Image
              src="/ToyFaces_Tansparent_BG_29.png"
              // sx={{ position: "absolute", right: 0, bottom: 0 }}
              layout="fill"
            />
          </Box>
          <Modal
            isOpen={modalOpen}
            onRequestClose={() => setModalOpen(false)}
            style={customStyles}
            contentLabel="Congrats!"
          >
            {" "}
            <Typist>
              <Text>Account has been made.</Text>{" "}
              <Text>
                Please verify now using email, afterwards, you will be able to
                login!!
              </Text>{" "}
            </Typist>
          </Modal>
          <Box
            sx={{
              width: "100%",
              height: 100,
              position: "relative",
              bottom: -30,
              display: "flex",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <Button
              sx={{
                width: 314,
                height: 70,
                borderRadius: 30,
                bg: "brayyy",
                color: "whitesmoke",
              }}
              onClick={() =>
                token ? Router.push("/home") : Router.push("/login")
              }
            >
              Get Started
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
