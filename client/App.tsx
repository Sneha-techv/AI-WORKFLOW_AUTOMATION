
import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import { ProtectedRoute } from "./components/protected-route";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import RoleSelection from "./pages/RoleSelection";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Auth from "./pages/Auth";
import SelectUser from "./pages/SelectUser";
import NewCustomer from "./pages/NewCustomer";
import ExistingCustomer from "./pages/ExistingCustomer";
import Dashboard from "./pages/Dashboard";
import CreateTicket from "./pages/CreateTicket";
import MyTickets from "./pages/MyTickets";
import TicketDetails from "./pages/TicketDetails";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// ✅ ATS Dashboard (ADDED)
import ATSDashboard from "./pages/ATSDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/role" element={<RoleSelection />} />
            <Route path="/dashboard" element={<EmployeeDashboard />} />
            
            <Route
              path="/auth"
              element={
                <ProtectedRoute requiredAuth={false}>
                  <Auth />
                </ProtectedRoute>
              }
            />
            <Route
              path="/select-user"
              element={
                <ProtectedRoute requiredAuth={false}>
                  <SelectUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/new"
              element={
                <ProtectedRoute requiredAuth={false}>
                  <NewCustomer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/existing"
              element={
                <ProtectedRoute requiredAuth={false}>
                  <ExistingCustomer />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes */}
            <Route path="/customer/dashboard" element={<Dashboard />} />
            <Route path="/customer/create-ticket" element={<CreateTicket />} />
            <Route path="/customer/tickets" element={<MyTickets />} />
            <Route path="/customer/ticket/:id" element={<TicketDetails />} />
            <Route path="/customer/settings" element={<Settings />} />

            {/* ✅ ATS DASHBOARD ROUTE */}
            <Route path="/ats-dashboard" element={<ATSDashboard />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
