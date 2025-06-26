import { useMemo } from "react";
import Cookies from "js-cookie";
import { User } from "@/types";

export function useUserFromCookie(): User | undefined {
  return useMemo(() => {
    const userCookie = Cookies.get("user");
    return userCookie ? (JSON.parse(userCookie) as User) : undefined;
  }, []);
}
