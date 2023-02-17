import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
// const TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTI5NjNiYzE5NjQ4NjkwMDg4NDg1NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NjU1NDM4NCwiZXhwIjoxNjc2NjQwNzg0fQ.35pVgJ5qjpZLH3slrn3YSJ6byeD5WpTDtCGJCkpF_ow";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const privateRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // token: `Bearer ${TOKEN}`,
  },
  withCredentials: true,
});
