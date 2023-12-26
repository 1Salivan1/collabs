"use client";
import React from "react";
import style from "./sortbytags.module.scss";
import { tags } from "./tags";

interface Props {
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SortByTags = (props: Props) => {
  return (
    <div>
      <div className={style.sort}>
        <div className={style.types_block}>
          {tags.map((tag) => (
            <label key={tag}>
              <input
                type="checkbox"
                onChange={(e) => props.handleChange && props.handleChange(e)}
                value={tag.toLowerCase()}
              />
              {tag}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortByTags;
