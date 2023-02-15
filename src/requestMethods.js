import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTI5NjNiYzE5NjQ4NjkwMDg4NDg1NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NjQ1MjY4NiwiZXhwIjoxNjc2NzExODg2fQ.ubXr1ypQq27wKUEGLKVHr1a9m42LfncrRzL1O3ZZvZI";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const privateRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${TOKEN}`,
  },
});
