import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Button, Text } from "rebass";
import useSWR from "swr";
import moment from 'moment'
const pinkTab = {
  width: "100%",

  bg: "transparent",
  border: "2px solid #2c2c2e60",
  borderRadius: 10,
  display: "flex",
  flexDirection: "column",
 
  px: 2,
  mb: 2,
};

const moods = ["😫", "🙄", "😞", "😳", "🙁", "🥰", "😆", "😪", "😃", "🤣"];

const fetcher = (url, text) =>
  axios.get(url, { params: { text: text } }).then((res) => res.data);
export const JournalCard = ({ x }) => {
  const { data, error } = useSWR(["/api/hello", x.journalMsg], fetcher);

  const [checked, setChecked] = useState(null);
  return (
    <Box key={x.id} sx={pinkTab}>
      <Box sx={{display: 'flex', width: '100%',flexDirection: 'row', justifyContent: 'space-between'}}>
   
        <Text fontWeight={800} fontSize={3}>{moment(x.date.substr(0, 10), "YYYY-MM-DD").format('MMMM Do, YYYY')}</Text>
        <Text  fontWeight={800} fontSize={4} textAlign="center">{moods[x.moodRating]}</Text>
      </Box>

      <Text>{x.journalMsg}</Text>
      {checked ? (
        data && data[0]["_label"] && data[0]["_label"].length > 0 ? (
          data && data[0]["_label"]
        ) : (
          "No Cognition Found, or spelling off"
        )
      ) : (
        <Button onClick={() => setChecked(true)} sx={{ my: 2, bg: "#85CED1" }}>
          Check For Distortions
        </Button>
      )}
    </Box>
  );
};

export default JournalCard;
