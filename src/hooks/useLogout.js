import { useAuthContext } from "./useAuthContext";
import { useProjectsContext } from "./useProjectsContext";

export const useLogout = () => {
  const { dispatch: logoutDispatch } = useAuthContext();
  const { dispatch: projectDispatch } = useProjectsContext();

  const logout = () => {
    // clear is
    localStorage.removeItem("user");

    // dispatch logout

    logoutDispatch({ type: "LOGOUT" });
    projectDispatch({ type: "SET_PROJECTS", payload: [] });
  };

  return { logout };
};
