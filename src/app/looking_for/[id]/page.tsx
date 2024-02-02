import Image from "next/image";
import Link from "next/link";
import style from "../../../styles/userpage.module.scss";

export default function UserPage() {
  const tags = ["TypeScript", "React"];

  return (
    <section className={style.userpage}>
      <div className={style.user_info}>
        <Image
          src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
          width={100}
          height={100}
          alt="Avatar"
          className={style.avatar}
        />
        <div className={style.text_info}>
          <h1>User</h1>
          <Link className={style.git} href="https://github.com/">
            GitHub
          </Link>
          <div className="tags">
            {tags.map((tag) => (
              <div className="tag" key={tag}>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      <h3>Обо мне :</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa veritatis
        necessitatibus quia! Distinctio dicta itaque adipisci molestiae nam
        quia, veritatis a non impedit fugit molestias ratione ad perspiciatis
        blanditiis aspernatur debitis recusandae sit incidunt numquam eaque
        neque voluptas exercitationem qui illum. Provident fuga consequuntur
        inventore quia voluptatem aut, expedita id!
      </p>
      <h3>Для связи</h3>
      <ul>
        <li>Telegram: qwerty123</li>
      </ul>
    </section>
  );
}
