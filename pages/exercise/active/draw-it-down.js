import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { Box, Button, Image, Text } from "rebass";
import SignatureCanvas from "react-signature-canvas";
import firebase from "firebase";
import { AuthContext } from "../../../context/AuthContext";
import styles from "../../../styles/Draw.module.css";
import useLongPress from "../../../hooks/useLongPress";

export const drawItDown = ({}) => {
  const [answerHover, setAnswerHover] = useState();
  const [answerHoverTemp, setAnswerHoverTemp] = useState();
  const [wordAnswer, setWordAnswer] = useState("Please Select An Option");
  const [questionCounter, setQuestionCounter] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [questionsEnded, setQuestionsEnded] = useState(false);
  const [drawingsEnded, setDrawingsEnded] = useState(false);
  const [brushSize, setBrushSize] = useState(10);
  const [colorNum, setColorNum] = useState(null);
  const [drawing, setDrawing] = useState();
  const [prevPic, setPrevPic] = useState();
  const [tappedColor, setTappedColor] = useState();
  const { token, uuid } = useContext(AuthContext);
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    token && uuid && loadProfile();
  }, [uuid, token]);

  async function loadProfile() {
    const db = await firebase.firestore();
    const doc = await db.collection("Users").doc(uuid).get();
    if (!doc.exists) {
    } else {
      setDoc(doc.data());
    }
  }
  const { query } = useRouter();
  const [hex, setHex] = useState(query && query.bg);
  const canvasRef = useRef(null);
  var storageRef = firebase.storage().ref();
  var drawRef = storageRef.child("draw-it-down.jpg");
  var drawImagesRef = storageRef.child("exercise/draw-it-down.jpg");
  const questions = [
    "I do things slowly.",
    "My future seems hopeless.",
    "It is hard for me to concentrate on reading.",
    "The pleasure and joy has gone out of my life.",
    "I have lost interest in aspects of my life that used to be important to me.",
    "I feel sad, blue, and unhappy.",
    "I feel like a failure.",
    "I feel lifeless more dead than alive.",
  ];

  const opts = ["0", "1", "2", "3", "4", "5"];

  async function finishTrack() {
    const db = firebase.firestore().collection("Users").doc(uuid);
    const res = await db.get();
    await db.set(
      { score: res.data()["score"] ? res.data()["score"] + 1 : 1 },
      { merge: true }
    );

    router.push({
      pathname: "/home",
      query: { completedActivity: "true", activity: "draw-it-down" },
    });
  }
  const colors = [
    "#414A4C",
    "#DE5D83",
    "#1CD3A2",
    "#78DBE2",
    "#FFFF99",
    "purple",
    "#FC74FD",
    "#CD9575",
    "whitesmoke",
  ];

  const saveCurrentPic = async () => {
      await firebase.firestore().collection('exercise draw-it-down').doc(uuid).set({drawing}).then(() => {
        finishTrack()
      })
  }

  const innerCanvasRef = useRef(null);
  const getDepressionText = (score) => {
    switch (true) {
      case score < 10:
        return "No Depression Likely";
        break;
      case score < 18:
        return "Possibly Mildly Depressed";
        break;
      case score < 22:
        return "Borderline Depression";
        break;
      case score < 36:
        return "Mild-Moderate Depression";
        break;
      case score < 54:
        return "Moderate-Severe Depression";
        break;
      case score >= 54:
        return "Severely Depressed";
        break;
    }
  };

  const onLongPress = (x) => {
    console.log("longpress is triggered");
    setHex(x);
  };

  const onClick = (x) => {
    console.log("click is triggered");
    setColorNum(x);
    console.log(x, tappedColor);
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };

  const longPressEvent = () =>
    useLongPress(onLongPress(), onClick(), tappedColor, defaultOptions);

  const getPicture = async () => {
    await firebase
      .firestore()
      .collection("exercise draw-it-down")
      .doc(uuid)
      .get()
      .then((data) => {
        setPrevPic(data.data())
      
      });
  };

  useEffect(() => {
    drawingsEnded && getPicture();
  }, [drawingsEnded]);
  const createImage = async () => {
    var url = await canvasRef.current.toDataURL("image/png");
    var date = new Date();

    var image = await document.createElement("img");
    image.src = await url;
    image.style.width = "100%";
    image.style.height = "95vh";
    var temp = await document.createElement("canvas");
    temp.width = (window.innerWidth - window.innerWidth / 3) * 3;
    temp.height = 1200;
    var ctx = await temp.getContext("2d");
    ctx.fillStyle = hex ? hex : "#FFFFFF";
    ctx.fillRect(0, 0, temp.width, temp.height);
    ctx.drawImage(image, 0, 0);
    ctx.font = "40px Sarala";
    ctx.fillStyle = "#00000030";
    ctx.fillText("@" + doc.displayName, 10, 140);
    ctx.fillText(getDepressionText(totalScore), 10, 180);
    ctx.fillText(
      date.getMonth() + 1 + " / " + date.getDay() + " / " + date.getFullYear(),
      10,
      220
    );

    ctx.font = "90px Sarala";
    // Create gradient
    var gradient = ctx.createLinearGradient(0, 0, temp.width, 0);
    gradient.addColorStop("0", " magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.fillText("EIT", 10, 90);
    var file = await temp.toDataURL();

    await setDrawing(file);
  };
  useEffect(() => {
    answerHoverTemp &&
      setWordAnswer(() => {
        switch (answerHoverTemp) {
          case opts[0]:
            return "Not At All";
          case opts[1]:
            return "Just a Little";
          case opts[2]:
            return "Somewhat";
          case opts[3]:
            return "Moderately";
          case opts[4]:
            return "Quite a Lot";
          case opts[5]:
            return "Very Much";
          case null:
            return "Please Select An Option";
        }
      });
  }, [answerHoverTemp]);
  const router = useRouter();
  const answerChosen = (i) => {
    setTotalScore((d) => d + i);
    setQuestionCounter((c) => c + 1);
    setAnswerHoverTemp(null);
    if (questionCounter > questions.length - 2) {
      setQuestionsEnded(true);
      router.push(
        router.pathname,
        { query: { score: totalScore * 2.25 } },
        { shallow: true }
      );
    }
  };

  return (
    <>
      <Box
        color="#3AACFF"
        sx={{
          position: "absolute",
          top: 0,

          left: 0,
          right: 0,
          borderRadius: 12,
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {drawingsEnded && (
          <Box>
          
            <Box my={2} display="flex" justifyContent="space-between">
            <Text fontSize={6} fontWeight={800} color="brayyy" mb={3}>
              {" "}
              Your Results
            </Text>
                <Button
                  color="black"
                  bg={"#FFFF99"}
                  onClick={() => {
                    saveCurrentPic()
                  }}
                >
                  FINISH EXERCISE
                </Button>
              </Box>
            <Text>YOUR DRAWING HAS A WATERMARKED DEPRESSION SCORE</Text>
            {drawing && <Image src={drawing} />}
            <Text>PREVIOUS DRAWINGS/SCORES</Text>
            {prevPic && <Image src={prevPic['drawing']} />}
          </Box>
        )}
        {questionsEnded && !drawingsEnded && (
          <Box>
            <Text color={"brayyy"}>
              GOOD! <br />
              NOW DRAW YOUR FEELINGS OUT. TAP/DOUBLE TAP COLORS.
            </Text>
            
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {" "}
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                {colors.map((x, i) => (
                  <Box
                    key={i}
                    onClick={async () => {
                      colorNum === x && (await setHex(x));
                      (await colorNum) !== x && setColorNum(x);
                    }}
                    onContextMenu={(e) => {
                      setHex(x);
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: "5% 55% 10% 42%",
                      background: x,
                      ml: i === 0 ? 0 : 2,
                      my: 2,
                      border: colorNum === x && "1px solid",
                      borderColor: colorNum === x ? "#414A4C" : "brayyy",
                      cursor: "pointer",
                      boxShadow: "small",
                    }}
                  >
                    {" "}
                  </Box>
                ))}{" "}
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
              <Text color="brayyy" fontSize={1}>
                BRUSH SIZE
              </Text>
              <Box
                as="input"
                type="range"
                min="1"
                max="60"
                value={brushSize}
                defaultValue={10}
                onChange={(e) => setBrushSize(e.target.value)}
              />
              <Box my={2} display="flex" justifyContent="space-between">
                <Button
                  color="black"
                  bg={"#DE5D83"}
                  onClick={() => canvasRef.current.clear()}
                >
                  CLEAR
                </Button>
                <Button
                  color="black"
                  bg={"#FFFF99"}
                  onClick={() => {
                    createImage();
                    setDrawingsEnded(true);
                  }}
                >
                  NEXT
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 3,
              }}
            >
              <SignatureCanvas
                clearOnResize={false}
                penColor={colorNum}
                maxWidth={brushSize}
                ref={canvasRef}
                backgroundColor={hex}
                canvasProps={{
                  className: styles.sigCanvas,
                  style: {
                    height: 400,
                    width: window.innerWidth - window.innerWidth / 7,
                    background: hex,
                    bg: hex,
                    borderRadius: 10,
                    border: "2px solid #2c2c2e20",
                    cursor: "crosshair",
                    boxShadow: "inset 0px -2px #00000050, 0px -2px #00000050",
                    backgroundSize: "600% 600%",
                  },
                }}
              />
            </Box>
          </Box>
        )}

        <Box
          sx={{
            alignSelf: "center",
            display: questionsEnded ? "none" : "grid",
            gridTemplateColumns: "16.7% 16.7% 16.7% 16.7% 16.7% 16.7%",
            textAlign: "center",
            width: "100%",
            fontSize: 48,
          }}
        >
          {opts.map((x, i) => (
            <Text
              sx={{
                color: "brayyy",
                cursor: "pointer",
                borderBottom: answerHoverTemp
                  ? x === answerHoverTemp && "5px solid limegreen"
                  : answerHover === x && "5px solid limegreen",
              }}
              onMouseEnter={() => setAnswerHoverTemp(x)}
              onClick={() => answerChosen(i)}
              onMouseLeave={() => setAnswerHoverTemp(null)}
              key={x}
            >
              {x}
            </Text>
          ))}
        </Box>
        <Box
          sx={{
            margin: "0 auto",
            display: questionsEnded && !drawingsEnded && "none",
          }}
        >
          {" "}
          <Text sx={{ fontSize: 2, color: "brayyy" }}>
            {questionsEnded ? !drawingsEnded && "" : wordAnswer}
          </Text>
        </Box>
        <Box alignSelf="center" textAlign={"center"}>
          <Text
            sx={{
              fontSize: 48,
              lineHeight: "100%",
              fontWeight: 800,
              color: "brayyy",
            }}
          >
            {questionsEnded ? !drawingsEnded && "" : questions[questionCounter]}
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default drawItDown;
