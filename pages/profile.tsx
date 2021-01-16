import { Box, Text } from "rebass";
import Router from "next/router";
import {useSession, signOut} from 'next-auth/client'
import axios from "axios";
import Loading from "../components/Loading";
import useSWR from 'swr'

const fetcher = (url : string,id: number) => axios.get(url,{params:{id: id}}).then(res => res.data)
const Profile : React.FC = () => {
  const [session, loading] = useSession();



const { data} =  useSWR(['/api/getScore', session && session.user.id], fetcher)



  if(loading){
    return <Box>
      <Text as='h1'>Loading</Text>
    </Box>
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
            {`You have, ${data} points! You can get more by doing `}
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
      </Box> : <Loading width={'100vw'} height={'100vh'} rows={1} />
    )
};

export default Profile;

