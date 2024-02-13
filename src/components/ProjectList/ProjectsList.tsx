"use client";
import React, { useEffect, useState } from "react";
import style from "./projectlist.module.scss";
import { projectCardType } from "@/src/types/types";
import ProjectCard from "../ProjectsCard/ProjectCard";
import SortByTags from "../SortByTags/SortByTags";
interface Props {
  data: projectCardType[];
}

const ProjectsList = (props: Props) => {
  const [currentData, setCurrentData] = useState(props.data);
  const [sort, setSort] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (sort.includes(e.target.value.toLowerCase())) {
      setSort((prevSort) =>
        prevSort.filter((tag) => tag !== e.target.value.toLowerCase())
      );
    } else {
      setSort((prevSort) => [...prevSort, e.target.value.toLowerCase()]);
    }
  };

  useEffect(() => {
    if (sort.length === 0) {
      setCurrentData(props.data);
    } else {
      let filteredData = props.data.filter((item) => {
        return item.tags.some((tag) => sort.includes(tag.toLowerCase()));
      });
      setCurrentData(filteredData);
    }
  }, [sort]);

  return (
    <div>
      <div className={style.projects_list}>
        <div className={style.projects}>
          {currentData.map((item: projectCardType) => (
            <ProjectCard
              key={item.id}
              id={item.id}
              title={item.title}
              tags={item.tags}
              description={item.description}
            />
          ))}
        </div>
        {currentData.length === 0 ? (
          <h2 className={style.not_found}>К сожалению ничего не найдено :(</h2>
        ) : (
          ""
        )}
        <div className={style["filter"]}>
          <SortByTags
            direction={"column"}
            tittle={"Фильтр"}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;
