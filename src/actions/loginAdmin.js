export const checkAdminLogin = (status) => {
  return {
    type: "CHECK_LOGIN_ADMIN",
    status: status,
  };
};
