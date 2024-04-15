"use client";

import React, { useEffect } from "react";
import { useAppDispatch } from "../hooks/reduxHooks";
import { getMyProfile } from "../redux/thunks/userThunk";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);
  return <>{children}</>;
};

export default AuthProvider;
