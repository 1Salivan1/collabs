import React from "react";
import style from "./TextArea.module.scss";

interface Props {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  value?: string;
  error?: string;
}

const TextArea = ({ placeholder, value, error, onChange }: Props) => {
  return (
    <div className={style["textarea-block"]}>
      {error ? (
        <span className={style["textarea-block__error"]}>{error}</span>
      ) : (
        ""
      )}
      <textarea
        onChange={onChange}
        className={style["textarea-block__textarea"]}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default TextArea;
