"use client";

import { useMemo } from "react";
import { User } from "@/types";
import Cookies from "js-cookie";

export function useUserFromCookie(): User | undefined {
  return useMemo(() => {
    const userCookie = Cookies.get("user");
    return userCookie ? (JSON.parse(userCookie) as User) : undefined;
  }, []);
}
