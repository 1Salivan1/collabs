import axios from "axios";
import { projectCardType } from "@/src/types/types";
import style from "../../styles/projectpage.module.scss";

interface Props {
  params: { id: number };
}

export default async function Project({ params }: Props) {
  const url = "https://6478b240362560649a2e4a2c.mockapi.io/projects";

  const response = await axios.get(url);
  const data: projectCardType[] = response.data;
  const post = data.find((item) => item.id == params.id);

  return (
    <div className={style.post}>
      <div className={style.header_info}>
        <h1 className={style.header}>{post?.title}</h1>
        <div className={`tags ${style.tag_list}`}>
          {post?.tags.map((tag) => (
            <span className="tag-big" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <p>{post?.description}</p>
      <h3>Мы нуждаемся в следующих специалистах:</h3>
      <ul>
        {post?.needs.map((position) => (
          <li key={position}>{position}</li>
        ))}
      </ul>
      <h3>Контакты</h3>
      <ul>
        {post?.contacts.map((contact) => (
          <li key={contact}>{contact}</li>
        ))}
      </ul>
    </div>
  );
}
