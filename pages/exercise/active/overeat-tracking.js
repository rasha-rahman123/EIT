import { useContext, useEffect, useMemo, useRef, useState } from "react";
import Typist from "react-typist";
import { Box, Button, Text } from "rebass";
import Router, { useRouter } from "next/router";
import firebase from "firebase";
import { AuthContext } from "../../../context/AuthContext";
import Table from "../../../components/Table";
import Loading from "../../../components/Loading";
import {useSession} from 'next-auth/client'
import axios from "axios";
import { PrismaClient } from '@prisma/client'

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
  // useEffect(() => {
  //   displayResults && token.uid && saveToCloud();
  // }, [displayResults]);
  const [tracks, setTracks] = useState();

  const [session] = useSession() 
  useEffect(()=> {
    const findFoodTrackingData = async () => {
      const req = await axios('/api/findFoodTracking', {
        params: {
          id: session.user.id
        }
      })
      
      await setTracks(req.data)
    }
    session && findFoodTrackingData()

    return setTracks(null)
  }, [session])

  console.log(tracks)

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
    await saveToCloud();
    await axios('/api/addScore', {params: {id: session.user.id}})
    window.location.assign(`/home?completedActivity=true?activty=overeat-tracking`)
    
  }


  async function saveToCloud() {
    const data = {
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      food: arr.join(','),
      water: waterIntake,
    };

    await axios('/api/addFoodTracking', {
      
      params: {
        id: session.user.id,
        food : data.food,
        water: +data.water 
      }
    }).then(res => console.log(res))
    
  }
  function handleDelete(i) {
    var j = [...arr];
    j.splice(i, 1);
    setArr(j);
  }

  useEffect(() => {
    !displayResults && showThisLine2 && inputRef.current.focus();
  }, [showThisLine2]);

  return (
    session ? <Box
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
          {tracks && tracks[0] ? (
            <Table
              arr={tracks[0].foods.split(',')}
              waterIntake={tracks[0].water}
              index={"Last Time"}
            />
          ) : (
            <Loading width={"100%"} height={100} />
          )}
      {tracks && tracks[1] ? (
            <Table
              arr={tracks[1].foods.split(',')}
              waterIntake={tracks[1].water}
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
    </Box> : <> </>
  );
};

export default overeat;

