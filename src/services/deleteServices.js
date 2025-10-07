import { post } from "../ultils/request"

export const deleteTopics = async (id) => {
    const results = await post("/deleteTopics", { topicId: id });
    return results;
}

export const deleteUsers = async (id) => {
    const result = await post("/deleteUsers", { userId: id });
    return result;
}