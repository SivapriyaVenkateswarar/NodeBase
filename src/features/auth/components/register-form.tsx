"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
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
import { cn } from "@/lib/utils";

const registerSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  ConfirmPassword: z.string()
})
.refine((data) => data.password === data.ConfirmPassword, {
  message: "Passwords do not match",
  path: ["ConfirmPassword"], 
});

type registerFormValue = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();

  const form = useForm<registerFormValue>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      ConfirmPassword: "",
    },
  });

  const onSubmit = async (values: registerFormValue) => {
    await authClient.signUp.email({
    name: values.email,         // ← use values.name, not values.email
    email: values.email,
    password: values.password,
    callbackURL: "/", 
    },
    {
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
          <CardTitle>Get Started</CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          {/* OAuth Buttons */}
          <div className="flex flex-col gap-3">
            <Button variant="outline" className="w-full" disabled={isPending}>
              Continue with GitHub
            </Button>
            <Button variant="outline" className="w-full" disabled={isPending}>
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

              {/* Added Password Field */}
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

              <FormField
                control={form.control}
                name="ConfirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
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

              <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Creating account..." : "Sign Up"}
          </Button>

            </form>
          </Form>

          {/* Sign Up Link */}
          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              href="/login"
              className="font-semibold text-black hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
