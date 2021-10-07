import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedRoute from "./auth/ProtectedRoute";
import Home from "./views/home";
import Login from "./views/login";
import Register from "./views/register";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <ProtectedRoute path="/home">
            <Home />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
