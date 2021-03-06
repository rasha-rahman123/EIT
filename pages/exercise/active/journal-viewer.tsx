import axios from "axios";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { Box, Text } from "rebass";
import useSWR from "swr";
import JournalCard from "../../../components/JournalCard";

const fetcher = (url : string, id : number) =>
  axios.get(url, { params: { id: id } }).then((res) => res.data);

export const journalViewer : React.FC = () => {
  const [session, loading] = useSession();
  const router = useRouter()
  const { data } = useSWR(
    //@ts-ignore
    ["/api/getJournals",  session && session.user.id],
    fetcher
  );
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
        <Box sx={{ cursor: "pointer" }} onClick={() => router.back()}>
          {"<"}
        </Box>
        <Text fontWeight="800" fontSize={3}>
          Journal Viewer
        </Text>
      </Box>

      {data && data.map((x : [], _i : number) => <JournalCard key={_i} x={x} />)}
    </Box>
  )};
export default journalViewer;
