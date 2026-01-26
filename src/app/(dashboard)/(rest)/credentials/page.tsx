import { CredentialsContainer, CredentialsList, CredentialError, CredentialLoading } from "@/features/credentials/components/credentials";
import { credentialsParamsLoader } from "@/features/credentials/server/params-loader";
import { prefetchCredentials } from "@/features/credentials/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import type { SearchParams } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
  searchParams: SearchParams;
};

const Page = async ({ searchParams }: Props) => {
  await requireAuth();

  const params = await credentialsParamsLoader(searchParams);
  prefetchCredentials(params);
  
  return (
  <CredentialsContainer>
  <HydrateClient>
    <ErrorBoundary fallback={<CredentialError />}>
      <Suspense fallback={<CredentialLoading />}>
        <CredentialsList />
      </Suspense>
    </ErrorBoundary>
  </HydrateClient>
  </CredentialsContainer>
);

};

export default Page;
