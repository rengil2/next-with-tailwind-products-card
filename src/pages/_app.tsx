// _app.jsx
import React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import "../global.css";

export default function MyApp({ Component, pageProps }: any) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}
