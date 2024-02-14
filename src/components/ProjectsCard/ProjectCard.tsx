import React from "react";
import style from "./projectcard.module.scss";
import Link from "next/link";
import axios from "axios";
import getCookie from "@/src/utils/getCookie";
import { useRouter } from "next/router";
import Image from "next/image";

interface Props {
  id: number;
  title: string;
  tags: string[];
  description: string;
  my_project?: boolean;
}

const ProjectCard = (props: Props) => {
  const handleDelete = async (id: number) => {
    try {
      const headers = {
        Authorization: `Bearer ${getCookie("login")}`,
      };

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/${id}`,
        { headers }
      );

      if (response.status === 200) {
        location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={style.project_card}
      style={
        props.my_project
          ? { display: "flex", justifyContent: "space-between", width: "100%" }
          : {}
      }
    >
      <div>
        <Link href={`${props.id}`} className={style["project-card__header"]}>
          <p>{props.title}</p>
        </Link>
        <div className="tags">
          {props.tags.map((tag) => (
            <div key={tag} className="tag">
              {tag}
            </div>
          ))}
        </div>
        <p className={style["project-card__description"]}>
          {props.description}
        </p>
      </div>
      {props.my_project ? (
        <div className={style["edit-delete"]}>
          <Link
            className={style["btn-edit"]}
            href={`/edit_project/${props.id}`}
          >
            <Image
              className={style["image"]}
              height={20}
              width={20}
              src="/pencil.png"
              alt="Picture of the author"
            />
          </Link>
          <button
            className={style["btn-delete"]}
            onClick={() => handleDelete(props.id)}
          >
            X
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProjectCard;
