"use client";
import API_BASE_URL from "@/config";
import { User } from "@/src/types/types";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import avatar from "@/public/avatar.png";
import settings from "@/public/settings.png";
import style from "./personal_cabinet.module.scss";
import Link from "next/link";
import getCookie from "@/src/utils/getCookie";

const PersonalCabinet = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${getCookie("login")}`,
        };

        const response = await axios.get(`${API_BASE_URL}/auth/me`, {
          headers,
        });

        if (!response.data) {
          throw new AxiosError();
        }
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  });

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
          <div className={style.git}>
            <a href={user?.git}>GitHub</a>
          </div>
          <ul className="tags">
            {user?.tags.map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={style.description}>
        <h2>Обо мне:</h2>
        <p>{user?.about}</p>
      </div>
      <div>
        <h2>Контакты для связи со мной:</h2>
        <ul>
          {user?.socials.map((social) => (
            <li key={social}>{social}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PersonalCabinet;
