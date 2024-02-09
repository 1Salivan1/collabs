"use client";
import React, { useEffect, useState } from "react";
import User from "../User/User";
import SortByTags from "../SortByTags/SortByTags";
import style from "./userlist.module.scss";
import { userCardType } from "@/src/types/types";

interface Props {
  data: userCardType[];
}

const UserList = (props: Props) => {
  const [currentData, setCurrentData] = useState(props.data);
  const [sort, setSort] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (sort.includes(e.target.value)) {
      setSort((prevSort) => prevSort.filter((tag) => tag !== e.target.value));
    } else {
      setSort((prevSort) => [...prevSort, e.target.value]);
    }
  };

  useEffect(() => {
    if (sort.length === 0) {
      setCurrentData(props.data);
    } else {
      let filteredData = props.data.filter((item) => {
        return item.tags.some((tag) => sort.includes(tag.toLowerCase()));
      });
      setCurrentData(filteredData);
    }
  }, [sort]);

  return (
    <div>
      <div className={style.users_list}>
        <div className={style.users}>
          {currentData.length === 0 ? (
            <h2 className={style.not_found}>
              К сожалению никого не найдено :(
            </h2>
          ) : (
            currentData.map((user) => (
              <User
                key={user.id}
                username={user.username}
                tags={user.tags}
                about={user.micro_description}
              />
            ))
          )}
        </div>
        <div className={style["filter"]}>
          <SortByTags
            direction={"column"}
            tittle={"Фильтр"}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default UserList;
