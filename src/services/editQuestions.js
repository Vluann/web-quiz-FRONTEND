import { post } from "../ultils/request"

export const editques = async (options) => {
    const result = await post("/editQuestions", options);
    return result;
}