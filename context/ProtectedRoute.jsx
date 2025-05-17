"use client";

import { useUser } from "@/app/provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { user } = useUser;
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.replace("/signin");
    }
  }, [user, router]);

  if (!user) {
    return null; // Or loading spinner
  }

  return <>{children}</>;
};

export default ProtectedRoute;
