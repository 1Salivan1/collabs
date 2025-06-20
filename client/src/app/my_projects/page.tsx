"use client";
import axios, { AxiosError } from "axios";
import style from "../../styles/my_projects.module.scss";
import getCookie from "@/src/utils/getCookie";
import { useEffect, useState } from "react";
import ProjectCard from "@/src/components/ProjectsCard/ProjectCard";
import { myProject } from "@/src/types/types";
import Link from "next/link";
import { Typography } from "@mui/material";
import ConfirmationModal from "@/src/components/ConfirmationModal/ConfirmationModal";

export default function My_Projects() {
  const [data, setData] = useState<any>();
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState<
    boolean | string | number
  >(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${getCookie("token")}`,
        };

        const response = await axios.get(
          `${process.env.API_BASE_URL}/my-projects`,
          {
            headers,
          }
        );

        if (!response.data) {
          throw new AxiosError();
        }

        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleDelete = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${getCookie("token")}`,
      };

      const response = await axios.delete(
        `${process.env.API_BASE_URL}/project/${confirmationModalIsOpen}`,
        { headers }
      );

      if (response.status === 200) {
        location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = (id: number | string) => {
    setConfirmationModalIsOpen(id);
  };

  const handleAccept = async () => {
    await handleDelete();
    setConfirmationModalIsOpen(false);
  };

  return (
    <section className={style.main}>
      <Typography variant="h4" sx={{ mb: 2 }} className="page-header">
        Мої проєкти
      </Typography>
      <Link href="edit_project" className={`btn ${style["create-new-btn"]}`}>
        <Typography>Створити новий</Typography>
      </Link>
      {data ? (
        <>
          {data.projects.map((item: myProject) => (
            <ProjectCard
              key={item.id}
              id={item.id}
              title={item.title}
              tags={item.tags}
              description={item.text}
              myProject={true}
              onDelete={handleOpenModal}
            />
          ))}
        </>
      ) : (
        <Typography variant="h6">Тут поки що порожньо</Typography>
      )}
      <ConfirmationModal
        isOpen={Boolean(confirmationModalIsOpen)}
        onAccept={handleAccept}
        onCancel={() => setConfirmationModalIsOpen(false)}
        text="Проєкт буде видалено без можливості відновлення, ви впевнені що хочете видалити його?"
        acceptText="Видалити"
        cancelText="Відмінити"
        typeOfConfirmation="delete"
        onClose={() => setConfirmationModalIsOpen(false)}
      />
    </section>
  );
}
