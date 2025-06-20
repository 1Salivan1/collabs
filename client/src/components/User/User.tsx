import React from "react";
import removeMarkdown from "remove-markdown";
import style from "./user.module.scss";
import Link from "next/link";
import { User as UserType } from "@/src/types/types";
import { Box, Chip, Typography } from "@mui/material";
import { toSvg } from "jdenticon";

interface Props {
  user: UserType;
}

const User = ({ user }: Props) => {
  const svgString = toSvg(user?._id, 50);
  return (
    <Box className={style.user_card}>
      <Box className={style.user_main_info}>
        <Box className={style.avatar}>
          <div dangerouslySetInnerHTML={{ __html: svgString }} />
        </Box>
        <Box className={style.user_name_info}>
          <Link href={`looking-for/${user?._id}`}>
            <Typography variant="h6">{user.username}</Typography>
          </Link>
          <Box className="tags">
            {user.tags?.map((tag: any) => (
              <Chip key={tag?.id} label={tag.name} />
            ))}
          </Box>
        </Box>
      </Box>
      <Typography
        sx={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          padding: 0,
        }}
      >
        {removeMarkdown(user.about)}
      </Typography>
    </Box>
  );
};

export default User;
