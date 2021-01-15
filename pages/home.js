import Router from "next/router";

import { getSession, useSession } from "next-auth/client";
import { memo, useContext, useEffect, useMemo, useState } from "react";
import { Box, Button, Flex, Image, Text } from "rebass";
import Card from "../components/Card";
import { AuthContext } from "../context/AuthContext";
import { MdEventAvailable, MdRssFeed, MdSpeaker } from "react-icons/md";
import { IoBandage, IoBed, IoBrush, IoFastFood, IoJournal } from "react-icons/io5";
import Link from "next/link";
import firebase from "firebase";
import Modal from "react-modal";
import Typist from "react-typist";
import { VscFeedback, VscMortarBoard } from "react-icons/vsc";
import Card2 from "../components/Card2";
import Loading from "../components/Loading";
import axios from "axios";
import { Grid, Textarea } from "theme-ui";
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
    width: '100%',
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
    background: '#03174C',
  }
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

const fetcherId = (url,id) => axios.get(url,{params:{id: id}}).then(res => res.data)

const Home = (props) => {
 

  const [userEmail, setUserEmail] = useState(null);
  const [search, setSearch] = useState("");
  const [profileHover, setProfileHover] = useState();
  const [queries, setQueries] = useState();

  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState();
  const [uid, setUid] = useState();
  const [session, loading] = useSession();

  const [djCompleted, setDJCompleted] = useState('init');
  const [mood, setMood] = useState();
  const [doc, setDoc] = useState(null);
  const [textarea, setTextarea] = useState('');
  const [postser, setPosts] = useState();
  const [posts, setP] = useState();

  async function saveJournal(id, textarea, mood) {
    textarea.length > (30*4) && textarea.length < (255*4) &&
      (await axios("/api/saveJournal", {
        method: "POST",
        params: { id: id, msg: textarea, mood: mood },
      }).then((res) => Router.reload()));
  }

  const {data: da, error} = useSWR(session && ['/api/cdj',session.user.id],fetcherId)
  console.log(djCompleted)

  useEffect(() => {
   da && da['complete'] ? setDJCompleted('truth') : setDJCompleted('fake')
  },[da])
  // useEffect(() => {
  //   const timer = setTimeout(() => check, 5000);
  //   timer;

  //   const check = () => {
  //     if (session) {
  //       Router.push("/login");
  //     } else Router.push("/login");
  //   };
  // }, []);
  useEffect(() => {
    console.log('q',props)
  },[])
  const rssFeed = useMemo(
    () =>
      postser &&
      postser["rss"] && 
      postser["rss"].channel.item.filter((x,i) => i < 5).map((x, i) => (
        <Link key={i} href={x.link._text}>
          <a>
            <Card2
              cardInfo={{
                name: x.title._text,
                desc: x.description._cdata.substr(0, 40) + "...",
                color: postser["rss"].channel.item.indexOf(x),
              }}
            />
          </a>
        </Link>
      )),
    [postser]
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
  
  const getScore = async () => {
    const res =
      !score &&
      (await axios("/api/getScore", {
        params: { id: session && session.user && session.user.id },
      }));
    return res.data;
  };

  const [score,setScore] = useState();


  useEffect(async () => {
    var datar =
      !data &&
      !postser &&
      !posts &&
      (await fetch("/api/getMediumArticle").then((r) => r.json()));
    !data && setData(datar);
    !postser && setPosts(datar);
    !posts && setP(datar);
    return () => {
      setData(null);
      setPosts(null);
      setP(null);
    };
  }, []);
  useEffect(async () => {
    Router && (await setQueries(Router.query));
    Router &&
      queries &&
      queries.completedActivity === "true" &&
      setModalOpen(true);
    return setModalOpen(false);
  }, [Router, queries]);

 
  // useEffect(() => {
  //   token &&
  //     firebase
  //       .firestore()
  //       .collection("Users")
  //       .doc(token.uid)
  //       .get()
  //       .then((data) =>
  //         data.data()["score"] ? setScore(data.data()["score"]) : setScore(0)
  //       );
  // }, [token]);

  if (loading) {
    return (
      <Box>
        <Text as="h1">Loading</Text>
      </Box>
    );
  }
  return session ? (
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
      <Text sx={{ mt: 2, mb: 1, fontWeight: 700, fontSize: 3 }}>
        {session ? (
          `HELLO ${session.user.name.toUpperCase()}!`
        ) : (
          <Loading width={300} height={28} />
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
          onChange={(e) => setSearch(e.target.value)}
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
          isOpen={djCompleted === 'fake' && session}
        
          style={journalModalStyles}
          contentLabel="Congrats!"
        >
          <Box sx={{fontSize: 6, top: -50, fontWeight: 800, color: 'white'}}>EIT</Box>
          {!loading && session && session.user && da && <>
          <Text>
            Welcome back! You have not completed your daily mood and journal as
            of midnight (NYC).
          </Text>
          <Text>Click on the mood that represents how you feel</Text>
          <Flex>
            {["😫", "🙄", "😞", "😳", "🙁", "🥰", "😆", "😪", "😃", "🤣"].map(
              (x, i) => (
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
              )
            )}
          </Flex>
          <Text>Journal Entry</Text>
          <Box display="grid" sx={{gridTemplateColumns: '50% 50%'}}><Box sx={{textAlign: "center"}}><Text>Minimum{textarea.split(' ').length > 21 ? '✔️' : '❌'}</Text></Box><Box sx={{textAlign: "center"}}><Text>Maximum{textarea.split(' ').length < 80 ? '✔' : '❌'}</Text></Box></Box>
          <Textarea  value={textarea} onChange={e => setTextarea(e.target.value)} placeholder="Today, I had an easier time getting out of bed..." />
          <Button onClick={() => mood && textarea.length > 0 && session && saveJournal(session && session.user.id, textarea, mood)} my={3}><Text color="brayyy" >Save Journal</Text></Button></>}
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
  ) : (
    <> </>
  );
};

export default Home;
