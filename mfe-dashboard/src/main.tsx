import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

// QueryClient is the React Query engine.
// It manages caching, background refetching, and stale data.
// We create one instance and provide it to the whole app.
const queryClient = new QueryClient();

async function enableMocking() {
  // Only mock in development — in production you'd hit a real API
  if (process.env.NODE_ENV !== "development") return;
  const { worker } = await import("./mocks/browser");
  // `onUnhandledRequest: 'bypass'` means: if a request doesn't
  // match any handler, let it through normally instead of erroring.
  return worker.start({ onUnhandledRequest: "bypass" });
}

// We start the mock worker BEFORE rendering the app.
// This ensures no API calls happen before MSW is ready to intercept them.
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>,
  );
});
