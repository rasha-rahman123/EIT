import { useEffect, useRef, useState } from "react";
import Typist from "react-typist";
import { Box, Button, Text } from "rebass";
import Router from "next/router";
import Table from "../../../components/Table";
import Loading from "../../../components/Loading";
import { useSession } from "next-auth/client";
import axios from "axios";

export const overeat : React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [arr, setArr] = useState<any[]>([]);
  const [input, setInput] = useState<string>("");
  const [q2, setQ2] = useState<boolean>(false);
  const [waterIntake, setWaterIntake] = useState<number>(0);
  const [showThisLine2, setShowThisLine2] = useState<boolean>(false);
  const [displayResults, setDisplayResults] = useState<boolean>(false);
  const [tracks, setTracks] = useState<any[]>();
  const [session, loading] = useSession();

  useEffect(() => {
    const findFoodTrackingData = async () => {
      const req = await axios("/api/findFoodTracking", {
        params: {
          //@ts-ignore
          id: session.user.id,
        },
      });

      setTracks(req.data);
    };
    session && findFoodTrackingData();

    return setTracks(null);
  }, [session]);

  function handleSubmit() {
    if (input.length < 1) {
      return alert("Type something more please");
    }
    if (input.toLowerCase() === "no") {
      setInput("");
      return setQ2(true);
    }
    var j: string[] = [...arr];
    j.push(input);
    setInput("");
    setArr(j);
    showThisLine2 && inputRef.current.focus();
  }
  function handleWaterIntake() {
    if (typeof +input !== "number") {
      return alert("please type digit numbers only");
    }
    setWaterIntake(+input);
    setInput("");
    setDisplayResults(true);
  }

  async function finishTrack() {
    await saveToCloud();
    //@ts-ignore
    await axios("/api/addScore", { params: { id: session.user.id } });
    window.location.assign(
      `/home?completedActivity=true?activty=overeat-tracking`
    );
  }

  async function saveToCloud() {
    const data = {
      food: arr.join(","),
      water: waterIntake,
    };

    await axios("/api/addFoodTracking", {
      params: {
        //@ts-ignore
        id: session.user.id,
        food: data.food,
        water: +data.water,
      },
    }).then((res) => console.log(res));
  }
  function handleDelete(i: number) {
    var j = [...arr];
    j.splice(i, 1);
    setArr(j);
  }

  useEffect(() => {
    !displayResults && showThisLine2 && inputRef.current.focus();
  }, [showThisLine2]);

  if (loading) {
    return (
      <Box
        sx={{
          transition: "all 300ms ease",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Text fontSize={2}>LOADING APP</Text>
        <Box sx={{ width: 100, height: 20, bg: "gray", position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: 20,
              bg: "brayyy",
              width: loading ? 90 : 20,
            }}
          />
        </Box>
      </Box>
    );
  }

  return session ? (
    <Box
      sx={{
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        p: 4,
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
          Food Intake Tracker
        </Text>
      </Box>

      {displayResults ? (
        <>
          <Typist cursor={{ show: false }}>
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
              arr={tracks[0].foods.split(",")}
              waterIntake={tracks[0].water}
              index={"Last Time"}
            />
          ) : (
            <Loading width={"100%"} height={"100px"} rows={1} />
          )}
          {tracks && tracks[1] ? (
            <Table
              arr={tracks[1].foods.split(",")}
              waterIntake={tracks[1].water}
              index={"Second to Last Time"}
            />
          ) : (
            <Loading width={"100%"} height={"100px"} rows={1} />
          )}
        </>
      ) : (
        <>
          {!displayResults && (
            <Text>
              Hello, I will be guiding you on tracking your foods. It may seem
              long and boring, but it can be done really quickly. I just need
              some information from you. You can just respond back on the
              response line!
            </Text>
          )}
          <Typist
            onTypingDone={() => setShowThisLine2(true)}
            cursor={{ show: false }}
            startDelay={500}
          >
            <Text my={2} color={"black"}>
              What did you eat yesterday? Hit enter after every food name
            </Text>
          </Typist>
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
            <Typist cursor={{ show: false }}>
              <Text color={"black"}>
                Anything else you would like to add? (type 'no' to go to next
                step)
              </Text>
            </Typist>
          )}
          {q2 && (
            <Typist cursor={{ show: false }}>
              <Text color={"black"}>
                And how many cups of water did you drink yesterday?
              </Text>
            </Typist>
          )}
          {showThisLine2 && (
            <Box
              as="form"
              display="initial"
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
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setInput(e.currentTarget.value)
                }
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
            </Box>
          )}
        </>
      )}
    </Box>
  ) : (
    <> </>
  );
};

export default overeat;
