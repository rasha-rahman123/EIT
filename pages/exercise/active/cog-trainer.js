import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";
import { MdToys } from "react-icons/md";
import { Transition } from "react-transition-group";
import Typist from "react-typist";
import { Box, Button, Text } from "rebass";
import { Textarea } from "theme-ui";

export const cogTrainer = ({}) => {
  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(false);
  const [inputVa, setInputVa] = useState("");
  const [data, setData] = useState();

  const maps = [
    {
      title: "Emotional Reasoning",
      desc:
        "The distortion of emotional reasoning can be summed up by the statement, “If I feel that way, it must be true.” Whatever a person is feeling is believed to be true automatically and unconditionally. If a person feels stupid and boring, then they must be stupid and boring.",
      link: "",
    },
    {
      title: "Overgeneralization",
      desc:
        "In this cognitive distortion, a person comes to a general conclusion based on a single incident or a single piece of evidence. If something bad happens just once, they expect it to happen over and over again. A person may see a single, unpleasant event as part of a never-ending pattern of defeat.",
      link: "",
    },
    {
      title: "Filter",
      desc: "A person engaging in filter (or “mental filtering) takes the negative details and magnifies those details while filtering out all positive aspects of a situation. For instance, a person may pick out a single, unpleasant detail and dwell on it exclusively so that their vision of reality becomes darkened or distorted. When a cognitive filter is applied, the person sees only the negative and ignores anything positive.",
      link: ""
    },
    {
      title: "Polarized Thinking",
      desc: "In polarized thinking, things are either “black-or-white” — all or nothing. We have to be perfect or we’re a complete and abject failure — there is no middle ground. A person with polarized thinking places people or situations in “either/or” categories, with no shades of gray or allowing for the complexity of most people and most situations. A person with black-and-white thinking sees things only in extremes.",
      link: ""
    },
    {
      title: "Catastrophizing",
      desc: "When a person engages in catastrophizing, they expect disaster to strike, no matter what. This is also referred to as magnifying, and can also come out in its opposite behavior, minimizing. In this distortion, a person hears about a problem and uses what if questions (e.g., “What if tragedy strikes?” “What if it happens to me?”) to imagine the absolute worst occurring.",
      link: ""
    },
    {
      title: "Personalization",
      desc: "Personalization is a distortion where a person believes that everything others do or say is some kind of direct, personal reaction to them. They literally take virtually everything personally, even when something is not meant in that way. A person who experiences this kind of thinking will also compare themselves to others, trying to determine who is smarter, better looking, etc.",
      link: ""
    },
    {
      title: "Control Fallacy",
      desc: "This distortion involves two different but related beliefs about being in complete control of every situation in a person’s life. In the first, if we feel externally controlled, we see ourselves as helpless a victim of fate. For example, “I can’t help it if the quality of the work is poor, my boss demanded I work overtime on it.”",
      link: ""
    },
    {
      title: "Fallacy of Fairness",
      desc: "In the fallacy of fairness, a person feels resentful because they think that they know what is fair, but other people won’t agree with them. As our parents tell us when we’re growing up and something doesn’t go our way, “Life isn’t always fair.” People who go through life applying a measuring ruler against every situation judging its “fairness” will often feel resentful, angry, and even hopelessness because of it. Because life isn’t fair — things will not always work out in a person’s favor, even when they should.",
      link: ""
    },
    {
      title: "Blaming",
      desc: "When a person engages in blaming, they hold other people responsible for their emotional pain. They may also take the opposite track and instead blame themselves for every problem — even those clearly outside their own control.",
      link: ""
    },
    {
      title: "Fallacy of Change",
      desc: "In the fallacy of change, a person expects that other people will change to suit them if they just pressure or cajole them enough. A person needs to change people because their hopes for success and happiness seem to depend entirely on them.",
      link: ""
    },
    {
      title: "Global Labeling",
      desc: "In global labeling (also referred to as mislabeling), a person generalizes one or two qualities into a negative global judgment about themselves or another person. This is an extreme form of overgeneralizing. Instead of describing an error in context of a specific situation, a person will attach an unhealthy universal label to themselves or others.",
      link: ""
    },
    {
      title: "Being Right",
      desc: "When a person engages in this distortion, they are continually putting other people on trial to prove that their own opinions and actions are the absolute correct ones. To a person engaging in “always being right,” being wrong is unthinkable — they will go to any length to demonstrate their rightness.",
      link: ""
    },
    {
      title: "Heavens Reward Fallacy",
      desc: "The final cognitive distortion is the false belief that a person’s sacrifice and self-denial will eventually pay off, as if some global force is keeping score. This is a riff on the fallacy of fairness, because in a fair world, the people who work the hardest will get the largest reward. A person who sacrifices and works hard but doesn’t experience the expected pay off will usually feel bitter when the reward doesn’t come.",
      link: ""
    },
    {
      title: "Mind Reading",
      desc: "Without individuals saying so, a person who jumps to conclusions knows what another person is feeling and thinking — and exactly why they act the way they do. In particular, a person is able to determine how others are feeling toward the person, as though they could read their mind. Jumping to conclusions can also manifest itself as fortune-telling, where a person believes their entire future is pre-ordained (whether it be in school, work, or romantic relationships).",
      link: ""
    },
    {
      title: "Shoulds",
      desc: "Should statements (“I should pick up after myself more…”) appear as a list of ironclad rules about how every person should behave. People who break the rules make a person following these should statements angry. They also feel guilty when they violate their own rules. A person may often believe they are trying to motivate themselves with shoulds and shouldn’ts, as if they have to be punished before they can do anything.",
      link: ""
    }
  ];

  

  const fetchData = async () => {
    await setData(null);
    inputVa.length > 0 &&
      (await axios(`/api/hello?text=${inputVa}`).then((res) =>
        setData(res.data)
      ));
  };

  return (
    <Box
      color="#3AACFF"
      sx={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 12,
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
        <Box
          sx={{ cursor: "pointer", color: "#2C2C2E", fontWeight: 800 }}
          onClick={() => Router.back()}
        >
          {"<"}
        </Box>
      </Box>
      <Text
        sx={{
          fontSize: 5,
          color: "brayyy",
          textAlign: "center",
        }}
      >
        Toxic Message A.I.
      </Text>
      {state1 ? (
        <Box
          sx={{
            width: "90%",
            margin: "0 auto",
            bg: "#2C2C2E",
            p: 2,
            pl: 4,
            pr: 3,
            borderRadius: 30,
            textAlign: "center",
          }}
        >
          {" "}
          <Typist onTypingDone={() => setState2(true)} cursor={{ show: false }}>
            {" "}
            <Text color="white" sx={{ lineHeight: "120%", fontSize: 1 }}>
              See if a message is detected as toxic by our A. I.
            </Text>
          </Typist>
        </Box>
      ) : (
        <Typist onTypingDone={() => setState1(true)}>........</Typist>
      )}
      <Box
        sx={{
          display: "flex",

          my: 3,
          flexDirection: "column",
        }}
      >
        {
          <Transition in={state2} timeout={1000}>
            {(status) => (
              <Box
                as="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  fetchData();
                }}
                sx={{
                 
                }}
              >
                <>
                  <Textarea
                    onSubmit={(e) => {
                      e.preventDefault();
                      fetchData();
                    }}
                   
                    value={inputVa}
                    onChange={(e) => setInputVa(e.target.value)}
                    placeholder="Paste a message here"
                    sx={{
                      background: "rgba(255, 255, 255,0.8)",
                      borderRadius: 10,
                      width: "60%",
                      height: 48,
                      margin: "0 auto",
                      display: "flex",
                      py: 2,
                      px: 2,
                      borderRadius: 10,
                      border: "none",
                    
                      color: "brayyy",
                      
                      fontSize: 2,
                      ":focus": { outline: "none" },
                    }}
                  />
                </>
              </Box>
            )}
          </Transition>
        }
        {
          <Button
            onClick={(e) => {
              e.preventDefault();
              fetchData();
            }}
            type="submit"
            sx={{
              my: 4,
              bg: "brayyy",
              color: "white",
              width: 100,
              alignSelf: "center",
            }}
          >
            Analyze
          </Button>
        }
      </Box>
      {data ? (
        <Box
          sx={{

  
            p: 2,
            pl: 4,
            pr: 3,
            alignSelf: "center",
            borderRadius: 30,
          }}
        >
          {" "}
          {data.length > 0
            ? data && (
                  <Text color="white" sx={{ lineHeight: "120%", fontSize: 2 }}>
                    {" "}
                    <Box
                      sx={{

                        p: 2,
                        borderRadius: 10,
                        color: "brayyy",
                        fontSize: 4
                      }}
                    >
                      <Text> Distortion:{' '}{data[0]._label}</Text>
                      <Text>
                        Confidence:{" "}
                        {" (" + (data[0]._confidence * 100).toFixed(2) + "%). "}
                      </Text>
                    </Box>
                  </Text>
              )
            : "Seems normal to me."}
   
        </Box>
      ) : (
        <></>
      )}
             {data && data.length > 0 && (
            <Box sx={{width: '100%', background: 'brayyy', display: 'flex', justifyContent: 'center', textAlign: 'left', px: 5, color: 'brayyy'}}>
              {maps
                .filter((x) => x.title === data[0]._label)
                .map((x) => x.desc)}
            </Box>
          )}
    </Box>
  );
};

export default cogTrainer;
