"use client";
import React, { useState } from "react";
import style from "../../styles/auth.module.scss";
import API_BASE_URL from "@/config";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useAppDispatch } from "@/src/hooks/reduxHooks";
import { logIn } from "@/src/redux/thunks/userThunk";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(logIn({ email, password }));
  };

  return (
    <form action="" onSubmit={handlePost} className={style.login_form}>
      <h1>Вход</h1>
      <span style={{ color: "red" }}>{error}</span>
      <div>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          placeholder="E-mail"
        />
      </div>
      <div>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          placeholder="Пароль"
        />
      </div>
      <div className={style.btn}>
        <button className="btn" type="submit">
          Войти
        </button>
      </div>
      <div>
        <Link href="#" className={style.link}>
          Я забыл пароль
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
