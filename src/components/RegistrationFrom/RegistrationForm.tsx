"use client";
import React, { useState } from "react";
import Link from "next/link";
import moduleStyle from "./RegistrationForm.module.scss";
import style from "../../styles/auth.module.scss";
import { tags } from "@/src/components/SortByTags/tags";
import axios, { AxiosError } from "axios";
import Input from "@/src/UI/Input/Input";
import Button from "@/src/UI/Button/Button";
import TextArea from "@/src/UI/TextArea/TextArea";
import { useRouter } from "next/navigation";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tagsArr, setTagsArr] = useState<string[]>([]);
  const [about, setAbout] = useState("");
  const [telegram, setTelegram] = useState("");
  const [discord, setDiscord] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [error, setError] = useState<{ path: string; msg: string }[] | []>();
  const [success, setSuccess] = useState<null | boolean>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (tagsArr.includes(e.target.value)) {
      setTagsArr((prevSort) =>
        prevSort.filter((tag) => tag !== e.target.value)
      );
    } else {
      setTagsArr((prevSort) => [...prevSort, e.target.value]);
    }
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.API_BASE_URL}/auth/registration`,
        {
          username,
          email,
          password,
          tags: tagsArr,
          about,
          telegram: telegram,
          linkedin: linkedin,
          discord: discord,
        }
      );
      const data = await response.data;
      if (!response) {
        throw new AxiosError();
      }
      if (response.status === 200) {
        setSuccess(true);
        document.cookie = `token=${data.user.token}; max-age=2506000`;
        router.push("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data);
      } else {
        console.error("Error during registration:", error);
      }
    }
  };

  const findError = (errorName: string) => {
    if (Array.isArray(error)) {
      const foundError = error.find((err) => err.path === errorName);
      return foundError ? foundError.msg : undefined;
    }
  };

  return (
    <form action="" onSubmit={handlePost} className={style.login_form}>
      <h1>Регистрация</h1>
      <Input
        placeholder="Имя или псевдоним"
        onChange={(e) => setUsername(e.target.value)}
        error={findError("username")}
        type="text"
      />
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />
      <Input
        placeholder="Пароль"
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <span style={{ color: "red" }}>{findError("tags")}</span>
      <div className={style.registration_languages}>
        <h4>Выберете языки которые вы используете в работе</h4>
        {tags.map((tag) => (
          <label key={tag} className={style.tag}>
            <input
              type="checkbox"
              value={tag}
              onChange={(e) => handleChange(e)}
            />
            {tag}
          </label>
        ))}
      </div>
      <TextArea
        placeholder="Расскажите о себе, или о том, какую команду хотите найти"
        onChange={(e) => setAbout(e.target.value)}
        error={findError("about")}
      />
      <div>
        <h4>Контакты, (укажите 1 или более на выбор)</h4>
        <span style={{ color: "red" }}>{findError("socials")}</span>
        <div className={style["contacts-block"]}>
          <Input
            onChange={(e) => setTelegram(e.target.value)}
            placeholder="Telegram link"
            error={findError("telegram")}
            type="url"
          />

          <Input
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="Linkedin link"
            error={findError("linkedin")}
            type="url"
          />
          <Input
            onChange={(e) => setDiscord(e.target.value)}
            placeholder="Discord nickname"
          />
        </div>
      </div>
      <div>
        <Button text="Зарегестрироваться" type="submit" />
      </div>
      <span className={moduleStyle["have-account"]}>Уже есть аккаунт?</span>
      <div>
        <Link href="/login" className={style.link}>
          Войти
        </Link>
      </div>
    </form>
  );
};

export default RegistrationForm;
