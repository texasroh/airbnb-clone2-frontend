import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";
import { IProtectedPageProps } from "../types";

export default function HostOnlyPage({ children }: IProtectedPageProps) {
  const { user, isUserLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoading && !user?.is_host) {
      navigate("/");
    }
  }, [isUserLoading, user, navigate]);
  return <>{children}</>;
}
