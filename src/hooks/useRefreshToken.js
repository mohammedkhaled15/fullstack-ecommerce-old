import { useDispatch } from "react-redux";
import { publicRequest } from "../requestMethods";
import { updateAccessToken } from "../redux/userSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const getAccessToken = async () => {
    try {
      const res = await publicRequest.get("/auth/refresh", {
        withCredentials: true,
      });
      const { accessToken } = res.data;
      console.log(`new One ${accessToken}`);
      dispatch(updateAccessToken(accessToken));
      return accessToken;
    } catch (error) {
      console.log(error);
    }
  };
  return getAccessToken;
};

export default useRefreshToken;
