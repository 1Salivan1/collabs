"use client";
import React, { useState } from "react";
import Link from "next/link";

const Navigation = () => {
  const [active, setActive] = useState(false);

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
        <Link className="link" href="/my_projects">
          Мои проекты
        </Link>
      </div>
      <div>
        <Link className="link_auth" href="/login">
          Войти
        </Link>
        <span> | </span>
        <Link className="link_auth" href="/registration">
          Регистрация
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
