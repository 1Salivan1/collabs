import React, { useEffect, useRef, useState } from "react";
import removeMarkdown from "remove-markdown";
import style from "./projectcard.module.scss";
import Link from "next/link";
import axios from "axios";
import getCookie from "@/src/utils/getCookie";
import { Box, Button, Typography, Chip } from "@mui/material";
import { Tag } from "@/src/types/types";

interface Props {
  id: number;
  title: string;
  tags: Tag[];
  description: string;
  myProject?: boolean;
  onDelete?: (id: string | number) => void;
}

const ProjectCard = ({
  id,
  title,
  tags,
  description,
  myProject,
  onDelete,
}: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState<number>(0);

  useEffect(() => {
    if (cardRef.current) {
      const width = cardRef.current.offsetWidth;
      setCardWidth(width);
    }
  }, []);

  return (
    <Box
      ref={cardRef}
      className={style.project_card}
      style={
        myProject
          ? { display: "flex", justifyContent: "space-between", width: "100%" }
          : {}
      }
    >
      <Box>
        <Link href={`${id}`} className={style["project-card__header"]}>
          <Typography variant="h5">{title}</Typography>
        </Link>
        <Box className="tags">
          {tags?.map((tag: Tag) => (
            <Chip label={tag.name} key={tag.id} />
          ))}
        </Box>
        <Typography
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            padding: 0,
            paddingTop: "6px",
            maxWidth: `${cardWidth * 0.7}px`,
          }}
        >
          {removeMarkdown(description)}
        </Typography>
      </Box>
      {myProject ? (
        <Box className={style["edit-delete"]}>
          <Link className={style["btn-edit"]} href={`/edit_project/${id}`}>
            <Typography>Редагувати</Typography>
          </Link>
          {onDelete && (
            <Button
              className={style["btn-delete"]}
              onClick={() => onDelete(id)}
            >
              <Typography>Видалити</Typography>
            </Button>
          )}
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default ProjectCard;
