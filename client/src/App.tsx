import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import Login from '@/pages/Login';
import Notes from '@/pages/Notes';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import Register from '@/pages/Register';
import { ThemeProvider } from '@/context/ThemeContext';
import Profile from '@/pages/Profile';
import Error from '@/pages/Error';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={
              <PrivateRoute>
                <Layout>
                  <Routes>
                    <Route index element={<Notes />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="*" element={<Error />} />
                  </Routes>
                </Layout>
              </PrivateRoute>
            } />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}
