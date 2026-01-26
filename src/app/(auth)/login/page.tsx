import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "@/features/auth/components/login-form";
import { requireUnauth } from "@/lib/auth-utils";

const Page = async () => {
  await requireUnauth();

  return <LoginForm />
};

export default Page;
