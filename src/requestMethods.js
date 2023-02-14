import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTI5NjNiYzE5NjQ4NjkwMDg4NDg1NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NjM4NDY4NSwiZXhwIjoxNjc2NjQzODg1fQ.Qd5nuQXqRU6GafRQD1w8sjXjMgchuepFgoHI7U1up9s";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const privateRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${TOKEN}`,
  },
});
