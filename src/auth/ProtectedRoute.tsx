import React from "react";
import { Redirect, Route } from "react-router";
import useAuth from "./AuthProvider";

type Props = {
  path?: string;
};

export default function ProtectedRoute({
  children,
}: React.PropsWithChildren<Props>) {
  const { authed } = useAuth();

  const element = authed ? children : <Redirect to="/login" />;

  return <Route>{element}</Route>;
}
