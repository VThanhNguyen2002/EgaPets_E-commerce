// src/main.tsx  (hoặc index.tsx)
import React            from "react";
import ReactDOM         from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

import App from "./App";

// 1️⃣  Tạo client  (có thể đặt options global tại đây)
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,     // dữ liệu “tươi” trong 5 phút
      refetchOnWindowFocus: false,  // không tự refetch khi focus tab
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* 2️⃣  Bọc bởi provider */}
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3} autoHideDuration={2500}>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
