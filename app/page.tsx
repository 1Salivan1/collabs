import Image from "next/image";
import axios from "axios";
import style from "../styles/home.module.scss";
import { projectCardType } from "@/types/types";
import ProjectCard from "@/components/ProjectCard";

export default async function Home() {
  const url = "https://6478b240362560649a2e4a2c.mockapi.io/projects";

  const response = await axios.get(url);
  const data: projectCardType[] = response.data;

  return (
    <section className={style.projects_section}>
      <h1>Проекты в которых вы можете принять участие</h1>
      <div className={style.projects_list}>
        {data.map((item: projectCardType) => (
          <ProjectCard
            key={item.id}
            id={item.id}
            title={item.title}
            tags={item.tags}
            micro_description={item.micro_description}
            full_description={item.full_description}
          />
        ))}
      </div>
    </section>
  );
}
