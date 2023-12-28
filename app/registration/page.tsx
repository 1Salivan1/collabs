import RegistrationForm from "@/components/RegistrationFrom/RegistrationForm";
import style from "../../styles/auth.module.scss";

export default function Registration() {
  return (
    <section className={style.main}>
      <RegistrationForm />
    </section>
  );
}
