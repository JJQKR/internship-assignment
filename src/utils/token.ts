export const getToken = localStorage.getItem("access_token");
// export const getToken = useAuthStore.getState().accessToken;

export const setToken = (token: string) =>
  localStorage.setItem("access_token", token);
export const removeToken = () => localStorage.removeItem("access_token");
