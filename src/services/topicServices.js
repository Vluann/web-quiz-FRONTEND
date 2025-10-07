import { get, post } from "../ultils/request"

export const getListTopics = async () => {
    const result = await get("/topics");
    return result;
}

export const getTopicDetail = async (id) => {
    const result = await get(`/topics?id=${id}`);
    return result;
}

export const createTopic = async (options) => {
    const result = await post("/createTopics", options);
    return result;
}