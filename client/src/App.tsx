import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import Notes from '@/pages/Notes';
import Layout from '@/components/Layout';
import Register from '@/pages/Register';
import Profile from '@/pages/Profile';
import Error from '@/pages/Error';
import { useAppSelector } from '@/store/hooks';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
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
  );
}
