import { useState } from "react";
import { Box, Text } from "rebass";
import styles from '../styles/Card.module.css'
export default function Card({ cardInfo }) {
    const [hover, setHover] = useState(false)
  return (
    <Box
      sx={{
        flex: "0 0 auto",
        position: "relative",
        height: 350,
        py: 1,
        mx: 17,
        width: 220,
        cursor: 'pointer'
      }}
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    >

      <Box
        sx={{
          position: "relative",
          width: 168,
          height: 189,
          bg: cardInfo.color,
          margin: "0 auto",
          // borderRadius: cardInfo.kee%2 === 1 ?  '50% 10px 50% 10px ' : '10px 50% 10px 50%',
          borderRadius: '10px 50% 10px 50%',
          zIndex: 2,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 64,
          filter: 'saturate(100%) brightness(100%)',
          transform: hover ? 'rotate(180deg)' : 'rotate(90deg)',
          border: '10px solid #2c2c2e',
          transition: 'all 600ms ease-in-out',
          boxShadow:'0px 0px 3px #00000040,0px 0px 10px #00000005',
          
        }}
      >
       <Text sx={{color: cardInfo.color,mixBlendMode: 'overlay', transform: hover ? 'rotate(-180deg) scale(1.05) translateY(-4px)' : 'rotate(-90deg)',
          transition: 'all 600ms ease-in-out', filter: 'saturate(100%) hue-rotate(-10deg) brightness(50%)'}}>{cardInfo.icon}</Text>
      </Box>

      <Box
      className={styles.cardBg}
      sx={{
        height: 270,
        width: "100%",
        bg: 'brayyy',
       backgroundSize: '600% 600%',
        borderRadius: 10,
        position: "absolute",
        top: 43,
        boxShadow: hover && '0px 0px 3px #00000030,0px 0px 20px #00000015',
        transform: hover && 'scale(1.01)',
        zIndex: 1,
        color: cardInfo.color,
       
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text
        sx={{
          position: "absolute",
          top: 170,
          width: "70%",
          left: "15%",
          textAlign: "center",
          fontWeight: 800,
           color: cardInfo.color,
          
          fontSize: 3,
          lineHeight: '100%',
          
        }}
      >
        
      {cardInfo.name}
          <br />
          <Text fontSize={14} lineHeight={'100%'} color={'#FFFFFF50'} >
            {cardInfo.desc}
          </Text>
       
      </Text>
    </Box>
    
    </Box>
  );
}
