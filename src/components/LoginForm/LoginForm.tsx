"use client";
import React, { useEffect, useState } from "react";
import style from "../../styles/auth.module.scss";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/src/hooks/reduxHooks";
import { useRouter } from "next/navigation";
import API_BASE_URL from "@/config";
import axios, { AxiosError } from "axios";
import Input from "@/src/UI/Input/Input";
import Button from "@/src/UI/Button/Button";

const LoginForm = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<AxiosError | any>();
  const dispatch = useAppDispatch();

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      const data = await response.data;
      console.log(data);
      document.cookie = `token=${data}; max-age=2506000`;
      location.reload();
    } catch (error: any) {
      setError(error);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/personal");
    }
  }, [user]);

  return (
    <form action="" onSubmit={handlePost} className={style.login_form}>
      <h1>Вход</h1>
      <span style={{ color: "red" }}>
        {error ? error?.response?.data.msg : ""}
      </span>
      <Input
        type="text"
        placeholder="E-mail"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Пароль"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className={style.btn}>
        <Button type="submit" text="Войти" />
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
