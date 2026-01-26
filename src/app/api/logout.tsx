"use client";

import { Button } from "@/component/ui/button";
import { authClient } from "@/lib/auth-client";

export const LogoutButton = () => {
  return (
    <Button onClick={() => authClient.signOut()}>
      Logout
    </Button>
  );
};
