"use client";
import React from "react";
import style from "./sortbytags.module.scss";
import { tags } from "./tags";

interface Props {
  direction?: "row" | "column";
  tittle?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SortByTags = (props: Props) => {
  return (
    <div className={style.sort}>
      <h4>{props.tittle}</h4>
      <div
        className={
          props.direction === "row"
            ? style["types-block__row"]
            : style["types-block__column"]
        }
      >
        {tags.map((tag) => (
          <label
            key={tag}
            className={
              props.direction === "row"
                ? style["types-block__row-label"]
                : style["types-block__column-label"]
            }
          >
            <input
              type="checkbox"
              onChange={(e) => props.handleChange && props.handleChange(e)}
              value={tag}
            />
            {tag}
          </label>
        ))}
      </div>
    </div>
  );
};

export default SortByTags;
