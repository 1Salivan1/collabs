import style from "./edit.module.scss";

const Edit = () => {
  return (
    <div className={style.edit}>
      <h2>Название</h2>
      <input
        type="text"
        className="input"
        placeholder="Введите название проекта"
      />
      <h2>Описание проекта</h2>
      <textarea
        className="textarea"
        name=""
        id=""
        cols="30"
        rows="10"
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
      <div>
        <button className="btn">Сохранить</button>
      </div>
    </div>
  );
};

export default Edit;
