import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

export const AppProviders=({children}:{children:ReactNode})=>{
    const queryClient = new QueryClient()
   return (
    <QueryClientProvider client={queryClient}>
   <AuthProvider>
        {children}
    </AuthProvider>
    </QueryClientProvider>)

}