import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { MainPage } from "./pages/Main";
import styles from "./App.module.scss";
import { useLayoutEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthLoading, setUser } from "./features/auth";
import ProtectedRoute from "./shared/utils/ProtectedRoute";
import PublicRoute from "./shared/utils/PublicRoute";
import { setLoading } from "./features/auth/model/authSlice";
import { LoadingSpinner } from "./shared/ui/LoadingSpinner";
import { Box } from "@mui/material";

function App() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  const isLoading = useSelector(selectAuthLoading);

  useLayoutEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        dispatch(
          setUser({
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
          })
        );
      }
      setAuthChecked(true);
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [auth, dispatch]);

  if (!authChecked || isLoading) {
    return (
      <Box
        marginTop="50vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <LoadingSpinner size={20} />
      </Box>
    );
  }

  return (
    <div className={styles.App}>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/test" element={<div>TEST</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
