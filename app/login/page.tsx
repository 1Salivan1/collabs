import style from "../../styles/login.module.scss";

export default function Login() {
  return (
    <section className={style.main}>
      <form action="" className={style.login_form}>
        <div>
          <input type="text" className={style.input} placeholder="E-mail" />
        </div>
        <div>
          <input type="text" className={style.input} placeholder="Пароль" />
        </div>
        <div>
          <button className="btn">Войти</button>
        </div>
      </form>
    </section>
  );
}
