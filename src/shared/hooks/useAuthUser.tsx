import { useApolloClient } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

const useAuthUser = () => {
  const client = useApolloClient();
  const history = useHistory();

  const setAuthUser = (token: string) => {
    localStorage.setItem("token", token);
    history.replace("/admin");
  };

  const logout = () => {
    client.resetStore();
    localStorage.clear();
    history.replace("/");
  };

  return { logout, setAuthUser };
};

export default useAuthUser;
