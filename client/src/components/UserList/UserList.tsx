"use client";
import React, { useEffect, useState } from "react";
import User from "../User/User";
import SortByTags from "../SortByTags/SortByTags";
import {
  Box,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { User as UserType } from "@/src/types/types";

interface Props {
  users: UserType[];
}

const UserList = ({ users }: Props) => {
  const [currentData, setCurrentData] = useState(users);
  const [sort, setSort] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (sort.includes(e.target.value.toLowerCase())) {
      setSort((prevSort) =>
        prevSort.filter((tag) => tag !== e.target.value.toLowerCase())
      );
    } else {
      setSort((prevSort) => [...prevSort, e.target.value.toLowerCase()]);
    }
  };

  useEffect(() => {
    if (sort.length === 0) {
      setCurrentData(users);
    } else {
      let filteredData = users.filter((user) => {
        return user.tags.some((tag) => sort.includes(tag.name.toLowerCase()));
      });
      setCurrentData(filteredData);
    }
  }, [sort]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          "@media (max-width:700px)": {
            flexDirection: "column-reverse",
          },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          {currentData?.length === 0 || !currentData ? (
            <Typography variant="h6" color="error">
              Нажаль нікого не знайдено :(
            </Typography>
          ) : (
            currentData?.map((user) => <User key={user._id} user={user} />)
          )}
        </Box>
        <SortByTags
          direction="column"
          title="Фільтр"
          handleChange={handleChange}
        />
      </Box>
    </Box>
  );
};

export default UserList;
