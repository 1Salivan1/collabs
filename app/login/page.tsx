import Link from "next/link";
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
        <div className={style.btn}>
          <button className="btn">Войти</button>
        </div>
        <div>
          <Link href="/login/restore" className={style.link}>
            Я забыл пароль
          </Link>
        </div>
      </form>
    </section>
  );
}
