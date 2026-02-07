import { Routes, Route, Navigate } from "react-router-dom";
import { authService } from "./services/authService";
import LoginPage from "./pages/LoginPage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  return authService.isAuthenticated() ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/app"
        element={
          <PrivateRoute>
            <Index />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
