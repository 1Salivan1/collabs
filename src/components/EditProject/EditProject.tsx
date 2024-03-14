"use client";
import style from "./editpoject.module.scss";
import { useEffect, useState } from "react";
import SortByTags from "../SortByTags/SortByTags";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import getCookie from "@/src/utils/getCookie";
import { useRouter } from "next/navigation";
import { myProject } from "@/src/types/types";

interface Props {
  id: number;
}

interface MyForm {
  title: string;
  tags: string[];
  text: string;
  needs: string[];
  socials: string[];
}

const EditProject = (props: Props) => {
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [text, setText] = useState<string>("");
  const [needs, setNeeds] = useState<string>("");
  const [telegram, setTelegram] = useState<string>("");
  const [discord, setDiscord] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [data, setData] = useState<myProject>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ path: string; msg: string }[] | []>();
  const { register, handleSubmit } = useForm<MyForm>();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/${props.id}`
        );
        if (response.status === 200) {
          const data: myProject = response.data;
          setData(data);
          setLoading(false);
          setTitle(data.title);
          setText(data.text);
          setNeeds(data.needs.toString());
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [props.id]);

  const onSubmit: SubmitHandler<MyForm> = async (data) => {
    const socials = [
      telegram && `Telegram - ${telegram}`,
      discord && `Discord - ${discord}`,
      linkedin && `Linked-in - ${linkedin}`,
    ].filter(Boolean);
    try {
      const token = getCookie("login");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      data.tags = tags;
      data.needs = createArray(needs);
      data.socials = socials;

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
        data,
        config
      );
      if (response.status === 200) {
        router.push("/my_projects");
      }
    } catch (error: any) {
      setError(error?.response.data);
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

  if (loading === true) {
    return <h1 style={{ textAlign: "center" }}>Загрузка...</h1>;
  }

  return (
    <form className={style.edit} onSubmit={handleSubmit(onSubmit)}>
      <h2>Название</h2>
      {error?.map((err) => err.path === "title") && (
        <span style={{ color: "red" }}>
          {error.find((err) => err.path === "title")?.msg}
        </span>
      )}
      <input
        {...register("title", { required: true })}
        type="text"
        className="input"
        placeholder="Введите название проекта"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {error?.map((err) => err.path === "tags") && (
        <span style={{ color: "red" }}>
          {error.find((err) => err.path === "tags")?.msg}
        </span>
      )}
      <SortByTags direction="row" handleChange={handleChange} />
      <h2>Описание проекта</h2>
      {error?.map((err) => err.path === "text") && (
        <span style={{ color: "red" }}>
          {error.find((err) => err.path === "text")?.msg}
        </span>
      )}
      <textarea
        {...register("text")}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={`textarea ${style["project-description"]}`}
        placeholder="Введите описание проекта"
      ></textarea>
      <h2>Кто нужен (укажите через запятую)</h2>
      {error?.map((err) => err.path === "needs") && (
        <span style={{ color: "red" }}>
          {error.find((err) => err.path === "needs")?.msg}
        </span>
      )}
      <input
        value={needs}
        onChange={(e) => setNeeds(e.target.value)}
        type="text"
        className="input"
        placeholder="Введите специалистов которые вам нужны"
      />
      <h2>Контакты для связи</h2>
      {error?.map((err) => err.path === "socials") && (
        <span style={{ color: "red" }}>
          {error.find((err) => err.path === "socials")?.msg}
        </span>
      )}
      <input
        onChange={(e) => setTelegram(e.target.value)}
        type="text"
        className="input"
        placeholder="telegram"
      />
      <input
        onChange={(e) => setDiscord(e.target.value)}
        type="text"
        className="input"
        placeholder="discord"
      />
      <input
        onChange={(e) => setLinkedin(e.target.value)}
        type="text"
        className="input"
        placeholder="linked-in"
      />
      <div>
        <button className="btn" type="submit">
          Сохранить
        </button>
      </div>
    </form>
  );
};

export default EditProject;
