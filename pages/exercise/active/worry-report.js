import { useState } from "react";
import { Box, Text } from "rebass";
import {useSession} from "next-auth/client"
import axios from "axios";
const headers = [
  "Hi, I am sorry you are worried, what is it that is worrying you?",
  "Thinking about what will happen, instead of what could happen, can help you worry less.",
  "What are some clues that your worry will not come true?",
  "If your worry does not come true, what will probably happen instead?",
  "If your worry does come true, how will you handle it? Will you eventually be okay?",
  "Please read through all of your responses",
  "After answering these questions, how has your worry changed?",
  "Please screenshot/print your response to look at when you feel extra worried. Good luck!"
];

const placeholders = [
  "I am worried about...",
  "",
  "Some clues that my worry will not come true include...",
  "If my worry does not happen, what would happen instead...",
  "If my worry happens, I believe I will...",
  "",
  "My worry has changed by...",
  ""
];

const labels = [
    "The Worry",
    "",
    "Evidence against worry",
    "If my worry does not happen",
    "If my worry does happen",
    "",
    "My worry now"
]
  async function finishTrack(id) {
    
    await axios('/api/addScore', {params: {id: id}})
    
    
    window.location.assign(`/home?completedActivity=true?activty=worry-report`)
  }
export const worryReport = ({}) => {
  const [stage, setStage] = useState(0);
  const [answers, setAnswers] = useState([]);
  const j = typeof window !== 'undefined' && window.innerWidth;
  const [inputVal, setInputVal] = useState("");
  const handleNext = () => {
    setStage((c) => c + 1);
    var j = [...answers];
    j.push(inputVal);
    setInputVal(" ");
    setAnswers(j);
    console.log(answers);
  };
  const [session] = useSession()
  return (
    <Box
      sx={{
        transition: "all 300ms ease",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        minHeight: "100%",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        bg: "#1d1000",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
      }}
    >
      <Text sx={{ fontSize: 4, color: "white" }}>{headers[stage]}</Text>
      <Box
        as="input"
        value={inputVal}
        display={placeholders[stage] ? placeholders[stage].length === 0 ? 'none' : 'initial' : 'none'}
        onChange={(e) => setInputVal(e.target.value)}
        sx={{
          border: "none",
          textAlign: "center",
          "::selection": { outline: "none" },
          minWidth: (inputVal.length * 10) + 300 > j ? '100%' : ((inputVal.length * 10) + 300 ) + 'px',
          maxWidth: j,
          borderBottom: "10px solid white",
          background: "none",
          fontSize: 4,
          color: "yellow",
        }}
        placeholder={placeholders[stage]}
      />
     
      <Box
        as="button"
        onClick={() =>stage < 7 ? handleNext() : finishTrack(session.user.id)}
        sx={{
          bg: "white",
          mt: 2,
          color: "#1d1000",
          fontWeight: 800,
          fontSize: 2,
        }}
      >
      {stage < 7 ? 'Next' : 'Finish'}

     
      </Box>
      {stage === 7 &&
      <Box
        as="button"
        onClick={() => window.print()}
        sx={{
          bg: "white",
          mt: 2,
          color: "#1d1000",
          fontWeight: 800,
          fontSize: 2,
        }}
      >
          Print
      </Box> }
      {answers.map((x,i) => <Text sx={{color: 'white'}}><Text sx={{display: 'inline block', mr: 2, opacity: 0.6}}>{labels[i]}</Text>{x}</Text>)}
    </Box>
  );
};

export default worryReport;
