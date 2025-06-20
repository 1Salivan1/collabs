"use client";

import React, { useEffect } from "react";
import { useAppDispatch } from "../hooks/reduxHooks";
import { getMyProfile } from "../redux/thunks/userThunk";
import getCookie from "../utils/getCookie";
import { getTags } from "../redux/thunks/tagsThunk";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const token = getCookie("token");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMyProfile());
    dispatch(getTags());
  }, [token, dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
