import style from "../../styles/looking_for.module.scss";
import UserList from "@/src/components/UserList/UserList";

export default function Looking_for() {
  const data = [
    {
      id: 1,
      username: "User1",
      tags: ["Front-end", "JavaScript"],
      micro_description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      full_description: "eqeqeqweqweqweqweqweqweqwqweqweqweqew",
      contacts: ["Telegram: zxc123"],
    },
    {
      id: 2,
      username: "User2",
      tags: ["Back-end", "JavaScript"],
      micro_description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
      full_description: "eqeqeqweqweqweqweqweqweqwqweqweqweqew",
      contacts: ["Telegram: zxc123"],
    },
    {
      id: 3,
      username: "User3",
      tags: ["Software", "C++"],
      micro_description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      full_description: "eqeqeqweqweqweqweqweqweqwqweqweqweqew",
      contacts: ["Telegram: zxc123"],
    },
  ];
  return (
    <section className="main">
      <h1 className="page-header">Исполнители которые ищут проект</h1>
      <div className={style.user_list}>
        <UserList data={data} />
      </div>
    </section>
  );
}
