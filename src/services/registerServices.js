import { post } from "../ultils/request"

export const checkRegister = async (email) => {
   const result = await post("/register", {email});
   return result;
}

export const register = async (options) => {
    const result = await post("/register", options);
    return result;
}