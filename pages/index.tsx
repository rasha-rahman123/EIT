import Router from "next/router";
import Image from "next/image";
import { Box, Button, Text } from "rebass";
import { useMemo } from "react";

import Logo from "../components/Logo";

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     border: "none",
//     borderRadius: 30,
//     boxShadow: "0px 0px 3px #00000040, 0px 0px 20px #00000015",
//     display: "flex",
//     flexDirection: "column",
//     textAlign: "center",
//     alignItems: "center",
//     zIndex: 20,
//   },
// };

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)

export default function Home() {
  

  


  
  const logo = useMemo(() => <Logo width={48} height={48} animation={true} />,[ ])



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
              Router.push("/login")
              }
            >
              Get Started
            </Button>
          </Box>
    </Box>
  );
}
