import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Chat from './pages/Chat';
import UserRequests from './pages/UserRequests';
import AdminDashboard from './pages/AdminDashboard';
import AdminRequests from './pages/AdminRequests';
import AdminRequestDetails from './pages/AdminRequestDetails';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Chat />} />
      <Route path="/requests" element={<UserRequests />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/requests" element={<AdminRequests />} />
      <Route path="/admin/requests/:id" element={<AdminRequestDetails />} />
    </Routes>
  );
}

export default App;
