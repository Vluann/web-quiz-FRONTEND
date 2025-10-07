import { get, post } from "../ultils/request"

export const updateUser1 = async (id, options) => {
    const result = await post(`/updateUser?_id=${id}`, options);
    return result;
}

export const updateUser2 = async (id, options) => {
    const result = await post(`/updatePass?_id=${id}`, options);
    return result;
}

export const getFullName = async () => {
    const result = await get("/getFullName");
    return result;
}

export const getAllUsers = async () => {
    const result = await get("/getAllUsers");
    return result;
}