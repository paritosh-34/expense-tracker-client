/* eslint-disable react/button-has-type */
import { CSSProperties, FC } from 'react';
import styles from '@styles/ui/Button.module.scss';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  style?: CSSProperties;
  onClick?: () => void;
  className?: string;
}

const Button: FC<ButtonProps> = ({ type, children, style, className = '', onClick }) => (
  <button
    type={type}
    className={`${styles.btn} ${className}`}
    style={style}
    onClick={onClick && onClick}
  >
    {children}
  </button>
);

export default Button;
