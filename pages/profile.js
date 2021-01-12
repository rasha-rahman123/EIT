import { Box, Text } from "rebass";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Router from "next/router";
import {useSession, signOut} from 'next-auth/client'
import axios from "axios";
import Loading from "../components/Loading";


const Profile = (props) => {
  const [session] = useSession();
  const [score,setScore] = useState();
 function addScore() {
   axios('/api/addScore',{
      params: {name: session.user.email}
     })
 
   }

  useEffect(() => {
    async function getScore() {
      await axios('/api/getScore',{
        params: {name: session.user.email}
       }).then(data => setScore(data.data))
   
     }

     session && getScore()
  },[session])

  async function deleteProfile() {
    if (window.confirm("Do you really want to delete your account?")) {
      const db = await firebase.firestore();
      const doc = await db.collection("Users").doc(uuid);
      const user = await firebase.auth().currentUser;
      user
        .delete()
        .then(() => {
          doc.delete();
          logout();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return ( session ?
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          
          p: 4,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 22,
            }}
          >
        
            <Box sx={{ cursor: "pointer" }} onClick={() => Router.back()}>
              {"<"}
            </Box>
            <Text fontSize={16}>My profile</Text>
            <Box
              fontSize={16}
              sx={{ cursor: "pointer" }}
              onClick={() => signOut()}
            >
              Sign Out
            </Box>
          </Box>
          <Text
            fontSize={7}
            mt={2}
            fontWeight={800}
            lineHeight={"100%"}
            color={"brayyy"}
          >
            Hello, {session && session.user.name}
          </Text>
          <Text fontSize={3} fontWeight={800} color={"brayyy"}>
            {`You have, ${score} points! You can get more by doing `}
            <Text
              as="a"
              href="/home"
              sx={{
                display: "inline",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              <a>exercises</a>
            </Text>
          </Text>
          <Text fontSize={2} fontWeight={800} color={"brayyy"}>
            Your current email is {session.user.email}
          </Text>
          <Text fontSize={1} fontWeight={800} color={"brayyy"}>
            Want to terminate account?{" "}
            <Text
              as="a"
              onClick={() => deleteProfile()}
              sx={{
                display: "inline",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              <a>CLICK HERE</a>
            </Text>
          </Text>

          <Text mt={5} fontSize={1} fontWeight={800} color={"brayyy"}>
            Emotional Intelligence Trainer (EIT) is a SaaS self care application
            developed by{" "}
            <Text
              as="a"
              href="https://rasha.world/"
              sx={{
                display: "inline",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              <a>Rasha Rahman</a>
            </Text>
            . Please reach out to him for any questions.
          </Text>
        </Box>
      </Box> : <Loading width={'100vw'} height={'100vh'} />
    )
};

export default Profile;

