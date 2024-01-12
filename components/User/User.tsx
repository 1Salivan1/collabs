import React from "react";
import style from "./user.module.scss";
import Image from "next/image";
import Link from "next/link";

interface Props {
  username: string;
  tags: string[];
  about: string;
}

const User = (props: Props) => {
  const tags = ["Front-end", "TypeScript"];
  return (
    <div className={style.user_card}>
      <div className={style.user_main_info}>
        <Image
          src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
          width={40}
          height={40}
          alt="Avatar"
          className={style.avatar}
        />
        <div className={style.user_name_info}>
          <Link href="looking_for/1">
            <h3>{props.username}</h3>
          </Link>
          <div className="tags">
            {props.tags.map((tag) => (
              <div key={tag} className="tag">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className={style.description}>{props.about}</p>
    </div>
  );
};

export default User;
