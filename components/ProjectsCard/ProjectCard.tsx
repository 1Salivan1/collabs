import React from "react";
import style from "./projectcard.module.scss";

interface Props {
  id: number;
  title: string;
  tags: string[];
  micro_description: string;
  full_description: string;
}

const ProjectCard = (props: Props) => {
  return (
    <div className={style.project_card}>
      <h3>{props.title}</h3>
      <div className="tags">
        {props.tags.map((tag) => (
          <div key={tag} className="tag">
            {tag}
          </div>
        ))}
      </div>
      <p>{props.micro_description}</p>
    </div>
  );
};

export default ProjectCard;
