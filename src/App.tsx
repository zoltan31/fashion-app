import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedRoute from "./auth/ProtectedRoute";
import Home from "./views/home";
import Login from "./views/login";
import Register from "./views/register";
import SeasonPage from "./views/season";
import UploadPage from "./views/upload";
import WardrobePage from "./views/wardrobe";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <ProtectedRoute path="/season">
            <SeasonPage />
          </ProtectedRoute>
          <ProtectedRoute path="/wardrobe">
            <WardrobePage />
          </ProtectedRoute>
          <ProtectedRoute path="/upload">
            <UploadPage />
          </ProtectedRoute>
          <ProtectedRoute path="/">
            <Home />
          </ProtectedRoute>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
