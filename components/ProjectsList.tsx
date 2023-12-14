"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import style from "../styles/projectlist.module.scss";
import { projectCardType } from "@/types/types";
import ProjectCard from "./ProjectCard";
import SortByTags from "./SortByTags";
import Link from "next/link";

interface Props {
  data: projectCardType[];
}

const ProjectsList = (props: Props) => {
  const [currentData, setCurrentData] = useState(props.data);
  const [sort, setSort] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (sort.includes(e.target.value)) {
      // Если тег уже выбран, убрать его из массива
      setSort((prevSort) => prevSort.filter((tag) => tag !== e.target.value));
    } else {
      // Если тег не выбран, добавить его в массив
      setSort((prevSort) => [...prevSort, e.target.value]);
    }
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div className={style.projects_list}>
        <div className={style.projects}>
          {currentData.map((item: projectCardType) => (
            <Link key={item.id} href={`${item.id}`}>
              <ProjectCard
                id={item.id}
                title={item.title}
                tags={item.tags}
                micro_description={item.micro_description}
                full_description={item.full_description}
              />
            </Link>
          ))}
        </div>
        <SortByTags handleChange={handleChange} />
      </div>
    </div>
  );
};

export default ProjectsList;
