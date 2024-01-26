"use client";
import API_BASE_URL from "@/config";
import { User } from "@/src/types/types";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import avatar from "@/public/avatar.png";
import style from "./personal_cabinet.module.scss";

const PersonalCabinet = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("login");
        const headers = {
          Authorization: `Bearer ${token}`,
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
      <div>
        <Image src={avatar} width={100} height={100} alt="Avatar" />
        <div>
          <h1>{user?.username}</h1>
          <a href={user?.git}>GitHub</a>
          <ul>
            {user?.tags.map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
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
