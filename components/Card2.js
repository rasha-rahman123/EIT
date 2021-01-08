import { useEffect, useState } from "react";
import { Box, Image, Text } from "rebass";

export default function Card2({ cardInfo }) {
  const [hover, setHover] = useState(false);

  const [color, setColor] = useState();
  const [name, setName] = useState();

useEffect(async () => {
  var txt = await cardInfo && document.createElement("textarea");
  txt.innerHTML = await cardInfo.name;
 await setName(txt.value)
}, [cardInfo])

  useEffect(() => {
    cardInfo &&
      setColor(() => {
        switch (cardInfo.color) {
          case 0:
            return "green";
          case 1:
            return "red";
          case 2:
            return "purple";
          case 3:
            return "blue";
          case 4:
            return "orange";
          default:
            return "black";
        }
      });
  },[cardInfo]);
  return (
    <Box
      sx={{
        flex: "0 0 auto",
        position: "relative",
        height: 350,
        py: 2,
        mx: 17,
        width: 220,
        cursor: "pointer",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box
        sx={{
          position: "relative",
          width: 214,
          height: 314,
          bg: color && color,
          margin: "0 auto",
          borderRadius: 10,
          zIndex: 1,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 64,
          p: 2,
          flexDirection: "column",
          color: "white",
          boxShadow: hover && "0px 0px 3px #00000060,0px 0px 10px #00000015",
        }}
      >
        <Image src={`/story/${cardInfo.color}.png`} />
        <Text sx={{ fontSize: 3, fontWeight: 800, lineHeight: "100%" }}>
          {name && name}
          <br />
          <Text
            fontSize={14}
            lineHeight={"100%"}
            color={"whitesmoke"}
            opacity={0.6}
          >
            {cardInfo.desc}
          </Text>
        </Text>
      </Box>
    </Box>
  );
}
