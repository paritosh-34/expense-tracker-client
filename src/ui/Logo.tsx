import { FC, CSSProperties, useContext } from 'react';
import { AppContext } from '@store/context';
import styles from '@styles/ui/Logo.module.scss';

interface LogoProps {
  loading?: boolean;
  style?: CSSProperties;
  greyShadow?: boolean;
}

const Logo: FC<LogoProps> = ({ loading = false, greyShadow: shadow = false, style }) => {
  const { state } = useContext(AppContext);
  return (
    <span
      className={`${styles.logo} ${loading ? styles.loading : ''} ${
        shadow ? styles.greyShadow : ''
      } ${state.isDarkMode ? styles.dark : ''}`}
      style={style}
    >
      CovidExpenseTracker
    </span>
  );
};

export default Logo;
