"use client";
import { useState } from "react";
import SortByTags from "../SortByTags/SortByTags";
import style from "./edit.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import getCookie from "@/src/utils/getCookie";

interface Props {
  edit_mode?: boolean;
}

interface MyForm {
  title: string;
  tags: string[];
  text: string;
  needs: string[];
  socials: [telegram: string, discord: string, linkedin: string];
}

const Edit = (props: Props) => {
  const [tags, setTags] = useState<string[]>([]);
  const [needs, setNeeds] = useState("");
  const { register, handleSubmit } = useForm<MyForm>();
  const onSubmit: SubmitHandler<MyForm> = (data) => {
    try {
      const token = getCookie("login");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      data.tags = tags;
      data.needs = createArray(needs);
      axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
        data,
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const createArray = (str: string) => {
    const newStr = str.replace(/\s+/g, " ").trim();
    return newStr
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (tags.includes(e.target.value)) {
      setTags((prevSort) => prevSort.filter((tag) => tag !== e.target.value));
    } else {
      setTags((prevSort) => [...prevSort, e.target.value]);
    }
  };

  return (
    <form className={style.edit} onSubmit={handleSubmit(onSubmit)}>
      <h2>Название</h2>
      <input
        {...register("title")}
        type="text"
        className="input"
        placeholder="Введите название проекта"
      />
      <SortByTags direction="row" handleChange={handleChange} />
      <h2>Описание проекта</h2>
      <textarea
        {...register("text")}
        className={`textarea ${style["project-description"]}`}
        placeholder="Введите описание проекта"
      ></textarea>
      <h2>Кто нужен (укажите через запятую)</h2>
      <input
        onChange={(e) => setNeeds(e.target.value)}
        type="text"
        className="input"
        placeholder="Введите специалистов которые вам нужны"
      />
      <h2>Контакты для связи</h2>
      <input
        {...register(`socials.0`)}
        type="text"
        className="input"
        placeholder="telegram"
      />
      <input
        {...register(`socials.1`)}
        type="text"
        className="input"
        placeholder="discord"
      />
      <input
        {...register(`socials.2`)}
        type="text"
        className="input"
        placeholder="linked-in"
      />
      {props.edit_mode ? (
        <div>
          <button className="btn" type="submit">
            Сохранить
          </button>
        </div>
      ) : (
        <div>
          <button className="btn" type="submit">
            Создать
          </button>
        </div>
      )}
    </form>
  );
};

export default Edit;
