"use client";
import React from "react";
import { useState } from "react";
import style from "./sortbytags.module.scss";

interface Props {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SortByTags = (props: Props) => {
  let tags = ["JavaScript", "TypeScript", "PHP", "Python", "C#", "C++"];

  return (
    <div>
      <div className={style.sort}>
        <h4>Языки</h4>
        <div className={style.types_block}>
          {tags.map((tag) => (
            <label key={tag}>
              <input
                type="checkbox"
                onChange={(e) => props.handleChange(e)}
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
