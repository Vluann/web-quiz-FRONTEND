import { post } from "../ultils/request"

export const checkUserAdmin = async (email,password) => {
    const result = await post("/loginAdmin", { email, password});
    return result;
}

export const updateProfileAdmin = async (id,options) => {
   const result = await post(`/updateAdmin?_id=${id}`, options);
   return result;
}

export const updatePasswordAdmin = async (id,options) => {
   const result = await post(`/updatePasswordAdmin?_id=${id}`, options);
   return result;
}