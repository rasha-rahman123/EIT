import { useRef, useState } from "react";
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
  async function finishTrack(id : number) {
    
    await axios('/api/addScore', {params: {id: id}})
    
    
    window.location.assign(`/home?completedActivity=true?activty=worry-report`)
  }
export const worryReport : React.FC = ({}) => {
  const [stage, setStage] = useState<number>(0);
  
  const [answers, setAnswers] = useState<string[]>([]);
  const j = typeof window !== 'undefined' && window.innerWidth;
  const [inputVal, setInputVal] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>()
  const handleNext = () => {
    setStage((c) => c + 1);
    var j = [...answers];
    j.push(inputVal);
    setInputVal(" ");
    setAnswers(j);
    inputRef.current.focus();
  };


  const [session, loading] = useSession()
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
  if (session) return (
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
        ref={inputRef}
        onKeyPress={(e : React.KeyboardEvent<HTMLInputElement>) => {
          if(e.key === 'Enter'){
            e.preventDefault();
            handleNext();
          }
        }}
        display={placeholders[stage] ? placeholders[stage].length === 0 ? 'none' : 'initial' : 'none'}
        onChange={(e : React.FormEvent<HTMLInputElement>) => setInputVal(e.currentTarget.value)}
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
        //@ts-ignore
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
