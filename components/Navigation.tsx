import React from "react";
import Link from "next/link";
import style from "../styles/nav.module.scss";

const Navigation = () => {
  return (
    <div className={style.navigation}>
      <Link className={style.link} href="/">
        Проекты
      </Link>
      <Link className={style.link} href="/found">
        Ищу проект
      </Link>
      <Link className={style.link} href="/my_projects">
        Мои проекты
      </Link>
    </div>
  );
};

export default Navigation;
