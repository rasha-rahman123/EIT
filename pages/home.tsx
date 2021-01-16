import Router from "next/router";
import { GetServerSideProps } from "next";
import {  useSession } from "next-auth/client";
import { useEffect, useMemo, useState } from "react";
import { Box, Button, Flex, Text } from "rebass";
import Card from "../components/Card";

import { MdSpeaker } from "react-icons/md";
import { IoFastFood, IoJournal, IoReceipt } from "react-icons/io5";
import Link from "next/link";
import Modal from "react-modal";
import Typist from "react-typist";
import { VscFeedback } from "react-icons/vsc";
import Card2 from "../components/Card2";
import Loading from "../components/Loading";
import axios from "axios";
import { Textarea } from "theme-ui";
import useSWR from "swr";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: 30,
    boxShadow: "0px 0px 3px #00000040, 0px 0px 20px #00000015",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    zIndex: 20,
    background: "rgba(255, 255, 255,0.2)",
  },
};

const journalModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    width: "100%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: 30,
    boxShadow: "0px 0px 3px #00000040, 0px 0px 20px #00000015",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    zIndex: 20,
    background: "rgba(1, 1, 1,0.4)",
    color: "white",
  },
  overlay: {
    background: "#03174C",
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#__next");
const taskCards = [
  {
    name: "Repeated Securities",
    desc: "Push yourself a compliment",
    desc2: "Helps build confidence",
    icon: <MdSpeaker />,
    color: "#AD1457",
    slug: "repeated-securities",
  },
  {
    name: "Overeating Tracker",
    desc: "Track what you just ate",
    desc2: "Helps build control",
    icon: <IoFastFood />,
    color: "blue",
    slug: "overeat-tracking",
  },
  {
    name: "Toxic Message Detector",
    desc: "A.I. Cognition Distortion Search",
    desc2: "Find bad speech patterns",
    icon: <VscFeedback />,
    color: "#9C27B0",
    slug: "cog-trainer",
  },
  {
    name: "Journal Viewer",
    desc: "Witness the cognitive distortions in your own daily journals ",
    desc2: "Track your mood",
    icon: <IoJournal />,
    color: "#43A047",
    slug: "journal-viewer",
  },
  {
    name: "The Worry Report",
    desc: "Lets walk through one of your worries",
    desc2: "Helps lower problem stress",
    icon: <IoReceipt />,
    color: "#b09c27",
    slug: "worry-report",
  },
];

const fetcherId = (url: string, id: number) =>
  axios.get(url, { params: { id: id } }).then((res) => res.data);

const Home: React.FC<{ go: [] }> = ({ go }) => {
  const [search, setSearch] = useState<string>("");
  
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  
  const [session, loading] = useSession();
  const [djCompleted, setDJCompleted] = useState<string>("init");
  const [mood, setMood] = useState<number>();
  const [textarea, setTextarea] = useState<string>("");

  const { data: da } = useSWR(
    ["/api/cdj", session && session.user.id],
    fetcherId
  );
  const score : number = 9;

  async function saveJournal(id: number, textarea: string, mood: number) {
    textarea.split(" ").length > 21 &&
      textarea.split(" ").length < 80 &&
      (await axios("/api/saveJournal", {
        method: "POST",
        params: { id: id, msg: textarea, mood: mood },
      }).then(() => Router.reload()));
  }

  useEffect(() => {
    da && da["complete"] ? setDJCompleted("truth") : setDJCompleted("fake");
  }, [da]);

  const rssFeed = useMemo(
    () =>
      go &&
      go["rss"] &&
      go["rss"].channel.item
        .filter((_x, i) => i < 5)
        .map((x, i) => (
          <Link key={i} href={x.link._text}>
            <a>
              <Card2
                cardInfo={{
                  name: x.title._text,
                  desc: x.description._cdata.substr(0, 40) + "...",
                  color: go["rss"].channel.item.indexOf(x),
                }}
              />
            </a>
          </Link>
        )),
    [go]
  );
  const exerciseCards = useMemo(
    () =>
      taskCards.filter((bn) =>
        bn.name.toLowerCase().includes(search.toLowerCase())
      ).length > 0 ? (
        taskCards

          .filter((bn) =>
            bn.name.toLowerCase().includes(search && search.toLowerCase())
          )
          .map((x, i) => (
            <Link
              key={i}
              prefetch={true}
              href={{
                pathname: `/exercise/${x.slug}`,
                query: { col: x.color, slug: x.slug, name: x.name },
              }}
            >
              <a>
                <Card
                  cardInfo={{
                    name: x.name,
                    color: x.color,
                    icon: x.icon,
                    desc: x.desc,
                    desc2: x.desc2,
                    kee: i,
                    slug: x.slug,
                  }}
                />
              </a>
            </Link>
          ))
      ) : (
        <Text
          sx={{
            alignSelf: "self-start",
            px: 2,
            fontWeight: 800,
            fontSize: 6,
            opacity: 0.6,
          }}
        >
          Nothing Found
        </Text>
      ),
    [taskCards, search]
  );

  if (loading) {
    return (
      <Box>
        <Text as="h1">Loading</Text>
      </Box>
    );
  }
  if (session) return (
    <Box
      sx={{
        filter: modalOpen && "blur(2px)",
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
      <Text sx={{ mt: 2, mb: 1, fontWeight: 700, fontSize: 3 }}>
        {session ? (
          `HELLO ${session.user.name.toUpperCase()}!`
        ) : (
          <Loading width={"300px"} height={"28px"} rows={1} />
        )}
      </Text>

      <Text
        sx={{
          fontSize: 24,
          my: 2,
          px: "2px",
          textDecoration: "underline",
          textDecorationColor: "white",
          textDecorationThickness: 4,

          mt: 3,
          mb: 1,
          fontWeight: 700,
        }}
      >
        Cognitive Exercises{" "}
        <Text opacity={0.6} display="inline-block">
          {" (" + taskCards.length})
        </Text>
        <Box
          as="input"
          placeholder={"Search"}
          value={search}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setSearch(e.currentTarget.value)
          }
          width={[200]}
          fontSize={14}
          sx={{
            bg: "none",
            border: "none",
            background: "rgba(0, 0, 0,0.05)",
            p: 2,
            px: 3,
            borderRadius: 5,
            boxShadow: "inset 0px 0px 3px #00000030",
            display: "block",
          }}
        ></Box>
      </Text>
      <Box
        display="flex"
        sx={{
          flexDirection: "row",
          flexWrap: "nowrap",
          overflowX: "auto",
          height: "400px",
          overflowY: "hidden",
          position: "relative",
          alignItems: "center",
          "::-webkit-scrollbar": {
            width: 6,
            py: 1,
          },
          "::-webkit-scrollbar-thumb": {
            background: "#2C2C2E20",
            maxHeight: 20,
            borderRadius: 30,
          },
          mb: 1,
          mt: 2,
        }}
      >
        <Modal
          isOpen={djCompleted === "fake" && session}
          style={journalModalStyles}
          contentLabel="Congrats!"
        >
          <Box sx={{ fontSize: 6, top: -50, fontWeight: 800, color: "white" }}>
            EIT
          </Box>
          {!loading && session && session.user && da && (
            <>
              <Text>
                Welcome back! You have not completed your daily mood and journal
                as of midnight (NYC).
              </Text>
              <Text>Click on the mood that represents how you feel</Text>
              <Flex>
                {[
                  "😫",
                  "🙄",
                  "😞",
                  "😳",
                  "🙁",
                  "🥰",
                  "😆",
                  "😪",
                  "😃",
                  "🤣",
                ].map((x, i) => (
                  <Text
                    onClick={() => setMood(i)}
                    mx={2}
                    fontSize={5}
                    sx={{
                      textDecoration: mood === i && "underline",
                      textDecorationWidth: mood === i && "30px",
                      textUnderlineOffset: 5,
                      ":hover": {
                        textDecoration: "underline",
                        textDecorationWidth: "30px",
                        textUnderlineOffset: 5,
                        cursor: "pointer",
                      },
                    }}
                  >
                    {x}
                  </Text>
                ))}
              </Flex>
              <Text>
                Journal Entry (minimum three long sentences)
              </Text>
              <Box display="grid" sx={{ gridTemplateColumns: "50% 50%" }}>
                <Box sx={{ textAlign: "center" }}>
                  <Text>
                    Minimum{textarea.split(" ").length > 21 ? "✔️" : "❌"}
                  </Text>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Text>
                    Maximum{textarea.split(" ").length < 80 ? "✔" : "❌"}
                  </Text>
                </Box>
              </Box>
              <Textarea
                value={textarea}
                onChange={(e) => setTextarea(e.target.value)}
                placeholder="Today, I had an easier time getting out of bed..."
              />
              <Button
              bg={'black'}
              color={'whitesmoke'}
                onClick={() =>
                  mood &&
                  textarea.length > 0 &&
                  session &&
                  saveJournal(+session.user.id, textarea, mood)
                }
                my={3}
              >
                <Text color="whitesmoke">Save Journal</Text>
              </Button>
            </>
          )}
        </Modal>
        <Modal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          style={customStyles}
          contentLabel="Congrats!"
        >
          {" "}
          <Typist cursor={{ show: false }}>
            <Text>Exercise Completed.</Text> <Text>Well done!</Text>{" "}
          </Typist>
          <Text>You now have a total {score} points!</Text>
        </Modal>
        {!modalOpen && exerciseCards}
      </Box>
      <Text
        sx={{
          fontSize: 24,
          my: 2,
          px: "2px",
          textDecoration: "underline",
          textDecorationColor: "white",
          textDecorationThickness: 4,

          mt: 3,
          mb: 1,
          fontWeight: 700,
        }}
      >
        Helpful Resources{" "}
        <Text opacity={0.6} display="inline-block">
          {" (external"})
        </Text>
      </Text>

      <Box
        display="flex"
        sx={{
          flexDirection: "row",
          flexWrap: "nowrap",
          overflowX: "auto",
          height: "350px",
          overflowY: "hidden",
          position: "relative",
          mb: 4,
          "::-webkit-scrollbar": {
            width: 6,
            py: 1,
          },
          "::-webkit-scrollbar-thumb": {
            background: "#2C2C2E20",
            maxHeight: 20,
            borderRadius: 30,
          },
        }}
      >
        {!modalOpen && rssFeed}

        <a href="https://storyset.com/work">Illustration by Freepik Storyset</a>
      </Box>
    </Box>
  )
};

export default Home;

export const  getServerSideProps: GetServerSideProps = async _context => {
  
  const feed = await axios.get(process.env.NEXTAUTH_URL + "/api/getMediumArticle");
  const go = await feed.data;

  return { props: { go } };
};
