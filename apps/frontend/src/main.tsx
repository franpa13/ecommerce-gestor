import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from "react-router";
import { router } from "./routes.tsx";
import { Toaster } from "sonner";


const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        retry: false,

      }
    }
  }
)


createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        toastOptions={{
          unstyled: true,
          classNames: {
            success:
              "flex items-center gap-2 px-2 py-3 rounded-lg bg-green-600 text-white shadow-xl border border-green-700",
            error:
              "px-2 items-center gap-2 py-3 rounded-lg bg-red-600 text-white shadow-xl border border-red-700",
            warning:
              "px-2 items-center gap-2 py-3 rounded-lg bg-yellow-500 text-black shadow-xl border border-yellow-600",
            info:
              "px-2 items-center gap-2 py-3 rounded-lg bg-accent text-white shadow-xl border border-blue-700",
          },
        }}
      />

    </StrictMode>
  </QueryClientProvider>
);
