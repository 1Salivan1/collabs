"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/src/hooks/reduxHooks";
import { toSvg } from "jdenticon";
import { Box } from "@mui/material";

const Navigation = () => {
  const [active, setActive] = useState(false);
  const user = useAppSelector((state) => state.user.user);

  const svgString = toSvg(user?.id, 30);

  const toggleMenu = () => {
    setActive(!active);
  };

  return (
    <div className="navigation">
      <div className="burger" onClick={toggleMenu}>
        <div className="trait"></div>
        <div className="trait"></div>
        <div className="trait"></div>
      </div>
      <div className={`links ${active ? "active" : ""}`}>
        <Link className="link" href="/">
          Проєкти
        </Link>
        <Link className="link" href="/looking-for">
          Шукають проєкт
        </Link>
        {user ? (
          <>
            <Link className="link" href="/my_projects">
              Мої проєкти
            </Link>
          </>
        ) : (
          ""
        )}
      </div>
      {user ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box style={{ marginRight: "5px" }}>
            <div dangerouslySetInnerHTML={{ __html: svgString }} />
          </Box>
          <Link href="/personal">{user !== null ? user.username : ""}</Link>
          <span style={{ marginLeft: "5px", marginRight: "5px" }}>|</span>
          <span
            style={{ fontWeight: "400", cursor: "pointer" }}
            onClick={() => {
              document.cookie =
                "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
              location.reload();
            }}
          >
            Вихід
          </span>
        </div>
      ) : (
        <div>
          <Link className="link_auth" href="/login">
            Увійти
          </Link>
          <span> | </span>
          <Link className="link_auth" href="/registration">
            Реєстрація
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navigation;
