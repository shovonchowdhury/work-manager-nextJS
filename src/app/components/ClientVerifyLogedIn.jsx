
"use client"; 

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { verifyUserLogin } from "@/store/slice/authSlice";


export default function ClientVerifyLogedin() {
  const dispatch = useDispatch();

  useEffect(() => {
   
    dispatch(verifyUserLogin());
  }, [dispatch]);

  return null; 
}
