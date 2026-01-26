"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"; 
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

const signInGithub = async () => {
  await authClient.signIn.social(
    {
      provider: "github",
    },
    {
      onSuccess: () => {
        router.push("/");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    }
  );
};

const signInGoogle = async () => {
  await authClient.signIn.social(
    {
      provider: "google",
    },
    {
      onSuccess: () => {
        router.push("/");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    }
  );
};

const onSubmit = async (values: LoginFormValues) => {
  await authClient.signIn.email({
    email: values.email,
    password: values.password,
    callbackURL: "/", 
  }, {
    onSuccess: () => {
      router.push("/");
    },
    onError: (ctx) => {
      toast.error(ctx.error.message);
    },
  });
};

  const isPending = form.formState.isSubmitting;

return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Login to continue</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          {/* OAuth Buttons */}
          <div className="flex flex-col gap-3">
            <Button onClick={signInGithub} variant="outline" className="w-full" disabled={isPending}>
              <Image alt="Gthub" src="/logos/github.svg" width={20} height={20}/>
              Continue with GitHub
            </Button>
            <Button onClick={signInGoogle} variant="outline" className="w-full" disabled={isPending}>
              <Image alt="Google" src="/logos/google.svg" width={20} height={20}/>
              Continue with Google
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          {/* Email & Password Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        type="email"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
              
                type="submit"
                className="w-full"
                disabled={isPending}
              >
                {isPending ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>

          {/* Sign Up Link */}
          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <Link
              href="/register"
              className="font-semibold text-black hover:underline"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};