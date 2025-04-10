
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import Bookings from "./pages/Bookings";
import Patients from "./pages/Patients";
import Billing from "./pages/Billing";
import Accounts from "./pages/Accounts";
import Communication from "./pages/Communication";
import NotFound from "./pages/NotFound";
import OnboardDoctor from "./pages/OnboardDoctor";
import DoctorDetails from "./pages/DoctorDetails";
import AddPatient from "./pages/AddPatient";
import PatientDetails from "./pages/PatientDetails";
import AddBilling from "./pages/AddBilling";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/onboard-doctor" element={<OnboardDoctor />} />
            <Route path="/doctor/:doctorId" element={<DoctorDetails />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/patient/:patientId" element={<PatientDetails />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/add-billing" element={<AddBilling />} />
            <Route path="/accounts" element={
              <ProtectedRoute>
                <Accounts />
              </ProtectedRoute>
            } />
            <Route path="/communication" element={
              <ProtectedRoute>
                <Communication />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
