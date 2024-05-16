import { useAppDispatch, useAppSelector } from "../store";
import { setGlobalToken } from "../store/slice/BaseSlice";

function UseToken() {
  const token = useAppSelector((state) => state.base.token);
  const dispatch = useAppDispatch();

  const setToken = (token: string) => {
    dispatch(setGlobalToken(token));
  };

  return [token, setToken];
}

export default UseToken;
