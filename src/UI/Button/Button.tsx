import React from "react";
import style from "./Button.module.scss";

interface Props {
  onClick?: () => void;
  text?: string;
}

const Button = ({ onClick, text }: Props) => {
  return (
    <button className={style["button"]} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
