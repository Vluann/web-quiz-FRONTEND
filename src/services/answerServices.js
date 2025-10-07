import { get, post } from "../ultils/request";


export const createAnswers = async (options) => {
   const result = await post("/answers", options);
   return result;
}

export const AnswersDetail = async (id) => {
   const result = await get(`/listAnswers/${id}`);
   return result;
}

export const getAnswerById = async (id) => {
   const result = await get(`/answersByUser/${id}`);
   return result;
}

export const getListAnswers = async () => {
   const result = await get("/allAnswers");
   return result;
}