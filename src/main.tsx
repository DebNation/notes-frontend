import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ThemeContextProvider from "./contexts/themeContextProvider.tsx";
import UserContextProvider from "./contexts/UserContextProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <UserContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <Toaster richColors theme="dark" position="top-right" />
        </QueryClientProvider>
      </UserContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
);
