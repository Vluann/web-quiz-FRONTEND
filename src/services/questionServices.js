import { get, post } from "../ultils/request"

export const countQuestion = async () => {
    const result = await get("/questions");
    return result;
}

export const getListQuestion = async (id) => {
    const result = await get(`/quiz/${id}`);
    return result;
}
