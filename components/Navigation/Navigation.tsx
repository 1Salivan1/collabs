import React from "react";
import Link from "next/link";
import style from "./navigation.module.scss";

const Navigation = () => {
  return (
    <div className={style.navigation}>
      <div>
        <Link className={style.link} href="/">
          Проекты
        </Link>
        <Link className={style.link} href="/looking_for">
          Ищу проект
        </Link>
        <Link className={style.link} href="/my_projects">
          Мои проекты
        </Link>
      </div>
      <div>
        <Link className={style.link_auth} href="/login">
          Войти
        </Link>
        <span> | </span>
        <Link className={style.link_auth} href="/registration">
          Регистрация
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
