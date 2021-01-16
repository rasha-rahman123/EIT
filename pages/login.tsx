import { useEffect, useMemo } from "react";
import { Box, Flex, Text } from "rebass";
import Router from "next/router";
import Logo from "../components/Logo";
import { signIn, useSession } from "next-auth/client";
import { CgGoogle, CgTwitter, CgFacebook } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";




const Login: React.FC = () => {
  const logo = useMemo(() => <Logo width={24} height={24} animation={false} />, []);
  const [session] = useSession();
  useEffect(() => {
    session && Router.push("/home");
  }, [session]);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,

        bg: "rgba(255, 255, 255,0.2)",
        pt: [2, 4],
        pb: 6,
        color: "#2c2c2e",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          heiight: "100%",
          mt: 5,
        }}
      >
        {logo}
        <Text sx={{ fontSize: 7, fontWeight: 800 }}>E I T</Text>
        <Text>- - -</Text>
        <Text textAlign="center" sx={{ textTransform: "uppercase" }} mb={6}>
          SIGN IN THRU
        </Text>
        <Flex>
          {" "}
          {!session &&
            [
              { name: "google", icon: <CgGoogle /> },
              { name: "twitter", icon: <CgTwitter /> },
              { name: "github", icon: <FaGithub /> },
              { name: "facebook", icon: <CgFacebook /> },
            ].map((x) => (
              <Text
                key={x.name}
                onClick={() => signIn(x.name)}
                fontSize={5}
                mx={3}
                sx={{
                  ":hover": {
                    borderBottom: "10px solid lightblue",
                    cursor: "pointer",
                  },
                }}
              >
                {x.icon}
              </Text>
            ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default Login;
