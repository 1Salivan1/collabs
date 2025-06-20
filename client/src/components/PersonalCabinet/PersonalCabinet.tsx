"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import Image from "next/image";
import React from "react";
import settings from "@/public/settings.png";
import style from "./personal_cabinet.module.scss";
import Link from "next/link";
import { useAppSelector } from "@/src/hooks/reduxHooks";
import {
  Chip,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { toSvg } from "jdenticon";

const PersonalCabinet = () => {
  const user = useAppSelector((state) => state.user.user);
  const status = useAppSelector((state) => state.user.status);

  const svgString = toSvg(user?.id, 100);

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  const haveContacts = !!user?.telegram || !!user?.discord || !!user?.linkedin;

  return (
    <Box className={style.personal}>
      <Box className={style.info}>
        <Box>
          <div
            dangerouslySetInnerHTML={{ __html: svgString }}
            style={{ width: 100, height: 100, borderRadius: "50%" }}
          />
        </Box>
        <Box className={style.text_info}>
          <Box className={style.nickname}>
            <Typography mr={2} mb={1} variant="h4" fontWeight={600}>
              {user?.username}
            </Typography>
            <Box className={style["icon-container"]}>
              <Link href="/personal/edit">
                <Image src={settings} width={30} height={30} alt="Settings" />
              </Link>
            </Box>
          </Box>
          <Box className="tags">
            {user &&
              user?.tags &&
              user?.tags.map((tag: any) => (
                <Chip key={tag.id} label={tag.name} />
              ))}
          </Box>
        </Box>
      </Box>
      <Box className={style["personal-block"]}>
        <Typography variant="h5" fontWeight={600}>
          Про мене:
        </Typography>
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
          {user?.about}
        </ReactMarkdown>
      </Box>
      <Box>
        {haveContacts && (
          <>
            <Typography variant="h5" fontWeight={600}>
              Контакти для зв'язку зі мною:
            </Typography>
            <List>
              {user?.telegram && (
                <ListItem sx={{ p: 0 }}>
                  <ListItemText>Telegram: {user.telegram}</ListItemText>
                </ListItem>
              )}
              {user?.linkedin && (
                <ListItem sx={{ p: 0 }}>
                  <ListItemText>LinkedIn: {user.linkedin}</ListItemText>
                </ListItem>
              )}
              {user?.discord && (
                <ListItem sx={{ p: 0 }}>
                  <ListItemText>Discord: {user.discord}</ListItemText>
                </ListItem>
              )}
            </List>
          </>
        )}
      </Box>
    </Box>
  );
};

export default PersonalCabinet;
