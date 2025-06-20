import Link from "next/link";
import style from "../../styles/auth.module.scss";
import LoginForm from "@/src/components/Authorization/LoginForm/LoginForm";

export default function Login() {
  return (
    <section className={style.main}>
      <LoginForm />
    </section>
  );
}
