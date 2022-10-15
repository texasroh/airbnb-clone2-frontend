import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";
import { IProtectedPageProps } from "../types";

export default function ProtectedPage({ children }: IProtectedPageProps) {
  const { isLoggedIn, isUserLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isUserLoading && !isLoggedIn) {
      navigate("/");
    }
  }, [isUserLoading, isLoggedIn, navigate]);
  return <>{children}</>;
}
