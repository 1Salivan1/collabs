import Link from "next/link";
import style from "../../styles/registration.module.scss";

export default function Registration() {
  return (
    <section className={style.main}>
      <form action="" className={style.login_form}>
        <div>
          <input
            type="text"
            className={style.input}
            placeholder="Имя или псевдоним"
          />
        </div>
        <div>
          <input type="text" className={style.input} placeholder="E-mail" />
        </div>
        <div>
          <input type="text" className={style.input} placeholder="Пароль" />
        </div>
        <div>
          <button className="btn">Зарегестрироваться</button>
        </div>
        <p>Уже есть аккаунт?</p>
        <div>
          <Link href="/login" className={style.link}>
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
}
