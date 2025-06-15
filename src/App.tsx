import { Toaster as SonnerToaster } from "./components/components/ui/sonner"; 

import { TooltipProvider } from "./components/components/ui/tooltip"; 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Professionals from "./pages/Professionals";
import Services from "./pages/Services";
import Patients from "./pages/Patients";
import PublicScheduling from "./pages/PublicScheduling";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./components/contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <SonnerToaster /> 
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/public" element={<PublicScheduling />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/appointments" element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            } />
            <Route path="/professionals" element={
              <ProtectedRoute>
                <Professionals />
              </ProtectedRoute>
            } />
            <Route path="/services" element={
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            } />
            <Route path="/patients" element={
              <ProtectedRoute>
                <Patients />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;