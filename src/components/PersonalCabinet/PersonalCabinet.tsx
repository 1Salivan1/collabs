"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import avatar from "@/public/avatar.png";
import settings from "@/public/settings.png";
import style from "./personal_cabinet.module.scss";
import Link from "next/link";
import getCookie from "@/src/utils/getCookie";
import { useAppDispatch, useAppSelector } from "@/src/hooks/reduxHooks";
import { getMyProfile } from "@/src/redux/thunks/userThunk";

const PersonalCabinet = () => {
  const user = useAppSelector((state) => state.user);
  const status = useAppSelector((state) => state.status);

  console.log(status);

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <section className={style.personal}>
      <div className={style.info}>
        <div>
          <Image src={avatar} width={100} height={100} alt="Avatar" />
        </div>
        <div className={style.text_info}>
          <div className={style.nickname}>
            <h1>{user?.username}</h1>
            <Link href="#">
              <Image src={settings} width={30} height={30} alt="Settings" />
            </Link>
          </div>
          <ul className="tags">
            {user &&
              user.tags &&
              user.tags.map((tag) => (
                <li key={tag} className="tag">
                  {tag}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className={style["personal-block"]}>
        <h2>Обо мне:</h2>
        <p>{user?.about}</p>
      </div>
      <div>
        <h2>Контакты для связи со мной:</h2>
        <ul>
          {user?.telegram ? (
            <li>
              Telegram: <a href={user.telegram}>{user.telegram}</a>
            </li>
          ) : (
            ""
          )}
          {user?.linkedin ? (
            <li>
              LinkedIn: <a href={user.discord}>{user.linkedin}</a>
            </li>
          ) : (
            ""
          )}
          {user?.discord ? <li>Discord: {user.discord}</li> : ""}
        </ul>
      </div>
    </section>
  );
};

export default PersonalCabinet;
