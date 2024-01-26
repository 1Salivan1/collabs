"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import API_BASE_URL from "@/config";
import { User } from "@/src/types/types";

const Navigation = () => {
  const [active, setActive] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const toggleMenu = () => {
    setActive(!active);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.getItem("login")) {
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
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="navigation">
      <div className="burger" onClick={toggleMenu}>
        <div className="trait"></div>
        <div className="trait"></div>
        <div className="trait"></div>
      </div>
      <div className={`links ${active ? "active" : ""}`}>
        <Link className="link" href="/">
          Проекты
        </Link>
        <Link className="link" href="/looking_for">
          Ищу проект
        </Link>
        {typeof window !== "undefined" && localStorage.getItem("login") ? (
          <Link className="link" href="/my_projects">
            Мои проекты
          </Link>
        ) : (
          ""
        )}
      </div>
      {typeof window !== "undefined" && localStorage.getItem("login") ? (
        <div>
          <Link href="/personal" className="link_auth">
            {user !== null ? user.username : ""}
          </Link>
          <span style={{ marginLeft: "5px", marginRight: "5px" }}>|</span>
          <span
            style={{ fontWeight: "400", cursor: "pointer" }}
            onClick={() => {
              localStorage.removeItem("login"), location.reload();
            }}
          >
            Выход
          </span>
        </div>
      ) : (
        <div>
          <Link className="link_auth" href="/login">
            Войти
          </Link>
          <span> | </span>
          <Link className="link_auth" href="/registration">
            Регистрация
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navigation;
