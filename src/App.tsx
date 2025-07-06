import { Route, Routes, useNavigate } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { MainPage } from "./pages/Main";
import styles from "./App.module.scss";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "./features/auth";
import ProtectedRoute from "./shared/utils/ProtectedRoute";
import PublicRoute from "./shared/utils/PublicRoute";

function App() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        dispatch(
          setUser({
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
          })
        );
      }
    });
  }, [auth, dispatch, navigate]);
  return (
    <div className={styles.App}>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
