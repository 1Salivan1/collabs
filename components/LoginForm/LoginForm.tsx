"use client";
import React, { useState } from "react";
import style from "../../styles/auth.module.scss";
import API_BASE_URL from "@/config";
import axios, { AxiosError } from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      console.log(response);
      if (!response) {
        throw new AxiosError();
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.msg);
      } else {
        console.error("Error during registration:", error);
      }
    }
  };

  console.log(error);

  return (
    <form action="" onSubmit={handlePost} className={style.login_form}>
      <span style={{ color: "red" }}>{error}</span>
      <div>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          className={style.input}
          placeholder="E-mail"
        />
      </div>
      <div>
        <input
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          className={style.input}
          placeholder="Пароль"
        />
      </div>
      <div className={style.btn}>
        <button className="btn" type="submit">
          Войти
        </button>
      </div>
      <div>
        <p className={style.link}>Я забыл пароль</p>
      </div>
    </form>
  );
};

export default LoginForm;