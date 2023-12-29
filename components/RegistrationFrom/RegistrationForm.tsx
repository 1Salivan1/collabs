"use client";
import React, { useState } from "react";
import Link from "next/link";
import style from "../../styles/auth.module.scss";
import { tags } from "@/components/SortByTags/tags";
import axios, { AxiosError } from "axios";
import API_BASE_URL from "@/config";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [git, setGit] = useState("");
  const [tagsArr, setTagsArr] = useState<string[]>([]);
  const [about, setAbout] = useState("");
  const [aboutLength, setAboutLength] = useState(0);
  const [telegram, setTelegram] = useState("");
  const [discord, setDiscord] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [error, setError] = useState<{ path: string; msg: string }[] | []>([]);
  const [success, setSuccess] = useState<null | boolean>(null);

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
    const socials = [
      telegram && `Telegram - ${telegram}`,
      discord && `Discord - ${discord}`,
      linkedin && `Linked-in - ${linkedin}`,
    ].filter(Boolean);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/registration`, {
        username,
        email,
        password,
        git,
        tags: tagsArr,
        about,
        socials,
      });
      console.log(response);
      if (!response) {
        throw new AxiosError();
      }
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data);
      } else {
        console.error("Error during registration:", error);
      }
    }
  };

  if (success === true) {
    return (
      <div className={style.login_form}>
        <h4>Регистрация прошла успешно!</h4>
        <div>
          <Link href="/login" className="btn">
            Войти
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form action="" onSubmit={handlePost} className={style.login_form}>
      {error?.map((err) => err.path === "exist") && (
        <span style={{ color: "red" }}>
          {error.find((err) => err.path === "exist")?.msg}
        </span>
      )}
      {error?.map((err) => err.path === "username") && (
        <span style={{ color: "red" }}>
          {error.find((err) => err.path === "username")?.msg}
        </span>
      )}
      <div>
        <input
          type="text"
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          placeholder="Имя или псевдоним"
        />
      </div>
      {error?.map((err) => err.path === "email") && (
        <span style={{ color: "red" }}>
          {error.find((err) => err.path === "email")?.msg}
        </span>
      )}
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          className="input"
          placeholder="E-mail"
        />
      </div>
      {error?.map((err) => err.path === "password") && (
        <span style={{ color: "red" }}>
          {error.find((err) => err.path === "password")?.msg}
        </span>
      )}
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          className="input"
          placeholder="Пароль"
        />
      </div>
      {error?.map((err) => err.path === "git") && (
        <span style={{ color: "red" }}>
          {error.find((err) => err.path === "git")?.msg}
        </span>
      )}
      <div>
        <input
          type="text"
          value={git}
          onChange={(e) => setGit(e.target.value)}
          name="git"
          className="input"
          placeholder="GitHub link"
        />
      </div>
      {error?.map((err) => err.path === "tags") && (
        <span style={{ color: "red" }}>
          {error.find((err) => err.path === "tags")?.msg}
        </span>
      )}
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
      <div>
        <textarea
          className={style.textarea}
          value={about}
          onChange={(e) => {
            setAbout(e.target.value), setAboutLength(e.target.value.length);
          }}
          name="about"
          placeholder="Расскажите о себе, или о том, какую команду хотите найти"
        ></textarea>
      </div>
      {error?.map((err) => err.path === "about") && (
        <span style={{ color: "red" }}>
          {error.find((err) => err.path === "about")?.msg}
        </span>
      )}
      <span>{aboutLength} / 2000</span>
      <div>
        <h4>Контакты, (укажите 1 или более на выбор)</h4>
        {error?.map((err) => err.path === "socials") && (
          <span style={{ color: "red" }}>
            {error.find((err) => err.path === "socials")?.msg}
          </span>
        )}
        <div>
          <input
            type="text"
            className="input"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            name="telegram"
            placeholder="Telegram link"
          />
        </div>
        <div>
          <input
            type="text"
            className="input"
            value={discord}
            onChange={(e) => setDiscord(e.target.value)}
            name="discord"
            placeholder="Discord nickname"
          />
        </div>
        <div>
          <input
            type="text"
            className="input"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            name="linkedin"
            placeholder="Linked-in link"
          />
        </div>
      </div>
      <div>
        <button className="btn" type="submit">
          Зарегестрироваться
        </button>
      </div>
      <p>Уже есть аккаунт?</p>
      <div>
        <Link href="/login" className={style.link}>
          Войти
        </Link>
      </div>
    </form>
  );
};

export default RegistrationForm;
