import { FC } from 'react';
import Logo from '@ui/Logo';
import styles from '@styles/components/Loading.module.scss';

interface LoadingProps {
  background?: boolean;
}

const Loading: FC<LoadingProps> = ({ background = false }) => (
  <div className={`${styles.container} ${background ? styles.background : ''}`}>
    {background && <Logo loading />}
    <div className={styles.lds__ellipsis}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loading;
