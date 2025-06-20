"use client";
import React, { useEffect, useState } from "react";
import style from "./ProjectList.module.scss";
import { projectCardType } from "@/src/types/types";
import ProjectCard from "../ProjectsCard/ProjectCard";
import SortByTags from "../SortByTags/SortByTags";
import { Box, Typography } from "@mui/material";

interface Props {
  projects: projectCardType[];
}

const ProjectsList = ({ projects }: Props) => {
  const [currentData, setCurrentData] = useState(projects);
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
      setCurrentData(projects);
    } else {
      let filteredData = projects.filter((item) => {
        return item.tags.some((tag) => sort.includes(tag.name.toLowerCase()));
      });
      setCurrentData(filteredData);
    }
  }, [sort]);

  return (
    <Box className={style.projects_list}>
      <Box className={style.projects}>
        {currentData?.length > 0 ? (
          currentData?.map((item: projectCardType) => (
            <ProjectCard
              key={item.id}
              id={item.id}
              title={item.title}
              tags={item.tags}
              description={item.text}
            />
          ))
        ) : (
          <Typography variant="h6" color="error">
            На жаль нічого не знайдено :(
          </Typography>
        )}
      </Box>
      <Box className={style["filter"]}>
        <SortByTags title={"Фільтр"} handleChange={handleChange} />
      </Box>
    </Box>
  );
};

export default ProjectsList;
