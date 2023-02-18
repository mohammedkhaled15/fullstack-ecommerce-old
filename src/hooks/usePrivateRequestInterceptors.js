import { useEffect } from "react";
import { useSelector } from "react-redux";
import useRefreshToken from "./useRefreshToken";
import { privateRequest } from "../requestMethods";

const usePrivateRequest = () => {
  const user = useSelector((state) => state.user.currentUser);
  const updateAccessToken = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = privateRequest.interceptors.request.use(
      (config) => {
        if (!config.headers["token"]) {
          config.headers["token"] = `Bearer ${user?.accessToken}`;
          console.log(user.accessToken);
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseInterceptor = privateRequest.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevRequest = err?.config;
        if (err?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await updateAccessToken();
          prevRequest.headers["token"] = `Bearer ${newAccessToken}`;
          return privateRequest(prevRequest);
        }
        return Promise.reject(err);
      }
    );
    return () => {
      privateRequest.interceptors.response.eject(responseInterceptor);
      privateRequest.interceptors.request.eject(requestInterceptor);
    };
  }, [user, updateAccessToken]);

  return privateRequest;
};

export default usePrivateRequest;
