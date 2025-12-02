import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient, trpc } from '~/trpc/server';
import { LoginForm } from '@/features/auth/components/login-form';
import { RegisterForm } from '@/features/auth/components/register-form';

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(trpc.hello.queryOptions({ text: "world" }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex flex-col items-center justify-center min-h-screen gap-8">
        <RegisterForm />
      </main>
    </HydrationBoundary>
  );
}