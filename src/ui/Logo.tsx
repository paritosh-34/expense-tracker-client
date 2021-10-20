import { FC, CSSProperties } from 'react';
import styles from '@styles/ui/Logo.module.scss';

interface LogoProps {
  loading?: boolean;
  style?: CSSProperties;
}

const Logo: FC<LogoProps> = ({ loading = false, style }) => (
  <span className={`${styles.logo} ${loading ? styles.loading : ''}`} style={style}>
    CovidExpenseTracker
  </span>
);

export default Logo;
