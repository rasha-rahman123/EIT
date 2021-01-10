import { useContext, useEffect, useMemo, useRef, useState } from "react";
import Typist from "react-typist";
import { Box, Button, Text } from "rebass";
import Router, { useRouter } from "next/router";
import firebase from "firebase";
import { AuthContext } from "../../../context/AuthContext";
import Table from "../../../components/Table";
import Loading from "../../../components/Loading";
import nookies from 'nookies'
export const overeat = ({token}) => {
  const inputRef = useRef(null);
  const [arr, setArr] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [arr3, setArr3] = useState([]);
  const [input, setInput] = useState("");
  const [q2, setQ2] = useState(false);
  const [waterIntake, setWaterIntake] = useState(0);
  const [showThisLine, setShowThisLine] = useState(true);
  const [showThisLine2, setShowThisLine2] = useState(false);
  const [displayResults, setDisplayResults] = useState(false);
  const date = new Date();

  const [otherData, setOtherData] = useState();
  const rout = useRouter()
  useEffect(() => {
    displayResults && token.uid && saveToCloud();
  }, [displayResults]);

  function handleSubmit() {
    if (input.length < 1) {
      return alert("Type something more please");
    }
    if (input.toLowerCase() === "no") {
      setInput("");
      return setQ2(true);
    }
    var j = [...arr];
    j.push(input);
    setInput("");
    setArr(j);
    showThisLine2 && inputRef.current.focus();
  }
  function handleWaterIntake() {
    if (typeof +input !== "number") {
      return alert("please type digit numbers only");
    }
    setWaterIntake(input);
    setInput("");
    setDisplayResults(true);
  }

  async function finishTrack() {
    const db = firebase.firestore().collection("Users").doc(token.uid);
    const res = await db.get();
    await db.set(
      { score: res.data()["score"] ? res.data()["score"] + 1 : 1 },
      { merge: true }
    );

    rout.push({
      pathname: "/home",
      query: { completedActivity: "true", activity: "overeat-tracking" },
    });
  }

  async function saveToCloud() {
    const data = {
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      food: arr,
      water: waterIntake,
    };
    const get = await firebase
      .firestore()
      .collection("Food Tracker")
      .doc(token.uid)
      .get();

    const exists = token.uid && get.exists;
    exists && setOtherData(get.data());
    if (!exists) {
      firebase
        .firestore()
        .collection("Food Tracker")
        .doc(token.uid)
        .set({ 1: data, 2: data, 3: data });
    } else {
      const prevData = await [get.data()];
      const data1 = await data;

      prevData &&
        (await firebase
          .firestore()
          .collection("Food Tracker")
          .doc(token.uid)
          .set({
            1: data1,
            2: { ...prevData[0][1] },
            3: { ...prevData[0][2] },
          })
          .then(() => {
            setArr2({ ...prevData[0][1] });
            setArr3({ ...prevData[0][2] });
          }));
    }
  }
  function handleDelete(i) {
    var j = [...arr];
    j.splice(i, 1);
    setArr(j);
  }

  useEffect(() => {
    !displayResults && showThisLine2 && inputRef.current.focus();
  }, [showThisLine2]);
  useMemo(() => console.log(otherData), [otherData]);
  return (
    <Box
    sx={{
  
      width: "100%",
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      display: "flex",
      width: "100%",
      flexDirection: "column",
      p: 4
    }}
  >
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
        <Text fontWeight="800" fontSize={3}>
        Overeating Tracker
      </Text>
      </Box>
     
      {displayResults ? (
        <>
          <Typist cursor={{show: false}}>
            <Text color={"black"}>
              Generating report and checking for old reports...
            </Text>
          </Typist>
          {arr && (
            <>
              <Text>Once you've read through, click here to finish</Text>{" "}
              <Box
         
                sx={{
                  width: "100%",
                  my: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={() => finishTrack()}
                  sx={{
                    width: 314,
                    height: 70,
                    borderRadius: 30,
                    background: "#3AACFF",
                    color: "white",
                    fontSize: 18,
                    fontWeight: 700,
                    ":hover": {
                      boxShadow:
                        "0px 0px 3px #00000050, 0px 0px 10px #00000015",
                      cursor: "pointer",
                    },
                  }}
                >
                  Finish Exercise
                </Button>
              </Box>
            </>
          )}
          <Table arr={arr} waterIntake={waterIntake} index={"Current"} />
          {arr2 ? (
            <Table
              arr={arr2.food}
              waterIntake={arr2.water}
              index={"Last Time"}
            />
          ) : (
            <Loading width={"100%"} height={100} />
          )}
          {arr3 ? (
            <Table
              arr={arr3.food}
              waterIntake={arr3.water}
              index={"Second to Last Time"}
            />
          ) : (
            <Loading width={"100%"} height={100} />
          )}
        </>
      ) : (
        <>
         {!displayResults && 
            <Text>
              Hello, I will be guiding you on tracking your foods. It may seem
              long and boring, but it can be done really quickly. I just need
              some information from you. You can just respond back on the
              response line!
            </Text>
         }
          {showThisLine && (
            <Typist onTypingDone={() => setShowThisLine2(true)} cursor={{show: false}}  startDelay={500}>
              <Text my={2} color={"black"}>
                What did you eat yesterday? Hit enter after every food name
              </Text>
            </Typist>
          )}
          {arr &&
            arr.map((x, i) => (
              <Box>
                <Text>
                  - {x}{" "}
                  <Text
                    onClick={() => handleDelete(i)}
                    sx={{
                      display: "inline-block",
                      opacity: 0.3,
                      ":hover": { opacity: 0.8, cursor: "pointer" },
                    }}
                  >
                    [del]
                  </Text>
                </Text>
              </Box>
            ))}
          {arr.length > 2 && !q2 && (
            <Typist  cursor={{show: false}}>
              <Text color={"black"}>
                Anything else you would like to add? (type 'no' to go to next
                step)
              </Text>
            </Typist>
          )}
          {q2 && (
            <Typist cursor={{show: false}}>
              <Text color={"black"}>
                And how many cups of water did you drink yesterday?
              </Text>
            </Typist>
          )}
         { showThisLine2 && <Box
            as="form"
            display={showThisLine ? "initial" : "none"}
            onSubmit={(e) => {
              e.preventDefault();
              q2 ? handleWaterIntake() : handleSubmit();
            }}
          >
            <Text sx={{ display: "inline-block" }}>-</Text>
            <Box
              as="input"
              width="90%"
              placeholder={q2 ? "cups of water" : "foods (eg. red pasta)"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              ref={inputRef}
              sx={{
                background: "none",
                fontSize: 2,
                border: "none",
                display: "inline-block",
                ":focus": {
                  outline: "none",
                },
              }}
            />
          </Box>}
        </>
      )}
    </Box>
  );
};

export default overeat;

