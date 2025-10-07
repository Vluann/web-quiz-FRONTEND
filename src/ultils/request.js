const API_DOMAIN_PATH = "https://web-quiz-backend4.onrender.com";

export const get = async (path) => {
  const response = await fetch(API_DOMAIN_PATH + path);
  const result = await response.json();  
  return result;
};

export const post = async (path, option) => {
  const response = await fetch(API_DOMAIN_PATH + path, {
    method: "POST",
    headers: {
      Accept: "application/json",         
      "Content-Type": "application/json", 
    },
    body: JSON.stringify(option),
  });
  const result = await response.json();  
  return result;
};

export const patch = async (path, option) => {
  const response = await fetch(API_DOMAIN_PATH + path, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(option),
  });
  const result = await response.json();   
  return result;
};

export const del = async (path) => {
  const response = await fetch(API_DOMAIN_PATH + path, {
    method: "DELETE",
  });
  const result = await response.json();  
  return result;
};
