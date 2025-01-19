import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AccountPage from "./pages/AccountPage";
import EditPage from "./pages/EditPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { getUserApi } from "./apis/auth";
import { useAuthStore } from "./stores/auth.store";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as Sentry from "@sentry/react";

const queryClient = new QueryClient();

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  if (!user) {
    alert("로그인해주세요");
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      getUserApi().then((userData) => {
        useAuthStore.getState().setAuth(token, userData);
      });
    }
  }, []);
  return (
    <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/account" element={<AccountPage />} />

            <Route
              path="/edit"
              element={
                <PrivateRoute>
                  <EditPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Sentry.ErrorBoundary>
  );
}

export default App;
