import Image from "next/image";
import Link from "next/link";
import style from "../../../styles/userpage.module.scss";

export default function UserPage() {
  const tags = ["TypeScript", "React"];

  return (
    <section>
      <div className={style.user_info}>
        <Image
          src="data:image/png;base64,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"
          width={100}
          height={100}
          alt="Avatar"
        />
        <div className={style.text_info}>
          <h1>User</h1>
          <Link className={style.link} href="https://github.com/">
            GitHub
          </Link>
          <div className={style.tags}>
            {tags.map((tag) => (
              <div className={style.tag} key={tag}>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
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
