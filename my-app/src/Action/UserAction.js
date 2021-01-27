import axios from "axios";
import { backEndLink } from "../config.js";

export const signIn = async (email, password) => {
  const res = await axios.post(`${backEndLink}/api/user/signin`, {
    email,
    password,
  });
  if (res.status === 200) {
    return res.data;
  } else {
    throw new Error("Cannot sign in", res);
  }
};

export const signUp = async (firstName, lastName, email, password) => {
  const res = await axios.post(`${backEndLink}/api/user/signup`, {
    firstName, lastName, email, password
  });
  if (res.status === 200) {
    return res.data;
  } else {
    throw new Error("Cannot sign up", res);
  }
};