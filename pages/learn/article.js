import { useRouter } from "next/router";
import { Box } from "rebass";
import IframeResizer from 'iframe-resizer-react';

export default function ArticleLearnPage() {
  const { query } = useRouter();
  return (
    <Box
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
      <IframeResizer
        log
        src={query.url}
        style={{ minWidth: "100%", height: '80vh' }}
      />
    </Box>
  );
}
