import style from "./edit.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
  edit_mode?: boolean;
}

interface MyForm {
  title: string;
  text: string;
  tags: string;
  telegram: string;
  discord: string;
  lenkedin: string;
}

const Edit = (props: Props) => {
  const { register } = useForm();

  return (
    <form className={style.edit}>
      <h2>Название</h2>
      <input
        {...register("title")}
        type="text"
        className="input"
        placeholder="Введите название проекта"
      />
      <h2>Описание проекта</h2>
      <textarea
        className={`textarea ${style["project-description"]}`}
        name=""
        id=""
        placeholder="Введите описание проекта"
      ></textarea>
      <h2>Кто нужен (укажите через запятую)</h2>
      <input
        type="text"
        className="input"
        placeholder="Введите специалистов которые вам нужны"
      />
      <h2>Контакты для связи</h2>
      <input type="text" className="input" placeholder="telegram" />
      <input type="text" className="input" placeholder="discord" />
      <input type="text" className="input" placeholder="linked-in" />
      {props.edit_mode ? (
        <div>
          <button className="btn">Сохранить</button>
        </div>
      ) : (
        <div>
          <button className="btn">Создать</button>
        </div>
      )}
    </form>
  );
};

export default Edit;
