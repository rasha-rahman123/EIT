import { Box } from "rebass";
import styles from '../styles/Home.module.css'
export const Loading = ({width,height,rows = 1}) => {
        return new Array(rows).fill(0).map((x,i) => <Box className={styles.loading} key={i} width={width} height={height}></Box>);
}

export default Loading