import { ProtectedMain } from "@/components/protected/main";
import { id_auth_user } from "@/config/protected";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = async ({
  children,
}) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user.id) {
    // This route can only be accessed by authenticated users.
    // Unauthenticated users will be redirected to the `/login` route.
    redirect("/login");
  }
  if (session.user.id && session.user.id !== id_auth_user) {
    redirect("/");
  }

  return (
    <>
      <ProtectedMain>{children}</ProtectedMain>
    </>
  );
};

export default ProtectedLayout;
