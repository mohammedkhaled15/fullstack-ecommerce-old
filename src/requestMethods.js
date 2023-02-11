import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTI5NjNiYzE5NjQ4NjkwMDg4NDg1NCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzYxMzYyNTksImV4cCI6MTY3NjM5NTQ1OX0.EXjJv_jQasAtKsEhpK36racTCIhyCzObQApQBYhUe1I";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const privateRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${TOKEN}`,
  },
});
