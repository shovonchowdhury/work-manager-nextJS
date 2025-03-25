// components/ClientWrapper.js
"use client"; // This ensures it's a client-side component

import store from "@/store";
import { verifyUserLogin } from "@/store/slice/authSlice";
import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";

const ClientWrapper = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ClientWrapper;
