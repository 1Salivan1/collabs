import React from "react";
import style from "./TextArea.module.scss";

interface Props {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
  error?: string;
}

const TextArea = ({ placeholder, value, error }: Props) => {
  return (
    <div className={style["textarea-block"]}>
      {error ? (
        <span className={style["textarea-block__error"]}>{error}</span>
      ) : (
        ""
      )}
      <textarea
        className={style["textarea-block__textarea"]}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default TextArea;
