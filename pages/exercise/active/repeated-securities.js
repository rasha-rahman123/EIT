import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { Box, Button, Image, Text } from "rebass";
import { BiPlusMedical } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import Typist from "react-typist";
import styles from "../../../styles/Home.module.css";
import firebase from "firebase";
import { AuthContext } from "../../../context/AuthContext";
import nookies from 'nookies'

export const RepeatedSec = ({}) => {
  var device, recorder;
  var items = [];
  var audioLinks = [];
  const [rec, setRec] = useState([]);
  const [randNum, setRandNum] = useState(Math.floor(Math.random() * 5));
  const [started, setStarted] = useState("");
  
  const [partTwo, setPartTwo] = useState(false);
  const [intver, setInt] = useState();
  const [timer, setTimer] = useState(5);
  const [seconds, setSeconds] = useState(60);
  const [ten, setTen] = useState(-1);
  const { uuid } = useContext(AuthContext);
  const [speaker, setSpeaker] = useState(true)
  const [prevTime, setPrevTime] = useState();
  const [isPlaying,setIsPlaying] = useState(false);
  async function startRecording(string) {
    var msg = await new SpeechSynthesisUtterance(string);
    var voices = window.speechSynthesis.getVoices();
    console.log(voices);
    msg.voice = voices[17];
    msg.voiceURI = "native";
    msg.volume = 0.6;
    msg.rate = 0.8;
    msg.pitch = 0.8;
    msg.lang = "en-US";
    window.speechSynthesis.speak(msg);
  }
  const date = new Date();
  const [now, setNow] = useState(date.getSeconds());
  useEffect(() => {
    seconds % 5 === 0 && ten < 5
      ? setTen((c) => c + 1) 
      : ten === 5 && setTen(0);

      // seconds % 5 === 0 && speaker && startRecording(rec[ten + 1])
    const timer =
      seconds > prevTime - 60 &&
      setInterval(() => setSeconds(seconds - 1), 1000);
    seconds === prevTime - 60 && finishTrack();

    return () => clearInterval(timer);
  }, [seconds, prevTime]);

useEffect(() => {
  !isPlaying && partTwo && play();
},[partTwo])

  async function finishTrack() {
    
    const db = firebase.firestore().collection("Users").doc(uuid);
    const res = await db.get();
    await db.set({ score: res.data()['score'] ? res.data()['score'] + 3 : 3 }, { merge: true });
  
    Router.push({
      pathname: "/home",
      query: { completedActivity: "true", activity: "repeated-securities" },
    });
  }
  function addTag() {
    if (started.length < 1) {
      return alert("Please write a bit more");
    }
    var j = [...rec];
    j.push(started);
    setRec(j);
    setStarted("");
    
  }

  function removeTag(i) {
    var j = [...rec];
    j.splice(i, 1);
    setRec(j);
  }
  function play() {

    var audio = new Audio('/repeated-securities-bg.wav');
  
    audio.play();
    setIsPlaying(true)
  
  }
  useEffect(() => {
    var date = new Date();
    var sec = date.getSeconds();
    var min = date.getMinutes();
    var tog = sec;
    !prevTime && partTwo && setPrevTime(tog);
    !prevTime && partTwo && setSeconds(tog);
    !prevTime && partTwo && window.scrollTo(0,0)
  }, [partTwo]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        position: "absolute",
        p: 4,
        background: partTwo ? "radial-gradient(#3AACFF,lightblue)" : "#F5F5F8",
        backgroundSize: partTwo && "500% 500%",
        backgroundPosition: prevTime ? "50% 100%" : partTwo && "50% 0%",
        transition: "background-position 60s ease",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      {!partTwo ? (
        <>
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 22,
              mb: 4,
            }}
          >
            <Box sx={{ cursor: "pointer" }} onClick={() => Router.back()}>
              {"<"}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",

              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              height: "100%",
            }}
          >
            <Text my={3}>
              {timer - rec.length > 0
                ? "Please insert a compliment of yourself down below. Even if you think you cannot think of any, keep trying. Even the smallest compliment means something."
                : "If you are satisfied with your compliments, please press next step to continue onto the exposure training."}
            </Text>
            {timer - rec.length > 0 && (
              <Text fontSize={1}>
                {timer - rec.length} compliments remaining
              </Text>
            )}
            {rec &&
              rec.map((x, i) => (
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    bg: "white",
                    px: 1,
                    my: 2,
                  }}
                >
                  <Text mr={3} fontWeight={600}>
                    {i + 1}
                  </Text>
                  <Text onClick={() => startRecording(x)}>{x}</Text>
                  <Text sx={{ display: "inline-block", ml: 2 }}>
                    <MdCancel onClick={() => removeTag(i)} />
                  </Text>
                </Box>
              ))}
          </Box>
          <Box
            as="form"
            onSubmit={(e) => {
              e.preventDefault();
              timer - rec.length > 0 ? addTag() : setPartTwo(true);
            }}
            sx={{
              width: "100%",
              height: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              bottom: 25,
              left: 0,
            }}
          >
            {timer - rec.length === 0 ? (
              <Button
                type={"submit"}
                sx={{
                  width: "100%",
                  height: 60,
                  borderRadius: 30,
                  border: "none",
                  background: "white",
                  color: "#0A70FF",
                  p: 3,
                  px: 4,
                  transform:
                    timer - rec.length === 0
                      ? "translateY(0vh)"
                      : "translateY(20vh)",
                  fontSize: 2,
                  textAlign: "center",
                  transition: "transform 300ms ease 200ms",
                }}
              >
                Next Step
              </Button>
            ) : (
              <>
                <Box
                  onClick={() => addTag()}
                  sx={{ position: "absolute", right: 30, fontSize: 24 }}
                >
                  {" "}
                  <BiPlusMedical />
                </Box>
                <Box
                  onSubmit={(e) => {
                    e.preventDefault();
                    addTag();
                  }}
                  as="input"
                  value={started}
                  onChange={(e) => setStarted(e.target.value)}
                  placeholder="Add Self-Compliment"
                  sx={{
                    width: "100%",
                    height: 60,
                    borderRadius: 30,
                    border: "none",
                    background: "white",
                    color: "#0A70FF",
                    p: 3,
                    px: 4,
                    pr: 5,
                    fontSize: 2,
                  }}
                />
              </>
            )}
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "grid",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              color: "white",
              textAlign: "center",
              flexDirection: "column",
              whiteSpace: "pre-wrap",
            }}
          >
            <Typist cursor={{show: false}}>
              <Text>
                Please repeat the following lines to yourself or outloud as they
                are presented for the next minute.
              </Text>
            </Typist>
            <Text>---</Text>
            <Text opacity={0.5} fontSize={24}>
              repeat until next phrase shows
            </Text>
            <Text
              className={styles.floatingText}
              sx={{ fontSize: 42, fontWeight: 700, mt: 4 }}
            >
              {" "}
              {rec && rec.filter((x, i) => i === ten)}
            </Text>
          </Box>
          <Box sx={{ width: 200, height: 200, margin: "0 auto" }}>
            <Image src={"/ripple.svg"} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default RepeatedSec;

export async function getServerSideProps(context) {
  try {
    const cookies = await nookies.get(context);
    const token = await fetch(
      `https://eitrainer.app/api/getToken?token=${cookies.token}`
    ).then((data) => data.json());

    return {
      props: {
        session: token,
      },
    };
  } catch (err) {
    context.res.writeHead(302, { location: "/login" });
    context.res.end();
    return { props: [] };
  }
}
