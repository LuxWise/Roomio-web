"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

function useAuth() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return authContext;
}

export default useAuth;
