import { FC } from 'react';
import styles from '@styles/ui/Logo.module.scss';

interface LogoProps {
  loading?: boolean;
}

const Logo: FC<LogoProps> = ({ loading = false }) => (
  <span className={`${styles.logo} ${loading ? styles.loading : ''}`}>CovidExpenseTracker</span>
);

export default Logo;
