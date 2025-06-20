import React from "react";
import style from "./Button.module.scss";

interface Props {
  onClick?: () => void;
  text?: string;
  type?: "button" | "submit" | "reset";
}

const Button = ({ onClick, text, type }: Props) => {
  return (
    <button className={style["button"]} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export default Button;
