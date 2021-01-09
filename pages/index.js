import Router from "next/router";
import Head from "next/head";

import { Box, Button, Image, Text } from "rebass";
import Layout from "../components/Layout";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Modal from 'react-modal'
import Typist from 'react-typist'


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    border: 'none',
    borderRadius: 30,
    boxShadow: '0px 0px 3px #00000040, 0px 0px 20px #00000015',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    zIndex:20
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#__next')
export default function Home() {

  const {token} = useContext(AuthContext)
  const [queries, setQueries] = useState()
  const [modalOpen, setModalOpen] = useState()
  useEffect(async () => {
    Router && (await setQueries(Router.query));
    Router && queries && queries.signup === 'success' &&  setModalOpen(true);
  }, [Router, queries]);

  useEffect(() => {
    Router.push('/login')
  },[])
  return (
   <Box sx={{zIndex: 10}}>
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
          color: "#2C2C2E",
          
          position: "relative",
          zIndex: 2,
        }}
      >
         Emotional<br />
        Intelligence <br />
        Trainer
      </Text>
      <Image
        src="/ToyFaces_Tansparent_BG_29.png"
        sx={{ position: "absolute", right: 0, bottom: 0 }}
      />
      {/* <Box
        sx={{
          background: "linear-gradient(0deg, #EDD0AB 35%, #3AACFF00)",
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "40%",
        }}
      /> */}
      <Modal  isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          style={customStyles}
          contentLabel="Congrats!"> <Typist><Text>Account has been made.</Text> <Text>Please verify now using email, afterwards, you will be able to login!!</Text> </Typist></Modal>
      <Box
        sx={{
          width: "100%",
          height: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 25,
          left: 0,
        }}
      >
        <Button
          sx={{
            width: 314,
            height: 70,
            borderRadius: 30,
            background: "white",
            color: "#0A70FF",
          }}
          onClick={() => token ? Router.push('/home') : Router.push('/login')}
        >
          Get Started
        </Button>
      </Box>
      </Box>
  );
}
