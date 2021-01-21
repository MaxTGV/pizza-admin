/*import { useAuth } from "./AuthContext";

const server = process.env.REACT_APP_BACKEND_URL;

export const usePrivateApi = () => {
  const { token } = useAuth();

  const getAuthInfo = () => {
    return fetch(`${server}/admin-auth/logout`, {
      headers: {
        Authorization: "Bearer" + token,
      },
    }).then((res) => {
      return res.json();
    });
  };

  return {
    getAuthInfo,
  };
};*/
