import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient, trpc } from '~/trpc/server';
import { LoginForm } from '@/features/auth/components/login-form';
import { RegisterForm } from '@/features/auth/components/register-form';

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(trpc.hello.queryOptions({ text: "world" }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </main>
    </HydrationBoundary>
  );
}