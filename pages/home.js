import Router from "next/router";
import { memo, useContext, useEffect, useState } from "react";
import { Box, Image, Text } from "rebass";
import Card from "../components/Card";
import { AuthContext } from "../context/AuthContext";
import { MdEventAvailable, MdSpeaker } from "react-icons/md";
import { IoBandage, IoBed, IoBrush, IoFastFood } from "react-icons/io5";
import Link from "next/link";
import useSWR from "swr";
import firebase from "firebase";
import Modal from "react-modal";
import Typist from "react-typist";
import { VscFeedback, VscMortarBoard } from "react-icons/vsc";
import Card2 from "../components/Card2";
import Loading from "../components/Loading";
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
    name: "Draw It Down",
    desc: "Express your feelings visually",
    desc2: "Draw it out",
    icon: <IoBrush />,
    color: "#43A047",
    slug: "draw-it-down",
  },
];

const helpRec = [
  {
    name: "How 2 Get Meditation To Actually Work",
    desc: "What makes meditation powerful",
    desc2: "How can we reach that",
    icon: <MdEventAvailable />,
    color: "#113FA6",
    slug: "how-2-use-meditation",
  },
  {
    name: "Exposing My Fears",
    desc: "How to carefully let fears go",
    desc2: "How can we reach that",
    icon: <VscMortarBoard />,
    color: "#3C8033",
    slug: "exposing-my-fears",
  },
  {
    name: "Am I Depressed",
    desc: "What makes one depressed",
    desc2: "How can we reach that",
    icon: <IoBandage />,
    color: "#82771A",
    slug: "am-i-depressed",
  },
  {
    name: "5 Tips to Sleep Better",
    desc: "Break some bad sleep habits",
    desc2: "How can we reach that",
    icon: <IoBed />,
    color: "#7D2B2B",
    slug: "5-sleep-tips",
  },
];
const Home = (props) => {
  const { token, user, logout, uuid } = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState(null);
  const [search, setSearch] = useState("");
  const [profileHover, setProfileHover] = useState();
  const [queries, setQueries] = useState();
  const [score, setScore] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const { data } = useSWR(
    "/api/getMediumArticle",
    fetch("/api/getMediumArticle").then((r) => r.json())
  );np
  useEffect(async () => {
    Router && (await setQueries(Router.query));
    Router &&
      queries &&
      queries.completedActivity === "true" &&
      setModalOpen(true);
  }, [Router, queries]);
  useEffect(() => {
    user && setUserEmail(user.email);
  }, [user]);
  const [doc, setDoc] = useState(null);

  const posts = data;


  const [postser, setPosts] = useState();

  useEffect(() => {
    posts && memo(setPosts(posts), [postser]);
  }, [posts, props]);

  useEffect(() => {
    token && uuid && loadProfile();
  }, [uuid, token]);

  async function loadProfile() {
    const db = await firebase.firestore();
    const doc = await db.collection("Users").doc(uuid).get();
    if (!doc.exists) {
    } else {
      setDoc(doc.data());
      console.log(doc.data());
    }
  }
  useEffect(() => {
    posts && console.log(posts["rss"].channel.item);
  }, [posts]);

  useEffect(() => {
    uuid &&
      firebase
        .firestore()
        .collection("Users")
        .doc(uuid)
        .get()
        .then((data) =>
          data.data()["score"] ? setScore(data.data()["score"]) : setScore(0)
        );
  }, [uuid]);

  return (
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
        width: "100%",
        flexDirection: "column",
        p: 4,
      }}
    >
      <Text sx={{ mt: 2, mb: 1, fontWeight: 700, fontSize: 28 }}>
        {doc && doc.firstName ? (
          `Hello, ${doc && doc.firstName && doc.firstName[0].toUpperCase()}${
            doc && doc.firstName && doc.firstName.substr(1).toLowerCase()
          }!`
        ) : (
          <Loading width={300} height={28} />
        )}
      </Text>
      <Box
        as="input"
        mb={4}
        placeholder={"Search"}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        width={"100%"}
        fontSize={14}
        sx={{
          bg: "none",
          border: "none",
          background: "rgba(0, 0, 0,0.05)",
          p: 3,
          px: 3,
          borderRadius: 10,
          boxShadow: "inset 0px 0px 3px #00000030",
        }}
      ></Box>
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
          my: 4,
        }}
      >
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
          {queries &&
            taskCards
              .filter((bn) => bn.slug === queries.activity)
              .map((x, i) => (
                <Card
                  key={i}
                  cardInfo={{
                    name: x.name,
                    color: x.color,
                    icon: x.icon,
                    desc: x.desc,
                    desc2: x.desc2,
                  }}
                />
              ))}
          <Text>You now have a total {score} points!</Text>
        </Modal>
        {!modalOpen &&
        taskCards.filter((bn) =>
          bn.name.toLowerCase().includes(search.toLowerCase())
        ).length > 0 ? (
          taskCards

            .filter((bn) =>
              bn.name.toLowerCase().includes(search.toLowerCase())
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
        )}
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
        <a href="https://storyset.com/work">Illustration by Freepik Storyset</a>
        {!modalOpen &&
          postser &&
          postser["rss"] &&
          postser["rss"].channel.item.map((x, i) => (
            <Link key={i} href={x.link._text}>
              <a>
                <Card2
                  cardInfo={{
                    name: x.title._text,
                    desc: x.description._cdata.substr(0, 40) + "...",
                    color: posts["rss"].channel.item.indexOf(x),
                  }}
                />
              </a>
            </Link>
          ))}
      </Box>
    </Box>
  );
};

export default Home;
