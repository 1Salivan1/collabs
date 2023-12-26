import LoginForm from "@/components/LoginFrom/LoginForm";
import style from "../../styles/login.module.scss";

export default function Registration() {
  return (
    <section className={style.main}>
      <LoginForm />
    </section>
  );
}
