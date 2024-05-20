import axios from "axios";

const notemyApi = axios.create({
  baseURL: "https://notemy-api.dustbin.me/api/auth",
  headers: { "Content-Type": "application/json" },
});

export const loginFn = async (userCreds: object) => {
  const response = await notemyApi.post("/login", userCreds);
  return response.data;
};
export const getMeFn = async (token: string) => {
  const response = await notemyApi.get("/me", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};
