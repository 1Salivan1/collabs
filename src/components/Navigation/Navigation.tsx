"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import API_BASE_URL from "@/config";
import { User } from "@/src/types/types";
import getCookie from "@/src/utils/getCookie";
import { useAppSelector } from "@/src/hooks/reduxHooks";

const Navigation = () => {
  const [active, setActive] = useState(false);
  const user = useAppSelector((state) => state.user);

  const toggleMenu = () => {
    setActive(!active);
  };

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
        {user ? (
          <>
            <Link className="link" href="/my_projects">
              Мои проекты
            </Link>
          </>
        ) : (
          ""
        )}
      </div>
      {user ? (
        <div>
          <Link href="/personal" className="link_auth">
            {user !== null ? user.username : ""}
          </Link>
          <span style={{ marginLeft: "5px", marginRight: "5px" }}>|</span>
          <span
            style={{ fontWeight: "400", cursor: "pointer" }}
            onClick={() => {
              document.cookie =
                "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
              location.reload();
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
