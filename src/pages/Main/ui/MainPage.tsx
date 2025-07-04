import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/useAuth";
import Button from "../../../shared/ui/Button";
import { useDispatch } from "react-redux";
import { removeUser } from "../../../features/user/store/slice";

const MainPage = () => {
  const { isAuth, email } = useAuth();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);
  return (
    <div>
      <Button onClick={() => dispatch(removeUser())}>Log out {email}</Button>
    </div>
  );
};

export default MainPage;
