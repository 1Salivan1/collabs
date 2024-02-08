"use client";
import axios, { AxiosError } from "axios";
import style from "../../styles/my_projects.module.scss";
import getCookie from "@/src/utils/getCookie";
import { useEffect, useState } from "react";
import ProjectCard from "@/src/components/ProjectsCard/ProjectCard";
import { myProject } from "@/src/types/types";

export default function My_Projects() {
  const [data, setData] = useState<any>();
  useEffect(() => {
    const getData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${getCookie("login")}`,
        };

        const response = await axios.get(`http://localhost:5000/my_projects`, {
          headers,
        });

        if (!response.data) {
          throw new AxiosError();
        }

        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  });

  console.log(data);
  return (
    <section className={style.main}>
      <h1 className="page-header">Мои проекты</h1>
      <button className={`btn ${style["create-new-btn"]}`}>
        Создать новый
      </button>
      {data ? (
        <>
          {data.projects.map((item: myProject) => (
            <ProjectCard
              key={item.id}
              id={item.id}
              title={item.title}
              tags={item.tags}
              micro_description={item.text}
              full_description={item.text}
              my_project={true}
            />
          ))}
        </>
      ) : (
        <p>Тут пока пусто</p>
      )}
    </section>
  );
}
