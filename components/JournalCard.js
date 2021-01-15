import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Button, Text } from "rebass";
import useSWR from "swr";
const pinkTab = {
    width: "100%",

    bg: "pink",
    borderRadius: 10,
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    px: 2,
    mb: 2
  };

  const moods = ["😫", "🙄", "😞", "😳", "🙁", "🥰", "😆", "😪", "😃", "🤣"];


  const fetcher = (url,text) => axios.get(url,{params:{text: text}}).then(res => res.data)
export const JournalCard = ({x}) => {
    const { data,error} =  useSWR(['/api/hello',x.journalMsg], fetcher)

  
    const [checked,setChecked] = useState(null)
        return  <Box key={x.id} sx={pinkTab}>
        <Text fontSize={1} opacity={0.6} mb={-1}>ID</Text>
           <Text>{x.id}</Text>
           <Text fontSize={1} opacity={0.6} mb={-1}>DATE</Text>
           <Text>{x.date.substr(0,10)}</Text>
           <Text fontSize={1} opacity={0.6} mb={-1}>MOOD</Text>
           <Text textAlign="center">{moods[x.moodRating]}</Text>
           <Text fontSize={1} opacity={0.6} mb={-1}>JOURNAL ENTRY</Text>
           <Text>{x.journalMsg}</Text>
           {checked ? data && data[0]['_label'] && data[0]['_label'].length > 0 ? data && data[0]['_label'] : 'No Cognition Found, or spelling off' : <Button onClick={() => setChecked(true)}  sx={{my: 2, bg: '#85CED1' }}>Check For Distortions</Button>}
         </Box>;
}

export default JournalCard