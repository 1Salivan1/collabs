import React from "react";
import style from "./Input.module.scss";

interface Props {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  error?: string;
  placeholder?: string;
  type?: string;
}

const Input = ({ onChange, placeholder, value, error, type }: Props) => {
  return (
    <div className={style["input-block"]}>
      {error ? (
        <span className={style["input-block__error"]}>{error}</span>
      ) : (
        ""
      )}

      <input
        className={style["input-block__input"]}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        type={type}
      />
    </div>
  );
};

export default Input;
