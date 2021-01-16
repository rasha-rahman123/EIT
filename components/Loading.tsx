import { Box } from "rebass";
import styles from "../styles/Home.module.css";
type Props = {
  width: string;
  height: string;
  rows: number;
};

export const Loading = ({ width, height, rows = 1 }: Props) => {
  const array = new Array(rows).fill(0);

  return (
    <Box>
      {array.map((x, i) => (
        <Box
          className={styles.loading}
          key={i + x}
          width={width}
          height={height}
        ></Box>
      ))}
    </Box>
  );
};

export default Loading;
