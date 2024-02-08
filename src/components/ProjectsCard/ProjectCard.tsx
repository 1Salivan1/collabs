import React from "react";
import style from "./projectcard.module.scss";
import Link from "next/link";

interface Props {
  id: number;
  title: string;
  tags: string[];
  micro_description: string;
  full_description: string;
  my_project?: boolean;
}

const ProjectCard = (props: Props) => {
  return (
    <div className={style.project_card}>
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
          {props.micro_description}
        </p>
      </div>
      {props.my_project ? (
        <div className={style["edit-delete"]}>
          <button className={style["btn-edit"]}>✏</button>
          <button className={style["btn-delete"]}>X</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProjectCard;
