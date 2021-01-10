import Image from "next/image";
import styles from '../styles/Home.module.css'

export const Logo = ({ width, height, animation=true }) => {
  return (
    <Image
        className={animation ? styles.logo : ''} 
      src="/logo/svg/main2.svg"
      width={width}
      height={width}
      layout="intrinsic"
      priority
      
    />
  );
};

export default Logo;
