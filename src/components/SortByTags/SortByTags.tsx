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
        style={
          props.direction === "row"
            ? { flexDirection: "row" }
            : { flexDirection: "column" }
        }
        className={style.types_block}
      >
        {tags.map((tag) => (
          <label
            key={tag}
            style={
              props.direction === "row"
                ? { marginRight: "15px", marginBottom: "20px" }
                : {}
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
