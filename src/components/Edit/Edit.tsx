"use client";
import SortByTags from "../SortByTags/SortByTags";
import style from "./edit.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  edit_mode?: boolean;
}

interface MyForm {
  title: string;
  text: string;
  needs: string;
  telegram: string;
  discord: string;
  lenkedin: string;
}

const Edit = (props: Props) => {
  const { register, handleSubmit } = useForm<MyForm>();
  const onSubmit: SubmitHandler<MyForm> = (data) => console.log(data);

  return (
    <form className={style.edit} onSubmit={handleSubmit(onSubmit)}>
      <h2>Название</h2>
      <input
        {...register("title")}
        type="text"
        className="input"
        placeholder="Введите название проекта"
      />
      <SortByTags direction="row" />
      <h2>Описание проекта</h2>
      <textarea
        {...register("text")}
        className={`textarea ${style["project-description"]}`}
        placeholder="Введите описание проекта"
      ></textarea>
      <h2>Кто нужен (укажите через запятую)</h2>
      <input
        {...register("needs")}
        type="text"
        className="input"
        placeholder="Введите специалистов которые вам нужны"
      />
      <h2>Контакты для связи</h2>
      <input
        {...register("telegram")}
        type="text"
        className="input"
        placeholder="telegram"
      />
      <input
        {...register("discord")}
        type="text"
        className="input"
        placeholder="discord"
      />
      <input
        {...register("lenkedin")}
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
