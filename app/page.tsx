import React from "react";
import axios from "axios";
import style from "../styles/home.module.scss";
import { projectCardType } from "@/types/types";
import ProjectsList from "@/components/ProjectList/ProjectsList";

export default async function Home() {
  const url = "https://6478b240362560649a2e4a2c.mockapi.io/projects";
  const response = await axios.get(url);
  const data: projectCardType[] = response.data;

  return (
    <section className={style.projects_section}>
      <h1 className="page-header">
        Проекты в которых вы можете принять участие
      </h1>
      <div className={style.projects_list}>
        <ProjectsList data={data} />
      </div>
    </section>
  );
}
