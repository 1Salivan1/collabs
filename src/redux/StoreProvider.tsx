"use client";

import { Provider } from "react-redux";
import { store } from ".";

const StoreProvider = ({ children }: any) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
