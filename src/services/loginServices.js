import { post } from "../ultils/request"

export const loginCheck = async (email, password) => {
  const result = await post("/login", { email, password });
  return result;
};