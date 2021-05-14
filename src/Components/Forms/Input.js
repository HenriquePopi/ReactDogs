import React from 'react';
import Styles from './Input.module.css';
const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  erro,
  onBlur,
  ...props
}) => {
  return (
    <div className={Styles.wrapper}>
      <label className={Styles.wrapper} htmlFor={name}>
        {label}
      </label>
      <input
        className={Styles.input}
        id={name}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      />
      {erro && <p className={Styles.erro}>{erro}</p>}
    </div>
  );
};

export default Input;
