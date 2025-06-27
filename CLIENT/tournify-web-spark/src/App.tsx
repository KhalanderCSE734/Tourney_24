
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Public Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import TournamentDetail from "./pages/TournamentDetail";
import CreateTournament from "./pages/CreateTournament";
import NotFound from "./pages/NotFound";

// Auth Pages
import RoleSelection from "./components/auth/RoleSelection";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";

// Organizer Pages
import OrganizerDashboard from "./pages/OrganizerDashboard";
import OrganizerCreateTournament from "./pages/organizer/CreateTournament";
import TournamentList from "./pages/organizer/TournamentList";
import TournamentDetails from "./pages/organizer/TournamentDetails";
import CreateEvent from "./pages/organizer/CreateEvent";

// Player Pages
import PlayerDashboard from "./pages/player/PlayerDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/tournament/:id" element={<TournamentDetail />} />
            <Route path="/create-tournament" element={<CreateTournament />} />
            
            {/* Auth Routes */}
            <Route path="/auth/role-selection" element={<RoleSelection />} />
            <Route path="/auth/login/:role" element={<LoginForm />} />
            <Route path="/auth/signup/:role" element={<SignupForm />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            {/* Organizer Routes */}
            <Route path="/organizer/dashboard" element={
              <ProtectedRoute allowedRoles={['organizer']}>
                <OrganizerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/organizer/tournaments" element={
              <ProtectedRoute allowedRoles={['organizer']}>
                <TournamentList />
              </ProtectedRoute>
            } />
            <Route path="/organizer/create-tournament" element={
              <ProtectedRoute allowedRoles={['organizer']}>
                <OrganizerCreateTournament />
              </ProtectedRoute>
            } />
            <Route path="/organizer/tournament/:id" element={
              <ProtectedRoute allowedRoles={['organizer']}>
                <TournamentDetails />
              </ProtectedRoute>
            } />
            <Route path="/organizer/tournament/:tournamentId/create-event" element={
              <ProtectedRoute allowedRoles={['organizer']}>
                <CreateEvent />
              </ProtectedRoute>
            } />
            <Route path="/organizer/tournament/:id/edit" element={
              <ProtectedRoute allowedRoles={['organizer']}>
                <OrganizerCreateTournament />
              </ProtectedRoute>
            } />
            
            {/* Player Routes */}
            <Route path="/player/dashboard" element={
              <ProtectedRoute allowedRoles={['player']}>
                <PlayerDashboard />
              </ProtectedRoute>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
