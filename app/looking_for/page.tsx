import User from "@/components/User/User";
import style from "../../styles/looking_for.module.scss";

export default function Looking_for() {
  return (
    <section className="main">
      <h1 className="page-header">Исполнители которые ищут проект</h1>
      <div className={style.user_list}>
        {Array.from({ length: 5 }, (_, index) => (
          <User
            key={index}
            username={"User"}
            tags={["Frontend", "TypeScript"]}
            about={"Text text text text text text"}
          />
        ))}
      </div>
    </section>
  );
}
