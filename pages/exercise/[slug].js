import { Box, Button, Text } from "rebass";
import Image from "next/image";
import Router from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Loading from "../../components/Loading";
import nookies from 'nookies'
import {useSession} from 'next-auth/client'
const args = [
  {
    slug: "repeated-securities",
    time: 3,
    taskInfo:
      "Record up to 5 self-compliments. Something like, ‘I like the way my face looks’ or ’I have good taste in video games’",
    whyInfo:
      "Yes, there are valid reasons for feeling insecure, but the more you repeat the good qualities to yourself, the less the  negative ones mattter.",
  },
  {
    slug: "overeat-tracking",
    time: 2,
    taskInfo:
      "Add everything you recently ate that you feel like you have overate. We will save your list so you can review the current and previous ones over and over again.",
    whyInfo:
      "Sometimes we eat without realizing how much we are eating. By tracking what you eat, in a simple format as this, can really help you train to become more concious of what you put in your body.",
  },
  {
    slug: "cog-trainer",
    time: 5,
    taskInfo:
      "Paste a message from yourself or someone else that you want analyzed. The AI will do its best to find cognitive distortions that can be related to toxic language.",
    whyInfo:
      "Cognitive distortions are found in everyones speech. They are ways people should re evaluate how they speak so they can be heard and understood better.",
  },
  {
    slug: "journal-viewer",
    time: 5,
    taskInfo:
      "Read and run an experiment on your own data. See how you were a week ago versus how you are now, etc. Find your flaws and embrace it.",
    whyInfo:
      "In CBT, it is proven that jotting information down helps people get out of thought patterns and see cognitive distortions.",
  },
  {
    slug: "worry-report",
    time: 5,
    taskInfo:
      "Answer a couple questions about your worry and then re evaluate your worry.",
    whyInfo:
      "When you are worried about something, it’s easy to imagine the worst thing that could possibly happen. In reality, these worries may never come true. What could happen isn’t the same as what will happen.",
  },
];
export const ExercisePage = ({}) => {
  const [queries, setQueries] = useState();
  const [taskInfo, setTaskInfo] = useState();
  const [timeInfo, setTimeInfo] = useState();
  const [whyInfo, setWhyInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState();
  useEffect(async () => {
    Router && (await setTimeout(() => setQueries(Router.query), 1000));
    const j = (await queries) && args.filter((x) => x.slug === queries.slug);
    queries && (await setTaskInfo(j[0].taskInfo));
    queries && (await setTimeInfo(j[0].time + " min"));
    queries && (await setWhyInfo(j[0].whyInfo));
    (await queries) && taskInfo && timeInfo && whyInfo && setLoading(false);
  }, [Router, queries, whyInfo]);
  const imageSize = 300;
  const [session, raw] = useSession();
  


  useEffect(() => {
    liked &&
      navigator.canShare &&
      navigator.share({
        url: "${process.env.NEXT_PUBLIC_DOMAIN}/home",
        title: "Emotional Intellgence Trainer",
        text: "If you learn to master your emotions, you can master all",
      });
  }, [liked]);


  if (raw) {
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
  return (
   session ? <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        position: "absolute",
        p: 4,
        bg: "rgba(255, 255, 255,0.2)",
        top: 0,
        left: 0,

        right: 0,
        borderRadius: 12,
      }}
    >
      {loading ? (
        <>
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

            <Box fontSize={16} onClick={() => Router.push("/home")}></Box>
          </Box>

          <Box
            width={168}
            height={189}
            sx={{
              borderRadius: 20,
              alignSelf: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              p: 3,
            }}
          >
            <Loading width={168} height={189} />
          </Box>
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Loading width={314} height={20} />
          </Box>
          <Loading width="90vw" height={20} rows={4} />

          <Box
            sx={{
              width: "100%",
              mt: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading width={314} height={70} />
          </Box>
        </>
      ) : (
        <>
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

            <Box fontSize={24}>
              {liked ? (
                <Text
                  onClick={() => setLiked(false)}
                  sx={{ color: queries && queries.col }}
                >
                  {" "}
                  <AiFillHeart />
                </Text>
              ) : (
                <Text onClick={() => setLiked(true)}>
                  {" "}
                  <AiOutlineHeart />
                </Text>
              )}
            </Box>
          </Box>

          <Box
            width={168}
            bg={queries && queries.col}
            sx={{
              borderRadius: 20,
              alignSelf: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              p: 3,
            }}
          >
            <Text
              sx={{
                lineHeight: "100%",
                fontSize: 3,
                fontWeight: 700,
                color: "#FFFFFF",
                mixBlendMode: "overlay",

                py: 2,
              }}
            >
              {queries && queries.name}
            </Text>
          </Box>

          {queries && queries.slug && args ? (
            <Box
              display="flex"
              flexDirection="column"
              sx={{ textAlign: "center" }}
            >
              <Box sx={{ margin: "0 auto" }}>
                <Image
                  layout="intrinsic"
                  width={imageSize} height={imageSize}
                  src={`/story/${args
                    .filter((x) => x.slug === queries.slug)
                    .map((x) => x.slug)}-1.png`}
                />
              </Box>
              <a href="https://storyset.com/work">
                Illustration by Freepik Storyset
              </a>
            </Box>
          ) : (
            <Loading width={100} height={100} />
          )}
          <Box
            as="a"
            href={`/exercise/active/${queries && queries.slug}`}
            sx={{
              width: "100%",
              mt: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Button
              sx={{
                width: 314,
                height: 70,
                borderRadius: 30,
                bg: queries && queries.col,
                color: "brayyy",

                fontSize: 18,
                fontWeight: 700,
                mt: 4,
                ":hover": {
                  boxShadow: "0px 0px 3px #00000050, 0px 0px 10px #00000015",
                  cursor: "pointer",
                },
              }}
            >
              <Text sx={{ color: "white", mixBlendMode: "overlay" }}>
                {" "}
                Start {timeInfo && `(${timeInfo})`}
              </Text>
            </Button>
          </Box>
          <Box mt={5}>
            <Text fontWeight="800">Task Info</Text>
            <Text as="p" opacity={0.5}>
              {taskInfo && taskInfo}
            </Text>
          </Box>

          <Box sx={{ my: 4, mb: 5 }}>
            <Text fontWeight="800">Why This Works*</Text>
            <Text as="p" opacity={0.5}>
              {whyInfo && whyInfo}
            </Text>
          </Box>
        </>
      )}
    </Box> : <Box>I do not think you are supposed to be here. <Text as="a" onClick={() => Router.push('/login')}> Click here to login.</Text></Box>
  );
};

export default ExercisePage;

export async function getServerSideProps(context) {
  try {
    const cookies = await nookies.get(context);
    const token = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/getToken?token=${cookies.token}`
    ).then((data) => data.json());

    return {
      props: {
        session: token,
      },
    };
  } catch (err) {
    context.res.writeHead(302, { location: "/login" });
    context.res.end();
    return { props: [] };
  }
}
