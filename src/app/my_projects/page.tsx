"use client";
import axios, { AxiosError } from "axios";
import style from "../../styles/my_projects.module.scss";
import getCookie from "@/src/utils/getCookie";
import { useEffect, useState } from "react";
import ProjectCard from "@/src/components/ProjectsCard/ProjectCard";
import { myProject } from "@/src/types/types";
import Link from "next/link";

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

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/${id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={style.main}>
      <h1 className="page-header">Мои проекты</h1>
      <Link href="edit_project" className={`btn ${style["create-new-btn"]}`}>
        Создать новый
      </Link>
      {data ? (
        <>
          {data.projects.map((item: myProject) => (
            <ProjectCard
              key={item.id}
              id={item.id}
              title={item.title}
              tags={item.tags}
              description={item.text}
              my_project={true}
              on_delete={handleDelete}
            />
          ))}
        </>
      ) : (
        <p>Тут пока пусто</p>
      )}
    </section>
  );
}
