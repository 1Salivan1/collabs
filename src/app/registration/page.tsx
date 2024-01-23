import RegistrationForm from "@/src/components/RegistrationFrom/RegistrationForm";
import style from "../../styles/auth.module.scss";

export default function Registration() {
  return (
    <section className={style.main}>
      <RegistrationForm />
    </section>
  );
}
