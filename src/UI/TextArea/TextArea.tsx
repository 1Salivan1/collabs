import React from "react";
import style from "./TextArea.module.scss";

interface Props {
  placeholder?: string;
  value?: string;
}

const TextArea = ({ placeholder, value }: Props) => {
  return (
    <textarea
      className={style["textarea"]}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default TextArea;
