import axios from "axios";
import { useSession } from "next-auth/client";
import { Router } from "next/router";
import { Box, Text } from "rebass";
import useSWR from "swr";

const aquaTab = {
  width: "100%",
  height: 50,
  bg: "#85CED1",
  borderRadius: 10,
  display: "grid",
  gridTemplateColumns: "5% 10% 5% 80%",
  alignItems: 'center',
  px: 2,
  mb: 3
};

const pinkTab = {
    width: "100%",

    bg: "pink",
    borderRadius: 10,
    display: "grid",
    gridTemplateColumns: "5% 10% 5% 80%",
    alignItems: 'center',
    px: 2,
    mb: 2
  };
const moods = ["😫", "🙄", "😞", "😳", "🙁", "🥰", "😆", "😪", "😃", "🤣"]
const fetcher = (url,id) => axios.get(url,{params:{id: id}}).then(res => res.data)

export const journalViewer = (props) => {
const [session] = useSession()
const { data,error} =  useSWR(session && ['/api/getJournals',session.user.id], fetcher)
console.log(data)
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
        width: "100%",
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
        Journal Viewer
      </Text>
      </Box>
      <Box sx={aquaTab}>
        <Text>ID</Text>
        <Text>DATE</Text>
        <Text>MOOD</Text>
        <Text>ENTRY</Text>
     
      </Box>
     {data && data.map((x,i) =>  <Box key={x.id} sx={pinkTab}>
        <Text>{x.id}</Text>
        <Text>{x.date.substr(0,10)}</Text>
        <Text textAlign="center">{moods[x.moodRating]}</Text>
        <Text>{x.journalMsg}</Text>
      </Box>)}
    </Box>
  );
};

export default journalViewer;
